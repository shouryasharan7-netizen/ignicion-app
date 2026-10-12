"use client";

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 text-amber-900 p-4 text-center ${className || ''}`}>
        <Sparkles className="w-6 h-6 text-amber-600 mb-1 animate-pulse" />
        <span className="font-serif font-bold text-xs">{alt || 'Cultural Heritage Artifact'}</span>
        {fallbackText && <span className="text-[10px] text-amber-800 opacity-80 mt-0.5">{fallbackText}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};