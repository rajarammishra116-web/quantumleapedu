import { ContentData } from '../types';

export const contentData: ContentData = {
  hero: {
    headline: "Don't Just Memorize. Experience It.",
    subheadline: "Mastering complex concepts through interactive simulations, scientifically structured pedagogy, and curated learning paths.",
    tagline: "From ignorance to enlightenment."
  },
  about: {
    title: "Our Story",
    text: "We believe that true learning happens when you bridge the gap between theory and reality. We combine the visual power of interactive technology with the structure of classical pedagogy to create a learning environment where curiosity leads to mastery."
  },
  studyMaterials: [
    {
      id: '1',
      board: 'CBSE',
      class: '11',
      subject: 'Physics',
      title: 'Motion in a Straight Line - Chapter 1',
      pdfPath: '/assets/pdfs/motion_ch1.pdf'
    },
    {
      id: '2',
      board: 'CBSE',
      class: '9',
      subject: 'Mathematics',
      title: 'Number Systems - Complete Notes',
      pdfPath: '/assets/pdfs/number_systems.pdf'
    },
    {
      id: '3',
      board: 'Odisha',
      class: '10',
      subject: 'Chemistry',
      title: 'Chemical Reactions and Equations',
      pdfPath: '/assets/pdfs/chemical_reactions.pdf'
    }
  ],
  footer: {
    email: 'quantumleap.org@zohomail.in',
    socials: {
      instagram: 'https://instagram.com/quantumleap',
      telegram: 'https://t.me/quantumleap',
      youtube: 'https://youtube.com/@quantumleap'
    }
  }
};
