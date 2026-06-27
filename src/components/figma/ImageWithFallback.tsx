"use client";
import React, { useState } from 'react';

export const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? '/placeholder.png' : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};