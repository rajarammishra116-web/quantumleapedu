import { ArrowRight, BookOpen, Sparkles, Telescope } from "lucide-react";
import { contentData } from "../data/contentData";
import { Page } from "../App";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { hero, about } = contentData;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A233A] mb-6 leading-tight">
              {hero.headline}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed">
              {hero.subheadline}
            </p>

            <button
              onClick={() => onNavigate("materials")}
              className="group px-8 py-4 bg-[#1A233A] text-white rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mx-auto"
            >
              Start Exploring
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* FEATURES / CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
            <FeatureCard
              icon={<BookOpen className="text-blue-600" size={24} />}
              bg="bg-blue-100"
              title="Curated Content"
              description="Carefully selected study materials aligned with CBSE and Odisha Board curricula."
            />

            <FeatureCard
              icon={<Telescope className="text-purple-600" size={24} />}
              bg="bg-purple-100"
              title="Interactive Learning"
              description="Experience concepts through simulations that bring theory to life."
            />

            <FeatureCard
              icon={<Sparkles className="text-green-600" size={24} />}
              bg="bg-green-100"
              title="Structured Pedagogy"
              description="Learning paths designed with scientific principles of education."
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A233A] mb-8">
            {about.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {about.text}
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  bg,
  title,
  description,
}: {
  icon: JSX.Element;
  bg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1A233A] mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
