import { motion } from 'framer-motion';

export function PendulumSimulation() {
    return (
        <div className="relative w-32 h-32 mx-auto">
            {/* Pivot point */}
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-slate-400 rounded-full -translate-x-1/2" />

            {/* String */}
            <motion.div
                className="absolute top-1 left-1/2 w-0.5 h-24 bg-slate-300 origin-top"
                animate={{
                    rotate: [15, -15, 15],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Bob */}
                <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-primary rounded-full -translate-x-1/2 shadow-lg" />
            </motion.div>
        </div>
    );
}

export function WaveSimulation() {
    return (
        <svg className="w-full h-24" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M0,25 Q25,10 50,25 T100,25 T150,25 T200,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: 1,
                    opacity: 1,
                    d: [
                        "M0,25 Q25,10 50,25 T100,25 T150,25 T200,25",
                        "M0,25 Q25,40 50,25 T100,25 T150,25 T200,25",
                        "M0,25 Q25,10 50,25 T100,25 T150,25 T200,25",
                    ]
                }}
                transition={{
                    pathLength: { duration: 1 },
                    opacity: { duration: 0.5 },
                    d: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
            />
        </svg>
    );
}

export function OrbitSimulation() {
    return (
        <div className="relative w-32 h-32 mx-auto">
            {/* Sun */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg" />

            {/* Orbit path */}
            <div className="absolute inset-4 border-2 border-dashed border-slate-300 rounded-full" />

            {/* Planet */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-md"
                animate={{
                    x: [40, 0, -40, 0, 40],
                    y: [0, 30, 0, -30, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ translateX: '-50%', translateY: '-50%' }}
            />
        </div>
    );
}

export function ProjectileMotion() {
    return (
        <div className="relative w-40 h-24 mx-auto overflow-hidden">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-300" />

            {/* Projectile */}
            <motion.div
                className="absolute bottom-1 left-0 w-3 h-3 bg-red-500 rounded-full shadow-md"
                animate={{
                    x: [0, 160],
                    y: [0, -60, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 1],
                }}
            />

            {/* Trajectory path */}
            <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 160 96">
                <motion.path
                    d="M0,96 Q80,16 160,96"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-slate-300"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
        </div>
    );
}
