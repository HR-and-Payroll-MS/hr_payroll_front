import React, { useMemo } from "react";
import { useNotifications } from "../../../../Context/NotificationProvider";
import NewsCard from "./NewsCard";
import Icon from "../../../../Components/Icon";

export default function NewsFeedPage() {
  // Pulling the shared state from your Provider
  const { items, markRead, remove, setSelected } = useNotifications();

  // We filter for "News" type notifications (System, Announcements, etc.)
  const feedItems = useMemo(() => {
    return (items || [])
      .filter(n => n.category === "system" || n.category === "announcement")
      // Socket items come in with created_at, existing items might have createdAt
      .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
  }, [items]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Company Feed</h1>
            <p className="text-sm text-slate-500">Stay updated with the latest announcements</p>
          </div>
          <Icon name="Newspaper" className="text-slate-300 w-10 h-10" />
        </div>
        
        <div className="space-y-6">
          {feedItems.length > 0 ? (
            feedItems.map((post) => (
              <NewsCard 
                key={post.id} 
                post={post} 
                onView={() => {
                  if (post.unread) markRead(post.id); // 🔹 Same logic: Mark read on click
                  setSelected(post); // 🔹 Same logic: Navigate to detail
                }}
              />
            ))
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center">
              <p className="text-slate-400 italic">No news stories found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}