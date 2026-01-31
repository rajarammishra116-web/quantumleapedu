import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { motion } from "framer-motion";

const DEFAULT_TERMS = `
# Terms and Conditions

## 1. Introduction
Throughout this document, the terms "We" / "Us" / "Our" / "Company" / "Website" individually and collectively refer to **Quantum Leap** and the terms "You" / "Your" / "Yourself" refer to the "User" / "Customer" / "Subscriber" of our website.

By accessing, browsing, or using this website, you agree to be bound by these Terms and Conditions. Please read them carefully.

## 2. Services
We provide ("Services") educational resources including:
- Interactive Simulations (External/Third-Party)
- Study Materials
- Courses for competitive exams and academic learning

Content of the website (all text, documents, videos, code) is the property of Quantum Leap, excluding external simulations which belong to their respective owners.

## 3. User Account
- You may be asked to submit personal information (Name, Email, etc.) for registration.
- You are responsible for maintaining the confidentiality of your account information.
- We reserve the right to suspend/terminate accounts if provided information is false or if the account is misused.
- Accounts are non-transferable.

## 4. Usage Rights
- **Personal Use Only**: Authorized users can access content for personal educational use.
- **No Resale**: You shall not resell, distribute, or use our content for commercial purposes.
- **No Downloading**: Unless explicitly allowed, users shall not download proprietary code or protected assets.

## 5. Intellectual Property Rights ("IPR")
All original content, design, text, graphics, and code belong to **Quantum Leap** and are protected by copyright and IPR laws. 
**Note on Simulations**: Simulations provided on this platform are aggregated from third-party sources for educational purposes. We do not claim ownership of these external simulations. All rights belong to their original creators.

## 6. Liability & Disclaimer
- We make no representations about the absolute accuracy or completeness of the data. 
- We provide content "as is" and assume no liability for any damages resulting from the use of our services.
- We reserve the right to modify or discontinue services at any time.

## 7. Changes to Terms
We reserve the right to change these Terms of Use at any time without prior notice. Continued use of the website implies acceptance of the updated terms.

## 8. Contact Us
For issues or grievances, please contact us at our support email provided on the website.
`;

export default function TermsOfService() {
    const [data, setData] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDoc(doc(db, "legalPages", "termsOfService"));
                if (snap.exists()) {
                    setData(snap.data() as any);
                } else {
                    // Fallback to default if not saved in DB yet
                    setData({ title: "Terms and Conditions", content: DEFAULT_TERMS });
                }
            } catch (error) {
                console.error("Error fetching terms:", error);
                // Fallback on error too
                setData({ title: "Terms and Conditions", content: DEFAULT_TERMS });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    // Simple Markdown-ish renderer for basic structure (headers, lists)
    // Since we don't have a markdown library installed
    const renderContent = (content: string) => {
        if (!content) return null;
        return content.split('\n').map((line, i) => {
            // Headers
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-slate-800">{line.replace('## ', '')}</h2>;
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-8 mb-4 text-slate-900">{line.replace('# ', '')}</h1>;

            // Bullets
            if (line.trim().startsWith('- ')) return <li key={i} className="ml-4 list-disc text-slate-600 mb-1">{line.replace('- ', '')}</li>;

            // Bold (simple regex for **text**)
            if (line.includes('**')) {
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={i} className="mb-3 text-slate-600 leading-relaxed">
                        {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="font-semibold text-slate-800">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                        })}
                    </p>
                );
            }

            return <p key={i} className="mb-3 text-slate-600 leading-relaxed min-h-[1em]">{line}</p>;
        });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 bg-surface-light">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 border-b border-slate-100 pb-6">
                        {data?.title || "Terms and Conditions"}
                    </h1>

                    <div className="prose prose-slate max-w-none">
                        {data?.content ? renderContent(data.content) : (
                            <p className="text-slate-500 italic">No terms and conditions content available yet.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
