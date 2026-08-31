// Talks to the chat proxy server (server/) — never calls Groq directly
// from the browser, since that would expose the API key.
//
// Defaults to same-origin '/api/chat', which is what you want in
// production if /api is routed to the server on the same domain (see
// server/README.md, DigitalOcean App Platform option). For local dev,
// where the Vite dev server and the proxy run on different ports, set
// VITE_CHAT_API_URL in a root .env file (see .env.example).
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

export async function sendChatMessage(messages) {
  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Something went wrong. Please try again.');
  }
  if (!data?.reply) {
    throw new Error('The chat service returned an empty response.');
  }

  return data.reply;
}
