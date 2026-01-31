import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: boolean;
}

export function Skeleton({
    className = '',
    variant = 'text',
    width,
    height,
    animation = true,
}: SkeletonProps) {
    const baseClasses = 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';

    const variantClasses = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const animationClasses = animation ? 'animate-shimmer' : '';

    const style: React.CSSProperties = {
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'circular' ? width : undefined),
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses} ${className}`}
            style={style}
        />
    );
}

// Skeleton for course cards
export function CourseCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-1 flex flex-col h-full overflow-hidden">
            <Skeleton variant="rectangular" height={96} className="rounded-xl mb-4" />
            <div className="p-5 space-y-4">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
                <div className="flex gap-2 mt-4">
                    <Skeleton variant="rectangular" width={80} height={32} />
                    <Skeleton variant="rectangular" width={100} height={32} />
                </div>
            </div>
        </div>
    );
}

// Skeleton for study material cards
export function MaterialCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900">
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl" />
                    <div className="flex-1 space-y-3">
                        <div className="flex gap-2">
                            <Skeleton variant="rectangular" width={60} height={20} />
                            <Skeleton variant="rectangular" width={70} height={20} />
                        </div>
                        <Skeleton variant="text" width="70%" height={24} />
                        <Skeleton variant="text" width="50%" />
                    </div>
                </div>
                <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl" />
            </div>
        </div>
    );
}

// Skeleton for simulation cards
export function SimulationCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl border-4 border-slate-900 overflow-hidden flex flex-col h-full">
            <Skeleton variant="rectangular" height={128} className="rounded-none" />
            <div className="p-6 space-y-4">
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="rectangular" width="100%" height={48} className="rounded-xl mt-6" />
            </div>
        </div>
    );
}

// Generic list skeleton
export function ListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                    </div>
                </div>
            ))}
        </div>
    );
}
