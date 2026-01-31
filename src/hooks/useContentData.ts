import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export interface HomepageContent {
    hero: {
        tagline: string;
        headline: string;
        subheadline: string;
    };
    features: Array<{
        title: string;
        description: string;
        cardColor: string;
    }>;
}

export interface AboutContent {
    title: string;
    shortText: string;
    longText: string;
}

export function useContentData() {
    const [homepageContent, setHomepageContent] = useState<HomepageContent | null>(null);
    const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const homepageDoc = await getDoc(doc(db, 'siteContent', 'homepage'));
                const aboutDoc = await getDoc(doc(db, 'siteContent', 'about'));

                if (homepageDoc.exists()) {
                    setHomepageContent(homepageDoc.data() as HomepageContent);
                }

                if (aboutDoc.exists()) {
                    setAboutContent(aboutDoc.data() as AboutContent);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { homepageContent, aboutContent, loading };
}

export async function updateHomepageContent(content: HomepageContent) {
    await setDoc(doc(db, 'siteContent', 'homepage'), content);
}

export async function updateAboutContent(content: AboutContent) {
    await setDoc(doc(db, 'siteContent', 'about'), content);
}
