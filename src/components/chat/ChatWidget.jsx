import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Waves, AlertTriangle } from 'lucide-react';
import { sendChatMessage } from '../../lib/chatApi';
import './ChatWidget.css';

const GREETING = "Hi! I'm the Blue Ocean assistant. Ask me about our marine life, research, conservation work, or Somalia's coast.";

// Renders assistant replies: markdown-style ![alt](/path) images become
// real <img> thumbnails, [label](/path) links become real in-app
// navigation (internal paths) or plain anchors (external), and **bold**
// spans render as <strong>. Line breaks are preserved via CSS
// (white-space: pre-wrap) rather than parsed here.
function MessageText({ text }) {
  // The model sometimes wraps a whole link in **bold** (**[label](url)**).
  // Links already get their own styling, so drop that redundant wrapper
  // rather than trying to support nested tokens in the parser below.
  const normalized = text.replace(/\*\*(\[[^\]]+\]\([^)]+\))\*\*/g, '$1');

  const parts = [];
  // Matches a markdown image, a markdown link, OR a **bold** span, whichever comes first.
  const tokenPattern = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = tokenPattern.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{normalized.slice(lastIndex, match.index)}</span>);
    }
    const [, imageAlt, imageSrc, linkLabel, href, boldText] = match;
    if (imageSrc !== undefined) {
      parts.push(
        <img key={key++} src={imageSrc} alt={imageAlt} className="chat-widget__image" loading="lazy" />
      );
    } else if (href !== undefined) {
      if (href.startsWith('/')) {
        parts.push(
          <Link key={key++} to={href} className="chat-widget__link">
            {linkLabel}
          </Link>
        );
      } else {
        parts.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="chat-widget__link">
            {linkLabel}
          </a>
        );
      }
    } else {
      parts.push(<strong key={key++}>{boldText}</strong>);
    }
    lastIndex = tokenPattern.lastIndex;
  }
  if (lastIndex < normalized.length) {
    parts.push(<span key={key++}>{normalized.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      // Only user/assistant turns go to the API — the greeting is fine to include.
      const reply = await sendChatMessage(nextMessages);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget" aria-live="polite">
      {open && (
        <div className="chat-widget__panel" role="dialog" aria-label="Blue Ocean chat assistant">
          <div className="chat-widget__header">
            <div className="chat-widget__header-title">
              <Waves size={18} />
              <span>Blue Ocean Assistant</span>
            </div>
            <button
              type="button"
              className="chat-widget__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-widget__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-widget__bubble chat-widget__bubble--${m.role}`}>
                <MessageText text={m.content} />
              </div>
            ))}
            {loading && (
              <div className="chat-widget__bubble chat-widget__bubble--assistant chat-widget__bubble--typing">
                <span className="chat-widget__dot" />
                <span className="chat-widget__dot" />
                <span className="chat-widget__dot" />
              </div>
            )}
            {error && (
              <div className="chat-widget__error">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form className="chat-widget__input-row" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about marine life, research..."
              className="chat-widget__input"
              maxLength={2000}
              aria-label="Type your message"
            />
            <button
              type="submit"
              className="chat-widget__send"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-widget__fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
