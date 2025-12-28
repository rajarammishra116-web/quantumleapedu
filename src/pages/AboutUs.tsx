export default function AboutUs() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-14">

        {/* HEADER */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#1A233A]">
            About Us
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Quantum Leap is founded with a single aim — to transform
            conceptual understanding into lifelong scientific thinking.
          </p>
        </section>

        {/* MAIN CONTENT CARD */}
        <section className="bg-white rounded-3xl shadow-sm px-8 py-10 space-y-12">

          {/* VISION */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1A233A]">
              Our Vision & Aim
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to move students beyond rote learning and
              examination-oriented preparation. We emphasize logical reasoning,
              conceptual depth, and structured problem-solving so that learning
              becomes meaningful, transferable, and enduring.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-200" />

          {/* EDUCATORS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#1A233A]">
              Our Educators
            </h2>

            <div className="rounded-2xl bg-gray-50 p-6 transition-shadow hover:shadow-md">
              <p className="text-gray-700 leading-relaxed">
                Our educators bring strong academic foundations, subject
                mastery, and teaching experience focused on conceptual clarity
                rather than shortcuts. Every course is designed and delivered
                with long-term intellectual growth and disciplined thinking
                in mind.
              </p>
            </div>

            {/* Future educator profiles can be added here */}
          </div>

        </section>

      </div>
    </div>
  );
}
