import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  color?: string;
}

interface ConsultantCardProps {
  consultant: {
    name: string;
    specialty: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    image: string;
    skills?: Skill[];
  };
  onClick: () => void;
  isSelected?: boolean;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, onClick }) => {
  const defaultSkills = [
    { name: 'Business Strategy' },
    { name: 'AI Integration' },
    { name: 'Digital Transformation' }
  ];

  const skills = consultant.skills || defaultSkills;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl transition-all duration-300 hover:scale-[1.02] h-full"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
      
      {/* Card content */}
      <div className="relative h-full rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        
        <div className="relative p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={consultant.image}
              alt={consultant.name}
              className="w-16 h-16 rounded-full border-2 border-white/10"
            />
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{consultant.name}</h3>
              <p className="text-sm font-medium text-gray-400">{consultant.specialty}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300 border border-gray-700"
              >
                {skill.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-8 flex-grow line-clamp-3">{consultant.description}</p>

          {/* Button */}
          <button
            className="w-full py-3 px-4 rounded-xl font-medium text-center transition-all duration-200
              bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
              text-white shadow-lg shadow-blue-500/25 mt-auto"
          >
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsultantCard;