import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-slate-300 dark:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center"
                animate={{
                    x: theme === 'dark' ? 28 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                    <Moon className="w-4 h-4 text-blue-400" />
                )}
            </motion.div>
        </motion.button>
    );
}
