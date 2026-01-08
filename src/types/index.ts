export type Board = 'CBSE' | 'Odisha';
export type Class = '9' | '10' | '11' | '12';
export type Subject = 'Physics' | 'Mathematics' | 'Chemistry' | 'Biology' | 'History' | 'Geography' | 'Polity' | 'Economics' | 'Philosophy';

export interface StudyMaterial {
  id: string;
  board: Board;
  class: Class;
  subject: Subject;
  title: string;
  pdfPath: string;
}

export interface Feature {
  title: string;
  description: string;
  cardColor: string;
}

export interface ContentData {
  hero: {
    headline: string;
    subheadline: string;
    tagline: string;
  };
  features: Feature[];
  about: {
    title: string;
    shortText: string;
    longText: string;
  };
  studyMaterials: StudyMaterial[];
  footer: {
    email: string;
    socials: {
      instagram: string;
      telegram: string;
      youtube: string;
    };
  };
}
