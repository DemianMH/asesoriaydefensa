"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toggleLike } from "@/actions/likes";

const STORAGE_KEY = "adl_liked_posts";

function getLikedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveLikedSet(set: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export default function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Deferred to after hydration on purpose: localStorage is unavailable during
    // SSR, so reading it synchronously during render would cause a hydration
    // mismatch between the server-rendered heart icon and the client one.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(getLikedSet().has(postId));
  }, [postId]);

  const handleClick = () => {
    const next = !liked;
    setLiked(next);
    setLikes((l) => l + (next ? 1 : -1));

    const set = getLikedSet();
    if (next) set.add(postId);
    else set.delete(postId);
    saveLikedSet(set);

    startTransition(() => {
      toggleLike(postId, next);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 text-sm text-navy-700/70 hover:text-gold-600 transition-colors"
      aria-pressed={liked}
    >
      <motion.span whileTap={{ scale: 1.4 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
        <Heart size={18} className={liked ? "fill-gold-500 text-gold-500" : ""} />
      </motion.span>
      {likes}
    </button>
  );
}
