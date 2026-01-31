import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gold-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <span className="text-gold-700 w-5 h-5">✨</span>
          <span className="font-header text-lg text-gold-700 uppercase">EDC-VIT</span>
        </div>
        <div className="text-gray-600 text-sm font-body italic">
          "The wind carries it in its belly, the nurse thereof is the earth."
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">●</a>
          <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">△</a>
          <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">■</a>
        </div>
      </div>
    </footer>
  );
};
