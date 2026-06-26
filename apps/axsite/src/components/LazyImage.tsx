import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="eager"
        decoding="sync"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-transparent animate-pulse" />
      )}
    </div>
  );
}