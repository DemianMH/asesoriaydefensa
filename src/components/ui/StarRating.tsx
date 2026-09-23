"use client";

import { Star } from "lucide-react";

export default function StarRating({
  rating,
  size = 18,
  interactive = false,
  onChange,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          onClick={interactive ? () => onChange?.(value) : undefined}
          className={`${interactive ? "cursor-pointer" : ""} transition-colors ${
            value <= rating ? "fill-gold-400 text-gold-400" : "fill-transparent text-gold-200"
          }`}
        />
      ))}
    </div>
  );
}
