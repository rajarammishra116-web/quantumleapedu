# Quantum Leap - Modern EdTech Platform

A beautiful, static EdTech platform built with React, TypeScript, and Tailwind CSS. Features a clean "Modern Google" aesthetic with full Odia language support.

## Features

- **Home Page**: Beautiful hero section with brand messaging and feature highlights
- **Study Materials**: Filterable grid of PDF study materials by Board, Class, and Subject
- **Simulations**: Placeholder page for upcoming interactive learning experiences
- **Hidden Admin Console**: Developer utility to generate configuration JSON
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Odia Language Support**: Full font support for Odia script via Noto Sans Oriya

## Getting Started

### Running the Development Server

The development server starts automatically. Visit the preview URL to see your site.

### Adding Study Materials

1. **Add PDF files** to the `public/assets/pdfs/` folder
2. **Open the Admin Console** by clicking the gear icon in the bottom-right corner (low opacity, hover to see it)
3. **Fill in the form**:
   - Select Board (CBSE or Odisha)
   - Select Class (9, 10, 11, or 12)
   - Select Subject (auto-filtered based on class)
   - Enter a title
   - Upload/select your PDF file (only captures filename)
4. **Click "Generate Config"**
5. **Copy the generated JSON**
6. **Paste it** into `src/data/contentData.ts`, replacing the existing `contentData` export
7. Refresh the page to see your new materials

### Subject Filtering Logic

- **Class 11 & 12**: Physics only
- **Class 9 & 10**: Mathematics, Physics, Chemistry, Biology, History, Geography, Polity, Economics, Philosophy

## Project Structure

```
quantum-leap/
├── public/
│   └── assets/
│       └── pdfs/              # Place your PDF files here
├── src/
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── StudyMaterials.tsx
│   │   ├── Simulations.tsx
│   │   └── AdminConsole.tsx
│   ├── data/
│   │   └── contentData.ts     # All site content and material listings
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
└── README.md
```

## Design System

### Colors
- **Primary**: Deep Navy Blue (#1A233A)
- **Secondary**: Soft Blue/Grey
- **Accent**: Electric Blue for interactive elements

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Odia Support**: Noto Sans Oriya (Google Fonts)

### Style Guidelines
- Clean, spacious layouts with generous white space
- Rounded corners (rounded-xl, rounded-2xl)
- Subtle shadows and hover effects
- Mobile-first responsive design

## Contact

**Email**: quantumleap.org@zohomail.in

**Social Media**:
- Instagram: @quantumleap
- Telegram: t.me/quantumleap
- YouTube: @quantumleap

## License

© 2025 Quantum Leap. All rights reserved.
