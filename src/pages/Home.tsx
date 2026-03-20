import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ALL_PRODUCTS, Product } from '../types';
import { useState } from 'react';

interface HomeProps {
  addToCart: (product: Product) => void;
  setToast: (msg: string) => void;
}

export default function Home({ addToCart, setToast }: HomeProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const quizQuestions = [
    {
      question: "What's your ideal environment?",
      options: ["A lush forest", "A blooming garden", "A coastal escape", "A cozy library"]
    },
    {
      question: "Which scent profile do you prefer?",
      options: ["Woody & Earthy", "Floral & Sweet", "Fresh & Citrus", "Spicy & Warm"]
    },
    {
      question: "When do you usually wear perfume?",
      options: ["Every day", "Special occasions", "Evening outings", "Professional settings"]
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const suggested = ALL_PRODUCTS[Math.floor(Math.random() * ALL_PRODUCTS.length)];
      window.location.href = `/product/${suggested.id}`;
    }
  };

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Laavish Aromas | Luxury Perfumery & Signature Fragrances</title>
        <meta name="description" content="Discover the essence of elegance with Laavish Aromas. Explore our signature collection of luxury perfumes, trending scents, and latest arrivals." />
        <meta name="keywords" content="luxury perfume, signature fragrances, designer scents, Laavish Aromas, artisanal perfumery" />
      </Helmet>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 10 }} 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover brightness-[0.65]" 
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <span className="text-yellow-500 uppercase tracking-[0.5em] text-[10px] font-medium">Luxury Perfumery</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-8xl mb-6 font-serif">The Essence of Elegance</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-lg md:text-xl mb-12 font-light tracking-[0.2em]">Experience luxury in every drop with Laavish Aromas.</motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/collection" className="group inline-flex items-center space-x-4 border border-white/50 px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button onClick={() => setIsQuizOpen(true)} className="group inline-flex items-center space-x-4 bg-white text-black px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-yellow-600 hover:text-white transition-all duration-500">
              <span>Find Your Scent</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-12 text-[10px] uppercase tracking-[0.5em] font-light">
              Trending Now: Oud Royal • Velvet Rose • Midnight Musk • Saffron Gold • Azure Breeze • 
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Collection */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 font-serif">Signature Selection</h2>
          <div className="h-[1px] bg-yellow-600 mx-auto w-20 mb-12" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {ALL_PRODUCTS.slice(0, 3).map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group cursor-pointer">
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden bg-[#f3f2ef] aspect-[3/4] mb-6">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-sm">
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} className="w-full py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-yellow-600 transition-colors">Quick Add</button>
                  </div>
                </div>
                <h3 className="text-2xl mb-2 font-serif">{product.name}</h3>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{product.notes}</p>
                <p className="text-lg font-light text-yellow-800">${product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/collection" className="inline-flex items-center space-x-4 border border-black px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500">
            <span>Explore All Fragrances</span>
          </Link>
        </div>
      </section>

      {/* Trending */}
      <section className="bg-stone-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl mb-4 font-serif">Trending Now</h2>
            <p className="text-gray-400 uppercase text-[10px] tracking-[0.4em]">The scents everyone is talking about</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ALL_PRODUCTS.filter(p => p.category === 'Trending').slice(0, 2).map(product => (
              <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[600px] group cursor-pointer overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 text-white">
                    <span className="text-yellow-500 text-[10px] uppercase tracking-[0.4em] mb-4 block">Most Wanted</span>
                    <h3 className="text-4xl font-serif mb-4">{product.name}</h3>
                    <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-yellow-500 transition-colors">
                      <span>Explore Fragrance</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-yellow-600 text-[10px] uppercase tracking-[0.4em] mb-4 block">New Additions</span>
            <h2 className="text-4xl md:text-5xl font-serif">Latest Arrivals</h2>
          </div>
          <Link to="/collection" className="text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-all mt-6 md:mt-0">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {ALL_PRODUCTS.filter(p => p.category === 'New').slice(0, 4).map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-4 relative">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[8px] uppercase tracking-widest px-2 py-1">New</div>
                </div>
                <h4 className="font-serif text-lg mb-1">{product.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{product.notes}</p>
                <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-yellow-500 text-[10px] uppercase tracking-[0.5em] mb-6 block">Stay Connected</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Join the Inner Circle</h2>
          <p className="text-gray-400 font-light mb-12 leading-relaxed">Subscribe to receive exclusive offers, early access to new launches, and olfactory inspiration delivered to your inbox.</p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); setToast("Subscribed successfully!"); }}>
            <input required type="email" placeholder="Your Email Address" className="flex-1 bg-transparent border border-white/20 px-6 py-4 text-sm focus:outline-none focus:border-yellow-500 transition-colors" />
            <button type="submit" className="bg-white text-black px-10 py-4 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-yellow-600 hover:text-white transition-all">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsQuizOpen(false)} className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[120] bg-white max-w-xl w-full p-12 shadow-2xl rounded-sm">
              <button onClick={() => setIsQuizOpen(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
              <div className="text-center space-y-8">
                <span className="text-yellow-600 text-[10px] uppercase tracking-widest">Question {quizStep + 1} of {quizQuestions.length}</span>
                <h2 className="text-3xl font-serif">{quizQuestions[quizStep].question}</h2>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  {quizQuestions[quizStep].options.map(option => (
                    <button key={option} onClick={() => handleQuizAnswer(option)} className="w-full border border-gray-100 py-4 px-6 text-sm font-light hover:border-yellow-600 hover:bg-yellow-50 transition-all text-left flex justify-between items-center group">
                      {option}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
