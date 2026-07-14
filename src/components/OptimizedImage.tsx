import React from 'react';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  priority?: boolean;
  widths?: number[];
  fallbackSrc?: string;
}

/**
 * Generates an optimized image URL for supported CDNs (Unsplash & Google User Content).
 */
export function getOptimizedUrl(url: string, width: number): string {
  if (!url) return '';
  
  // Unsplash Images
  if (url.includes('images.unsplash.com') || url.includes('unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('w', width.toString());
      // Adjust quality based on width for maximum performance/bytes ratio
      const quality = width <= 400 ? '70' : '80';
      parsed.searchParams.set('q', quality);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      return parsed.toString();
    } catch (e) {
      // Regex fallback if URL constructor fails (e.g. relative or malformed URL)
      if (url.includes('w=')) {
        return url.replace(/w=\d+/, `w=${width}`);
      }
      return `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=80&auto=format&fit=crop`;
    }
  }
  
  // Google User Content
  if (url.includes('googleusercontent.com')) {
    // Strip any trailing resize/crop params like =w800, =s600, =h400, =w32-c, etc.
    const cleanUrl = url.replace(/=w\d+.*$|=s\d+.*$|=h\d+.*$|=-c.*$|=s\d+.*$/, '');
    return `${cleanUrl}=w${width}`;
  }
  
  return url;
}

export default function OptimizedImage({
  src,
  priority = false,
  widths = [300, 600, 900, 1200, 1600],
  sizes = '(max-width: 768px) 100vw, 800px',
  alt = '',
  className = '',
  fallbackSrc = '',
  ...props
}: OptimizedImageProps) {
  // If no source is provided, return empty space or fallback
  if (!src) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} {...props} />;
    }
    return null;
  }

  const isOptimizable = src.includes('images.unsplash.com') || 
                        src.includes('unsplash.com') || 
                        src.includes('googleusercontent.com');

  if (!isOptimizable) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high' } as any : {})}
        {...props}
      />
    );
  }

  // Generate SrcSet for optimizing responsive sizes
  const srcSet = widths
    .map((w) => `${getOptimizedUrl(src, w)} ${w}w`)
    .join(', ');

  // Use a sensible default width for the standard fallback src attribute
  const defaultWidth = priority ? 1200 : 800;
  const fallbackSource = getOptimizedUrl(src, defaultWidth);

  return (
    <img
      src={fallbackSource}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' } as any : {})}
      {...props}
    />
  );
}
