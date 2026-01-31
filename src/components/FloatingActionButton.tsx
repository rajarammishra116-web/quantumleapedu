import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        {
            icon: Mail,
            label: 'Email Us',
            href: 'mailto:contact@quantumleap.edu',
            color: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            icon: Phone,
            label: 'Call Us',
            href: 'tel:+911234567890',
            color: 'bg-green-500 hover:bg-green-600',
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
                    >
                        {actions.map((action, index) => (
                            <motion.a
                                key={index}
                                href={action.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className={`${action.color} text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all hover:scale-105`}
                            >
                                <action.icon size={18} />
                                {action.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
