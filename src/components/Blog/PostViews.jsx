import React, { useEffect, useState } from 'react';
import { getPostViews } from '../../lib/supabase';
import { Eye } from 'lucide-react';

const PostViews = ({ postId, className = '' }) => {
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        const { views: postViews } = await getPostViews(postId);
        setViews(postViews);
      } catch (error) {
        console.error('Error fetching views:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [postId]);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Eye className="w-4 h-4 text-gray-400 animate-pulse" />
        <span className="text-gray-400 text-sm">...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Eye className="w-4 h-4 text-emerald-400" />
      <span className="text-emerald-400 text-sm font-medium">
        {views.toLocaleString('pt-BR')} visualizações
      </span>
    </div>
  );
};

export default PostViews;

