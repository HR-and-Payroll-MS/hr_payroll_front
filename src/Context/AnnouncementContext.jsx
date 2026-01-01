import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';
import useAuth from './AuthContext';

const AnnouncementContext = createContext(null);

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axiosPrivate } = useAuth(); 
  const socketObj = useSocket(); 

  // 1. Fetch History
  const fetchHistory = useCallback(async () => {
    try {
      const response = await axiosPrivate.get('/announcements');
      setAnnouncements(response.data);
    } catch (err) {
      console.error("Announcement Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // 2. Real-time Socket Listeners
  useEffect(() => {
    if (!socketObj || !socketObj.on) return;

    const handleNewPost = (newPost) => {
      setAnnouncements((prev) => [newPost, ...prev]);
    };

    const handleDeletePost = (postId) => {
      setAnnouncements((prev) => prev.filter(a => (a._id !== postId && a.id !== postId)));
    };

    socketObj.on('new_announcement', handleNewPost);
    socketObj.on('delete_announcement', handleDeletePost);

    return () => {
      socketObj.off('new_announcement', handleNewPost);
      socketObj.off('delete_announcement', handleDeletePost);
    };
  }, [socketObj]);

  const publishAnnouncement = async (formData) => {
    console.log("Publishing Announcement--reached here hehehehehe:", formData);
    return await axiosPrivate.post('/announcements', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  const removeAnnouncement = async (id) => {
    try {
      await axiosPrivate.delete(`/announcements/${id}`);
      setAnnouncements(prev => prev.filter(a => (a._id !== id && a.id !== id)));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, loading, publishAnnouncement, removeAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = useContext(AnnouncementContext);
  if (!context) throw new Error("useAnnouncements must be used within AnnouncementProvider");
  return context;
};