import { ContentData } from '../types';

export const contentData: ContentData = {
  hero: {
    headline: "Don't Just Memorize. Experience It.",
    subheadline: "Mastering complex concepts through interactive simulations, scientifically structured pedagogy, and curated learning paths.",
    tagline: "From ignorance to enlightenment."
  },
  about: {
    title: "Our Story",
    shortText: "Born from a shared frustration with static textbooks and one-size-fits-all schooling, we started as a small group of educators and technologists with a simple question: \"What if learning felt less like a chore and more like a discovery?\" We realized that the traditional education system often prioritizes rote memorization over genuine understanding, leaving countless brilliant minds disengaged and uninspired.",
    longText: "Born from a shared frustration with static textbooks and one-size-fits-all schooling, we started as a small group of educators and technologists with a simple question: \"What if learning felt less like a chore and more like a discovery?\" We realized that the traditional education system often prioritizes rote memorization over genuine understanding, leaving countless brilliant minds disengaged and uninspired. \n\n We are a new, passionate company, but our vision is bold. We are building the educational platform we wish we had growing up—one that adapts to you, moves at your speed, and turns abstract concepts into tangible experiences. We aren't just creating another study app; we are crafting a new era of learning where curiosity leads the way. We believe that every student has a \"quantum leap\" in them waiting to happen, and we are here to provide the launchpad."
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
