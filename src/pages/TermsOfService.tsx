
import { motion } from "framer-motion";

export default function TermsOfService() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                    {/* Decorative background elements matching site theme */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <motion.div {...fadeInUp} className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
                        <p className="text-slate-300 text-lg">Quantum Leap: From Ignorance to Enlightenment</p>
                    </motion.div>
                </div>

                <div className="p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="mb-6">
                            By accessing or using this website/app/platform, you agree to be bound by the following terms and conditions of use, which together with our Privacy Policy govern <strong>Quantum Leap: From Ignorance to Enlightenment</strong>’s relationship with you.
                        </p>
                        <p>
                            The terms <strong>“Quantum Leap,” “we,” “us,”</strong> or <strong>“our”</strong> refer to the owner of this website/app. The term <strong>“you”</strong> refers to the user or viewer.
                        </p>
                    </motion.section>

                    <div className="h-px bg-slate-100" />

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">1</span>
                                Intellectual Property
                            </h2>
                            <div className="pl-11 space-y-4">
                                <p>
                                    This website/app contains material owned by or licensed to Quantum Leap, including but not limited to:
                                </p>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Course content</li>
                                    <li>Text</li>
                                    <li>Graphics</li>
                                    <li>Logos</li>
                                    <li>Design, layout, and appearance</li>
                                    <li>Videos, notes, and assessments</li>
                                </ul>
                                <p>
                                    Reproduction, distribution, modification, or reuse of any material is prohibited without prior written permission, except as permitted under applicable copyright laws.
                                </p>
                                <p>
                                    All trademarks not owned by or licensed to Quantum Leap are duly acknowledged.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">2</span>
                                Unauthorized Use
                            </h2>
                            <div className="pl-11 space-y-4">
                                <p>
                                    Unauthorized use of this platform may give rise to claims for damages and/or be considered a criminal offense under applicable laws.
                                </p>
                                <p>
                                    You may not create links to this website or app from another website or document without prior written consent from Quantum Leap.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">3</span>
                                Payments & Refund Policy
                            </h2>
                            <div className="pl-11 space-y-4">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>All payments made for courses, subscriptions, or services are <strong>final and non-refundable</strong>.</li>
                                    <li>Credit/Debit card or online payment orders will be processed only after authorization from the respective payment gateway.</li>
                                    <li>Quantum Leap is not responsible for payment gateway failures or delays beyond its control.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">4</span>
                                User Responsibility
                            </h2>
                            <div className="pl-11 space-y-4">
                                <p>You are solely responsible for how you apply the knowledge, skills, or insights gained from this platform.</p>
                                <p>
                                    Quantum Leap, its founders, instructors, or affiliates shall not be held liable for any academic, professional, financial, or personal outcomes resulting from the use or misuse of the content.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">5</span>
                                Governing Law
                            </h2>
                            <div className="pl-11 space-y-4">
                                <p>
                                    Your use of this website/app and any dispute arising out of such use shall be governed by and construed in accordance with the <strong>laws of India</strong>, subject to the jurisdiction of the appropriate courts.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Acceptance of Terms</h3>
                        <p className="text-slate-600">
                            By continuing to use this platform, you confirm that you have read, understood, and agreed to these terms and conditions in full.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
