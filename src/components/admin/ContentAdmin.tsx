import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useContentData, updateHomepageContent, type HomepageContent } from '@/hooks/useContentData';
import { contentData } from '@/data/contentData';

export default function ContentAdmin() {
    const { homepageContent, loading } = useContentData();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState<HomepageContent>({
        hero: {
            tagline: '',
            headline: '',
            subheadline: '',
        },
        features: [],
    });

    useEffect(() => {
        if (homepageContent) {
            setForm(homepageContent);
        } else if (!loading) {
            // Use default data from contentData.ts if nothing in Firestore
            setForm({
                hero: contentData.hero,
                features: contentData.features,
            });
        }
    }, [homepageContent, loading]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage('Saving...');
            await updateHomepageContent(form);
            setMessage('✅ Homepage content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            setMessage('❌ Failed to save content');
        } finally {
            setSaving(false);
        }
    };

    const addFeature = () => {
        setForm({
            ...form,
            features: [
                ...form.features,
                { title: '', description: '', cardColor: 'bg-classroom-orange' },
            ],
        });
    };

    const removeFeature = (index: number) => {
        setForm({
            ...form,
            features: form.features.filter((_, i) => i !== index),
        });
    };

    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...form.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setForm({ ...form, features: newFeatures });
    };

    if (loading) {
        return <div className="text-center py-8">Loading content...</div>;
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">Homepage Content</h3>
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

            {/* Hero Section */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Hero Section</h4>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tagline</label>
                    <input
                        type="text"
                        value={form.hero.tagline}
                        onChange={(e) => setForm({ ...form, hero: { ...form.hero, tagline: e.target.value } })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="From ignorance to enlightenment."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Headline</label>
                    <input
                        type="text"
                        value={form.hero.headline}
                        onChange={(e) => setForm({ ...form, hero: { ...form.hero, headline: e.target.value } })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Don't Just Memorize. Learn to Think."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subheadline</label>
                    <textarea
                        value={form.hero.subheadline}
                        onChange={(e) => setForm({ ...form, hero: { ...form.hero, subheadline: e.target.value } })}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                        placeholder="We help students move beyond rote learning..."
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-slate-900">Features</h4>
                    <button
                        onClick={addFeature}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                    >
                        <Plus size={18} />
                        Add Feature
                    </button>
                </div>

                {form.features.map((feature, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-500">Feature {index + 1}</span>
                            <button
                                onClick={() => removeFeature(index)}
                                className="text-red-600 hover:text-red-700 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={feature.title}
                                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                            <textarea
                                value={feature.description}
                                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Card Color</label>
                            <select
                                value={feature.cardColor}
                                onChange={(e) => updateFeature(index, 'cardColor', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="bg-classroom-orange">Orange</option>
                                <option value="bg-classroom-yellow">Yellow</option>
                                <option value="bg-classroom-green">Green</option>
                                <option value="bg-classroom-blue">Blue</option>
                                <option value="bg-classroom-purple">Purple</option>
                                <option value="bg-classroom-red">Red</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
