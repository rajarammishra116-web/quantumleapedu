import { Rocket, Sparkles } from 'lucide-react';

export default function Simulations() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Rocket size={40} className="text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A233A] mb-4">
            Interactive Simulations
          </h1>
          <p className="text-lg text-gray-600">
            Coming Soon
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-12">
          <div className="text-center space-y-6">
            <Sparkles size={48} className="mx-auto text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-900">
              We're Building Something Amazing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our team is working on creating interactive physics, chemistry, and mathematics simulations
              that will help you visualize complex concepts and understand them at a deeper level.
              These simulations will bridge the gap between theory and real-world application.
            </p>
            <div className="pt-6">
              <a
                href="mailto:quantumleap.org@zohomail.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A233A] text-white rounded-xl font-medium hover:bg-opacity-90 transition-all"
              >
                Get Notified When We Launch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
