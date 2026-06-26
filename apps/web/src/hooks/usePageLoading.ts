import { useState, useEffect } from 'react';

/**
 * Returns `true` while the page-loading skeleton should be shown.
 * After `delayMs` the value flips to `false`.
 */
export function usePageLoading(delayMs = 600): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return loading;
}
