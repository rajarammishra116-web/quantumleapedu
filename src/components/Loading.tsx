import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="relative">
                {/* Outer ring */}
                <motion.div
                    className="absolute top-0 left-0 w-20 h-20 border-4 border-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner spinning ring */}
                <motion.div
                    className="absolute top-0 left-0 w-20 h-20 border-4 border-primary rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Center logo/icon */}
                <div className="w-20 h-20 flex items-center justify-center">
                    <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    );
}

