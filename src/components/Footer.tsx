import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img 
                src="https://raw.githubusercontent.com/jagrutipixels/Laavish-Aromas/68748921cca8c56d7cd651d305f8dac096261d6d/Laavish_Aromas_File-whatsapp.jpg" 
                alt="Laavish Aromas Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-gray-400 font-light max-w-sm">
              Crafting luxury fragrances that capture the essence of elegance and sophistication.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-light">
              <li><Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link></li>
              <li><Link to="/collection" className="hover:text-yellow-600 transition-colors">Collection</Link></li>
              <li><Link to="/about" className="hover:text-yellow-600 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Connect</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest pt-8 border-t border-gray-50">
          © 2024 Laavish Aromas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
