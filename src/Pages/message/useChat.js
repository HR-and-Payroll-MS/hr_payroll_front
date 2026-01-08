// message/useChat.js
import { useState, useEffect, useRef } from 'react';
import { useSocket, useSocketEvent } from '../../Context/SocketProvider';
import { EVENT_CHAT_MESSAGE, EVENT_CHAT_TYPING } from '../../api/socketEvents';

// Placeholder for your actual/future Axios instance
// import axios from 'axios'; 

export const useChat = (activeChatId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const { emit } = useSocket() || {};

  // 1. Fetch Initial Messages (Simulated API Call)
  // In production, you would fetch history from an API endpoint here
  useEffect(() => {
    if (!activeChatId) return;

    setIsLoading(true);
    // axios.get(`/ api / messages / ${ activeChatId } `).then(res => setMessages(res.data))

    // Keeping mock data for history for now, but enabling real-time appends
    setTimeout(() => {
      setMessages([
        { id: 1, sender: 'them', type: 'text', content: 'Hello Marilyn! consectetur adipiscing elit ames.', time: '09:10', status: 'read' },
        { id: 2, sender: 'me', type: 'text', content: 'Fames eros urna, felis morbi a est est.', time: '09:40', status: 'read' },
        { id: 3, sender: 'me', type: 'audio', content: '00:24', time: '09:40', status: 'read', reactions: ['🔥', '😆', '❤️', '👍', '👏'] },
        { id: 4, sender: 'them', type: 'text', content: 'How confident are we on presenting this?', time: '09:50', status: 'read' },
        { id: 5, sender: 'them', type: 'image', content: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', caption: 'Find out who is in charge of this portion of the process.', time: '10:00', status: 'read', reaction: '😍' },
      ]);
      setIsLoading(false);
    }, 500);
  }, [activeChatId]);

  // 2. Listen for incoming messages via Socket (Real-time)
  useSocketEvent(EVENT_CHAT_MESSAGE, (newMessage) => {
    // Only append if the message belongs to the current chat
    // Note: real app should check message.chat_id === activeChatId
    console.log("⚡ Received socket message:", newMessage);

    // Clear typing indicator if "them" sends a message
    setIsTyping(false);

    const formattedMsg = {
      id: newMessage.id || Date.now(),
      sender: 'them', // Assumes incoming is always 'them' for this UI demo
      type: 'text', // Backend should send type
      content: newMessage.content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };

    setMessages((prev) => [...prev, formattedMsg]);
  });

  // 3. Listen for Typing Events
  useSocketEvent(EVENT_CHAT_TYPING, (payload) => {
    // payload: { chat_id, user_id }
    // if (payload.chat_id === activeChatId) ...
    console.log("⚡ Typing:", payload);
    setIsTyping(true);

    // Auto-clear after 3 seconds of silence
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  });

  // 4. Send Message
  const sendMessage = (content, type = 'text') => {
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      type,
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    // Optimistic UI Update
    setMessages((prev) => [...prev, newMessage]);

    // Emit to Backend (which will save to DB and echo to others)
    // payload structure matches what Django expects or will expect
    if (emit) {
      emit(EVENT_CHAT_MESSAGE, { chat_id: activeChatId, content, type });
    }

    // Optional: API fallback
    // axios.post('/api/messages', { chat: activeChatId, content });
  };

  // 5. Send Typing Indicator
  const sendTyping = () => {
    if (emit) {
      emit(EVENT_CHAT_TYPING, { chat_id: activeChatId });
    }
  };

  return { messages, isLoading, sendMessage, isTyping, sendTyping };
};