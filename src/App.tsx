import React, { useState } from 'react';
import { Brain, Mic, MessageSquare, Lightbulb, TrendingUp, Code } from 'lucide-react';
import ConsultantCard from './components/ConsultantCard';
import ChatInterface from './components/ChatInterface';
import Navbar from './components/Navbar';

const consultants = [
  {
    id: 1,
    name: "Alex Chen",
    specialty: "AI Business Strategist",
    description: "Expert in translating AI concepts into actionable business strategies. Specializing in digital transformation and AI integration for enterprises.",
    icon: Brain,
    gradient: "from-orange-400 to-pink-600",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    skills: [
      { name: "Business Strategy" },
      { name: "AI Integration" },
      { name: "Digital Transformation" }
    ],
    category: "Business Strategy"
  },
  {
    id: 2,
    name: "Sarah Miller",
    specialty: "Technical AI Consultant",
    description: "Machine learning expert specializing in AI architecture and technical implementation for complex systems.",
    icon: Code,
    gradient: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    skills: [
      { name: "Machine Learning" },
      { name: "AI Architecture" },
      { name: "Tech Implementation" }
    ],
    category: "Technical"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    specialty: "AI Business Coach",
    description: "Guiding businesses through AI transformation with focus on growth strategy and innovation leadership.",
    icon: TrendingUp,
    gradient: "from-purple-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    skills: [
      { name: "Growth Strategy" },
      { name: "AI Leadership" },
      { name: "Innovation" }
    ],
    category: "Leadership"
  }
];

function App() {
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Experts");

  const filteredConsultants = activeCategory === "All Experts"
    ? consultants
    : consultants.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedConsultant ? (
        <ChatInterface 
          consultant={selectedConsultant} 
          onClose={() => setSelectedConsultant(null)}
        />
      ) : (
        <>
          <Navbar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <main className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our AI Consultants
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Connect with virtual experts ready to solve your AI business challenges. Get personalized guidance and save insights from every session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredConsultants.map((consultant) => (
                <ConsultantCard
                  key={consultant.id}
                  consultant={consultant}
                  onClick={() => setSelectedConsultant(consultant)}
                />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;