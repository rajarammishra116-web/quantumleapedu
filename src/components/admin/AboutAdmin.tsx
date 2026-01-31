import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useContentData, updateAboutContent, type AboutContent } from '@/hooks/useContentData';
import { contentData } from '@/data/contentData';

export default function AboutAdmin() {
    const { aboutContent, loading } = useContentData();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState<AboutContent>({
        title: '',
        shortText: '',
        longText: '',
    });

    useEffect(() => {
        if (aboutContent) {
            setForm(aboutContent);
        } else if (!loading) {
            // Use default data from contentData.ts if nothing in Firestore
            setForm(contentData.about);
        }
    }, [aboutContent, loading]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage('Saving...');
            await updateAboutContent(form);
            setMessage('✅ About page content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            setMessage('❌ Failed to save content');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading content...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">About Page Content</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-hover disabled:opacity-50 transition-colors"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Page Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Our Story"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Short Description
                        <span className="text-xs text-slate-500 ml-2">(Shown at the top)</span>
                    </label>
                    <textarea
                        value={form.shortText}
                        onChange={(e) => setForm({ ...form, shortText: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={4}
                        placeholder="Quantum Leap began with a simple frustration..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Story
                        <span className="text-xs text-slate-500 ml-2">(Detailed content)</span>
                    </label>
                    <textarea
                        value={form.longText}
                        onChange={(e) => setForm({ ...form, longText: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={12}
                        placeholder="Born from a shared frustration with static textbooks..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        Tip: Use \n\n for paragraph breaks
                    </p>
                </div>
            </div>
        </div>
    );
}
