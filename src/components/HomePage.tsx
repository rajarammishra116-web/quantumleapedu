import { ArrowRight, Play, BookOpen, Sparkles, Telescope } from 'lucide-react';
import { contentData } from '../data/contentData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { hero, about } = contentData;

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {hero.tagline}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A233A] mb-6 leading-tight">
              {hero.headline}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('materials')}
                className="group px-8 py-4 bg-[#1A233A] text-white rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Start Exploring
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white text-[#1A233A] border-2 border-[#1A233A] rounded-xl font-medium text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Play size={20} />
                See How It Works
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1A233A] mb-2">
                Curated Content
              </h3>
              <p className="text-gray-600">
                Carefully selected study materials aligned with CBSE and Odisha Board curricula.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Telescope className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1A233A] mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-600">
                Experience concepts through simulations that bring theory to life.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1A233A] mb-2">
                Structured Pedagogy
              </h3>
              <p className="text-gray-600">
                Learning paths designed with scientific principles of education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A233A] mb-8 text-center">
            {about.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center">
            {about.text}
          </p>
        </div>
      </section>
    </div>
  );
}
