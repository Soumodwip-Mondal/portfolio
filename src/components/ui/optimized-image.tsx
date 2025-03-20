'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lowQualitySrc, setLowQualitySrc] = useState('');

  useEffect(() => {
    // Generate a low quality placeholder by adding size parameters
    // This assumes your images support query parameters for resizing
    // Adjust based on your image hosting solution
    if (src.includes('http')) {
      const urlObj = new URL(src);
      urlObj.searchParams.set('q', '10'); // Low quality
      urlObj.searchParams.set('w', '50'); // Width = 50px
      setLowQualitySrc(urlObj.toString());
    } else {
      // For local images, we'll use a simple blur placeholder
      setLowQualitySrc(src);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {lowQualitySrc && (
        <img 
          src={lowQualitySrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover filter blur-lg scale-110 transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
