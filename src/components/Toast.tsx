import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const config = {
        success: {
            icon: CheckCircle2,
            bg: 'bg-green-50',
            border: 'border-green-500',
            text: 'text-green-900',
            iconColor: 'text-green-500',
        },
        error: {
            icon: XCircle,
            bg: 'bg-red-50',
            border: 'border-red-500',
            text: 'text-red-900',
            iconColor: 'text-red-500',
        },
        warning: {
            icon: AlertTriangle,
            bg: 'bg-yellow-50',
            border: 'border-yellow-500',
            text: 'text-yellow-900',
            iconColor: 'text-yellow-500',
        },
        info: {
            icon: Info,
            bg: 'bg-blue-50',
            border: 'border-blue-500',
            text: 'text-blue-900',
            iconColor: 'text-blue-500',
        },
    };

    const { icon: Icon, bg, border, text, iconColor } = config[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${bg} ${text} border-2 ${border} rounded-xl p-4 shadow-lg flex items-start gap-3 min-w-[300px]`}
        >
            <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
            <p className="flex-1 font-medium text-sm leading-relaxed">{toast.message}</p>
            <button
                onClick={onClose}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
                <X size={18} />
            </button>
        </motion.div>
    );
}
