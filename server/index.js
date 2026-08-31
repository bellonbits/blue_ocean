// =========================================================
// Blue Ocean Chat Proxy
//
// A tiny Express server whose only job is to hold the GROQ_API_KEY
// server-side and forward chat requests to Groq's OpenAI-compatible
// chat completions endpoint. The frontend never sees the key.
// =========================================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { buildSystemPrompt } from './knowledgeBase.js';

const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (!GROQ_API_KEY) {
  console.error('Missing GROQ_API_KEY environment variable. Set it in server/.env (see .env.example) before starting.');
  process.exit(1);
}

if (ALLOWED_ORIGINS.length === 0) {
  console.warn('ALLOWED_ORIGINS is not set — allowing all origins. Set it before deploying to production.');
}

const SYSTEM_PROMPT = buildSystemPrompt();
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;

const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(
  cors({
    origin: ALLOWED_ORIGINS.length > 0 ? ALLOWED_ORIGINS : true,
  })
);

// --- Minimal in-memory rate limiting (per IP) ---------------------------
// Good enough to blunt casual abuse of a public endpoint. For real scale,
// replace with a shared store (Redis) behind a load balancer.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 30;
const requestLog = new Map(); // ip -> array of timestamps

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

// Periodically clear stale IP entries so the map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requestLog) {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) requestLog.delete(ip);
    else requestLog.set(ip, fresh);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Request must include a non-empty "messages" array.' });
  }
  if (messages.length > MAX_HISTORY_MESSAGES) {
    return res.status(400).json({ error: `Too many messages — limit is ${MAX_HISTORY_MESSAGES} per conversation.` });
  }
  for (const m of messages) {
    if (!m || typeof m.content !== 'string' || (m.role !== 'user' && m.role !== 'assistant')) {
      return res.status(400).json({ error: 'Each message needs a "role" of "user" or "assistant" and a string "content".' });
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: `Message too long — limit is ${MAX_MESSAGE_LENGTH} characters.` });
    }
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.4,
        max_tokens: 800,
      }),
    });

    if (!groqResponse.ok) {
      const errBody = await groqResponse.text();
      console.error('Groq API error:', groqResponse.status, errBody);
      return res.status(502).json({ error: 'The chat service is temporarily unavailable. Please try again.' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ error: 'The chat service returned an empty response.' });
    }

    res.json({ reply });
  } catch (err) {
    console.error('Chat proxy error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Blue Ocean chat proxy listening on port ${PORT}`);
});
