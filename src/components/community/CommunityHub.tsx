"use client";

import React, { useState } from 'react';
import { CommunityPost, Language } from '@/types/heritage';
import { initialCommunityPosts } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { speechGuide } from '@/lib/speech';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause, 
  Radio, 
  Sparkles, 
  Send, 
  Volume2,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CommunityHubProps {
  currentLanguage: Language;
  onEarnPoints: (points: number, reason: string) => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({
  currentLanguage,
  onEarnPoints
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});
  const [playingAudioPostId, setPlayingAudioPostId] = useState<number | null>(null);

  const handleLikePost = (postId: number) => {
    soundManager.playClick();
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          const newLikes = hasLiked ? post.likes + 1 : post.likes - 1;
          if (hasLiked) {
            toast.success('Appreciation sent to the artisan guild! +5 XP');
            onEarnPoints(5, `Liked artisan story #${postId}`);
          }
          return { ...post, hasLiked, likes: newLikes };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    soundManager.playClick();
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComments = [
            ...post.comments,
            {
              id: Date.now(),
              author: 'Heritage Explorer (You)',
              text,
              time: 'Just now'
            }
          ];
          return { ...post, comments: newComments };
        }
        return post;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    toast.success('Comment published to oral archive! +10 XP');
    onEarnPoints(10, `Contributed scholarly reflection on post #${postId}`);
  };

  const handleToggleAudioStory = (post: CommunityPost) => {
    soundManager.playClick();
    if (playingAudioPostId === post.id) {
      speechGuide.stop();
      setPlayingAudioPostId(null);
    } else {
      speechGuide.stop();
      setPlayingAudioPostId(post.id);
      
      const narrationText = post.audioStory
        ? `${post.audioStory.title}. Narrated by ${post.audioStory.narrator}. ${post.description}`
        : post.description;

      speechGuide.speak(
        narrationText,
        currentLanguage,
        () => setPlayingAudioPostId(null),
        () => setPlayingAudioPostId(null)
      );

      toast.info(`Playing oral history: "${post.audioStory?.title || post.title}"`);
    }
  };

  const handleShare = (postTitle: string) => {
    soundManager.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Explore "${postTitle}" on Hybrid Heritage Guardian: https://ignicion-app.vercel.app`);
      toast.success('Share link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-teal-400/30 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-teal-300 animate-pulse" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              {getTranslation('navCommunity', currentLanguage)} & Living Lore
            </h2>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Voices of hereditary master artisans, songlines of the kiln, and shared preservation journeys.
          </p>
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-2xl bg-white border-amber-200/80 shadow-md overflow-hidden">
            {/* Author bar */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shadow-2xs">
                  {post.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-slate-900 text-sm">
                      {post.author}
                    </h4>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {post.role} • {post.region}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400">{post.time}</span>
            </div>

            {/* Post Media */}
            <div className="aspect-16/9 overflow-hidden bg-slate-100 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5">
                <Badge className="bg-black/70 text-amber-300 backdrop-blur-md border border-white/20 text-[10px]">
                  {post.craft}
                </Badge>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                  {post.title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Audio Oral Lore Bar */}
              {post.audioStory && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Button
                      size="icon"
                      onClick={() => handleToggleAudioStory(post)}
                      className={`w-9 h-9 rounded-full ${
                        playingAudioPostId === post.id
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-teal-700 hover:bg-teal-800 text-white'
                      }`}
                    >
                      {playingAudioPostId === post.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </Button>
                    <div className="text-xs">
                      <span className="font-bold text-teal-950 block">
                        {post.audioStory.title}
                      </span>
                      <span className="text-[10px] text-teal-700">
                        {post.audioStory.duration} · Oral Chant Archive
                      </span>
                    </div>
                  </div>

                  <Volume2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                </div>
              )}

              {/* Like / Share Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasLiked ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-600' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(post.title)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1" /> Share
                </Button>
              </div>

              {/* Comments Section */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{comment.author}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{comment.time}</span>
                    </div>
                    <p className="text-slate-600">{comment.text}</p>
                  </div>
                ))}

                {/* Add Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <Input
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    placeholder="Share your reflection with the artisan..."
                    className="text-xs bg-slate-50 border-slate-200"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleAddComment(post.id)}
                    className="w-9 h-9 bg-[#1A237E] hover:bg-[#101758] text-white flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
