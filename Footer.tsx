import React from 'react';

interface FooterProps {
  onDisclaimerClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onDisclaimerClick }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm">&copy; {new Date().getFullYear()} ZackHub. All Rights Reserved.</p>
        <div className="mt-2 sm:mt-0">
          <button 
            onClick={onDisclaimerClick} 
            className="text-sm hover:text-white transition-colors duration-200"
          >
            Disclaimer
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;