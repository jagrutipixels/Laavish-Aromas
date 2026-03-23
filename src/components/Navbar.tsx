import { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS, Product, CartItem } from '../types';

interface NavbarProps {
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({ cartCount, setIsCartOpen }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    return ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="https://raw.githubusercontent.com/jagrutipixels/Laavish-Aromas/9dbdc0b8fa31c97196eaef90bc29198d82f2d4e2/black-centre-logo-upload.png" 
              alt="Laavish Aromas Logo" 
              className="h-14 md:h-16 lg:h-24 w-auto object-contain transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 font-medium uppercase text-xs lg:text-sm tracking-[0.15em] lg:tracking-[0.2em]">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={`hover:text-yellow-600 transition-colors whitespace-nowrap ${location.pathname === link.path ? 'text-yellow-600' : ''}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 shrink-0">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-yellow-600 transition-colors">
              <Search className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-yellow-600 transition-colors relative">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-600 text-white text-[9px] lg:text-[10px] w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8 pt-32"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8"><X className="w-8 h-8" /></button>
            <div className="flex flex-col space-y-8 text-2xl font-serif">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-600 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div key="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col items-center pt-32 px-6">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 hover:rotate-90 transition-transform duration-300"><X className="w-8 h-8" /></button>
            <div className="w-full max-w-2xl">
              <input 
                autoFocus 
                type="text" 
                placeholder="Search fragrances..." 
                className="w-full text-3xl md:text-5xl font-serif bg-transparent border-b border-gray-200 pb-4 focus:outline-none focus:border-yellow-600 transition-colors"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`} 
                    className="flex items-center space-x-4 cursor-pointer group" 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  >
                    <div className="w-20 h-20 overflow-hidden bg-gray-100">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg">{product.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">{product.notes}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
