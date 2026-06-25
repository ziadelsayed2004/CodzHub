interface SkeletonLoaderProps {
  variant: 'hero' | 'grid' | 'form' | 'about';
  count?: number;
}

export default function SkeletonLoader({ variant, count = 3 }: SkeletonLoaderProps) {
  if (variant === 'hero') {
    return (
      <div className="container skeleton-hero-container">
        <div className="skeleton-pulse skeleton-badge" />
        <div className="skeleton-pulse skeleton-hero-title" />
        <div className="skeleton-pulse skeleton-hero-desc" />
        <div className="skeleton-hero-actions">
          <div className="skeleton-pulse skeleton-button" />
          <div className="skeleton-pulse skeleton-button" />
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="container">
        <div className="skeleton-grid-header">
          <div className="skeleton-pulse skeleton-badge skeleton-margin-sm-center" />
          <div className="skeleton-pulse skeleton-title skeleton-w-45 skeleton-margin-md-center" />
          <div className="skeleton-pulse skeleton-text skeleton-w-65 skeleton-margin-xxl-center" />
        </div>
        <div className="grid-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div>
                <div className="skeleton-pulse skeleton-badge" />
                <div className="skeleton-pulse skeleton-title skeleton-w-70 skeleton-h-title-sm" />
                <div className="skeleton-pulse skeleton-text skeleton-w-100" />
                <div className="skeleton-pulse skeleton-text skeleton-w-90" />
                <div className="skeleton-pulse skeleton-text skeleton-w-80" />
              </div>
              <div className="skeleton-pulse skeleton-text skeleton-w-40 skeleton-h-link-btn" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'about') {
    return (
      <div className="container skeleton-about-container">
        {/* 1. About Hero Skeleton */}
        <div className="skeleton-about-hero">
          <div className="skeleton-pulse skeleton-badge" />
          <div className="skeleton-pulse skeleton-title skeleton-w-50 skeleton-center" />
          <div className="skeleton-pulse skeleton-text skeleton-w-70 skeleton-margin-md-center" />
        </div>
        
        {/* 2. Founder Section Skeleton */}
        <div className="skeleton-card skeleton-about-founder">
          <div className="skeleton-pulse skeleton-avatar" />
          <div className="skeleton-about-founder-details">
            <div className="skeleton-pulse skeleton-badge" />
            <div className="skeleton-pulse skeleton-title skeleton-w-60" />
            <div className="skeleton-pulse skeleton-text skeleton-w-100" />
            <div className="skeleton-pulse skeleton-text skeleton-w-95" />
            <div className="skeleton-pulse skeleton-text skeleton-w-90" />
          </div>
        </div>

        {/* 3. Principles Section Skeleton */}
        <div>
          <div className="skeleton-grid-header">
            <div className="skeleton-pulse skeleton-title skeleton-w-35 skeleton-margin-xl-center" />
          </div>
          <div className="grid-2">
            <div className="skeleton-card skeleton-value-card">
              <div className="skeleton-card-header">
                <div className="skeleton-pulse skeleton-circle-icon" />
                <div className="skeleton-pulse skeleton-title skeleton-w-50 skeleton-h-title-xs" />
              </div>
              <div className="skeleton-pulse skeleton-text skeleton-w-100 skeleton-margin-none" />
              <div className="skeleton-pulse skeleton-text skeleton-w-85 skeleton-margin-none" />
            </div>
            <div className="skeleton-card skeleton-value-card">
              <div className="skeleton-card-header">
                <div className="skeleton-pulse skeleton-circle-icon" />
                <div className="skeleton-pulse skeleton-title skeleton-w-50 skeleton-h-title-xs" />
              </div>
              <div className="skeleton-pulse skeleton-text skeleton-w-100 skeleton-margin-none" />
              <div className="skeleton-pulse skeleton-text skeleton-w-85 skeleton-margin-none" />
            </div>
          </div>
        </div>

        {/* 4. Technical Mindset Skeleton */}
        <div className="why-us-section skeleton-mindset-banner">
          <div className="container skeleton-mindset-inner">
            <div className="skeleton-pulse skeleton-badge" />
            <div className="skeleton-pulse skeleton-title skeleton-w-40 skeleton-margin-md-center" />
            <div className="skeleton-pulse skeleton-text skeleton-w-60 skeleton-center" />
            <div className="skeleton-pulse skeleton-text skeleton-w-50 skeleton-center" />
          </div>
        </div>

        {/* 5. CTA Skeleton */}
        <div className="container skeleton-cta-inner">
          <div className="skeleton-pulse skeleton-title skeleton-w-40 skeleton-center" />
          <div className="skeleton-pulse skeleton-text skeleton-w-60 skeleton-margin-md-center" />
          <div className="skeleton-pulse skeleton-button skeleton-center" />
        </div>
      </div>
    );
  }

  if (variant === 'form') {
    return (
      <div className="container skeleton-form-container">
        <div className="skeleton-form-header">
          <div className="skeleton-pulse skeleton-badge" />
          <div className="skeleton-pulse skeleton-title skeleton-w-40 skeleton-center" />
          <div className="skeleton-pulse skeleton-text skeleton-w-60 skeleton-margin-form-sub" />
        </div>
        <div className="skeleton-card skeleton-form-card">
          {/* Row 1: Name and Email */}
          <div className="skeleton-form-row">
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-35" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-35" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
          </div>
          
          {/* Row 2: Phone and Company */}
          <div className="skeleton-form-row">
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-30" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-30" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
          </div>

          {/* Project Type */}
          <div className="skeleton-form-field">
            <div className="skeleton-pulse skeleton-text skeleton-w-25" />
            <div className="skeleton-pulse skeleton-h-form-field" />
          </div>

          {/* Row 4: Budget and Timeline */}
          <div className="skeleton-form-row">
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-30" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
            <div className="skeleton-form-field">
              <div className="skeleton-pulse skeleton-text skeleton-w-30" />
              <div className="skeleton-pulse skeleton-h-form-field" />
            </div>
          </div>

          {/* Reference Link */}
          <div className="skeleton-form-field">
            <div className="skeleton-pulse skeleton-text skeleton-w-25" />
            <div className="skeleton-pulse skeleton-h-form-field" />
          </div>

          {/* Message textarea */}
          <div className="skeleton-form-field">
            <div className="skeleton-pulse skeleton-text skeleton-w-20" />
            <div className="skeleton-pulse skeleton-h-textarea" />
          </div>
          
          {/* Submit button */}
          <div className="skeleton-pulse skeleton-button skeleton-w-100 skeleton-h-btn" />
        </div>
      </div>
    );
  }

  return null;
}
