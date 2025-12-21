// message/useChat.js
import { useState, useEffect } from 'react';

// Placeholder for your actual Axios instance
// import axios from 'axios'; 
// import io from 'socket.io-client';

export const useChat = (activeChatId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // 1. Setup Socket Connection
  useEffect(() => {
    // const newSocket = io('YOUR_BACKEND_URL');
    // setSocket(newSocket);
    
    // return () => newSocket.close();
    console.log("Socket initialized (Mock)");
  }, []);

  // 2. Fetch Messages (Axios)
  useEffect(() => {
    if (!activeChatId) return;

    setIsLoading(true);
    // axios.get(`/api/messages/${activeChatId}`).then(...)
    
    // MOCK DATA for demonstration based on your image
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

  // 3. Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

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
    
    // socket.emit('send_message', newMessage);
    // axios.post('/api/messages', newMessage);
  };

  return { messages, isLoading, sendMessage };
};