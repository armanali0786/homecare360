import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X, Send, MessageSquare, ShieldCheck } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { getChatMessages, sendChatMessage } from "@/app/lib/api";
import { useUser } from "@/app/context/UserContext";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://homecare360.onrender.com";

interface Message {
  _id:        string;
  senderRole: "customer" | "provider";
  senderName: string;
  text:       string;
  createdAt:  string;
}

interface Props {
  open:      boolean;
  onClose:   () => void;
  booking:   any;
  myRole:    "customer" | "provider";
}

export function ChatDrawer({ open, onClose, booking, myRole }: Props) {
  const { user }        = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text,     setText]     = useState("");
  const [loading,  setLoading]  = useState(false);
  const [sending,  setSending]  = useState(false);
  const socketRef  = useRef<Socket | null>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const bookingId  = booking?._id;

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load history + setup socket when drawer opens
  useEffect(() => {
    if (!open || !bookingId || !user) return;

    setLoading(true);
    getChatMessages(bookingId)
      .then((d) => setMessages(d.messages || []))
      .catch(() => {})
      .finally(() => setLoading(false));

    const token = localStorage.getItem("token");
    const s = io(SOCKET_URL, { auth: { token }, transports: ["websocket"] });
    socketRef.current = s;

    s.emit("join-room", { bookingId });

    s.on("new-message", (msg: Message) => {
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, [open, bookingId, user]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    const draft = text.trim();
    setText("");
    setSending(true);
    try {
      // Emit via socket for real-time delivery
      if (socketRef.current?.connected) {
        socketRef.current.emit("send-message", { bookingId, text: draft });
      } else {
        // Fallback: REST if socket disconnected
        const d = await sendChatMessage(bookingId, draft);
        setMessages((prev) => [...prev, d.message]);
      }
    } catch {}
    finally { setSending(false); }
  };

  const providerName = booking?.provider
    ? (booking.provider.businessName ||
       `${booking.provider.firstName || ""} ${booking.provider.lastName || ""}`.trim())
    : "Provider";

  const otherName = myRole === "customer" ? providerName : (booking?.user?.fullName || "Customer");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/40"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.24 }}
            className="bg-white w-full sm:w-[400px] h-[85vh] sm:h-screen sm:max-h-screen flex flex-col rounded-t-2xl sm:rounded-none shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#00B8A9]/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#00B8A9]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{otherName}</p>
                <p className="text-xs text-gray-400">{booking?.serviceCategory} · {booking?.date}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Privacy notice */}
            <div className="px-5 py-2 bg-cyan-50 border-b border-cyan-100 flex items-center gap-2 text-xs text-cyan-600 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              Messages are private. Personal contact details are not shared.
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-[#00B8A9] animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="w-10 h-10 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">No messages yet.</p>
                  <p className="text-xs text-gray-300 mt-1">Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderRole === myRole;
                  return (
                    <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
                          isMe
                            ? "bg-[#00B8A9] text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        {!isMe && (
                          <p className="text-[10px] font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">
                            {msg.senderName || otherName}
                          </p>
                        )}
                        <p className="leading-snug">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-gray-400"}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-end gap-2 flex-shrink-0">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                }}
                placeholder="Type a message…"
                rows={1}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9] resize-none"
                style={{ maxHeight: "100px", overflowY: "auto" }}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim() || sending}
                className="w-10 h-10 flex items-center justify-center bg-[#00B8A9] text-white rounded-xl hover:bg-[#009e96] transition-colors disabled:opacity-40 flex-shrink-0"
              >
                {sending ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
