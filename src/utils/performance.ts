/**
 * Performance utility functions for optimization
 */

/**
 * Throttle function - limits execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Debounce function - delays execution until after wait time
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return function (this: any, ...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get device performance tier (low, medium, high)
 */
export function getDevicePerformanceTier(): 'low' | 'medium' | 'high' {
    if (typeof window === 'undefined') return 'medium';

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2;

    // Check device memory (if available)
    const memory = (navigator as any).deviceMemory || 4;

    // Check connection speed
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || '4g';

    // Low-end: < 4 cores, < 4GB RAM, or slow connection
    if (cores < 4 || memory < 4 || effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'low';
    }

    // High-end: >= 8 cores, >= 8GB RAM
    if (cores >= 8 && memory >= 8) {
        return 'high';
    }

    return 'medium';
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                img.src = src;
                observer.unobserve(img);
            }
        });
    });

    observer.observe(img);
    return () => observer.disconnect();
}

/**
 * Request idle callback wrapper with fallback
 */
export function requestIdleCallback(callback: () => void, timeout = 2000) {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, { timeout });
    }
    return setTimeout(callback, 1);
}

/**
 * Cancel idle callback wrapper
 */
export function cancelIdleCallback(id: number) {
    if ('cancelIdleCallback' in window) {
        return window.cancelIdleCallback(id);
    }
    return clearTimeout(id);
}
