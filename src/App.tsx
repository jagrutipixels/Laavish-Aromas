/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  X, 
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setToast(`Added ${product.name} to cart`);
  }, []);

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setCheckoutStep(1);
    setOrderSuccess(false);
  };

  const placeOrder = () => {
    setCheckoutStep(2);
    setTimeout(() => {
      setOrderSuccess(true);
      setCart([]);
      setToast("Order placed successfully!");
    }, 2000);
  };

  return (
    <Router>
      <ScrollToTop />

      {/* Initial Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src="https://raw.githubusercontent.com/jagrutipixels/Laavish-Aromas/03b8de36f875ff295d0974a6405b1fa64dd0f494/Laavish_Aromas_File_white.png"
              alt="Laavish Aromas Loading"
              className="h-24 md:h-32 w-auto object-contain animate-pulse"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#faf9f6] text-gray-900 font-sans selection:bg-yellow-100 selection:text-yellow-900">
        
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] bg-black text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              <span className="text-xs uppercase tracking-widest font-medium">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar cartCount={cartCount} setIsCartOpen={setIsCartOpen} />

        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} setToast={setToast} />} />
            <Route path="/collection" element={<Collection addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact setToast={setToast} />} />
          </Routes>
        </main>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md z-[80] bg-white shadow-2xl flex flex-col">
                <div className="p-8 flex justify-between items-center border-b border-gray-50"><h2 className="text-xl font-serif uppercase tracking-widest">Your Bag ({cartCount})</h2><button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button></div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-center space-y-4"><ShoppingBag className="w-12 h-12 text-gray-200" /><p className="text-gray-400 font-light">Your bag is currently empty.</p></div> :
                    cart.map(item => (
                      <div key={item.id} className="flex space-x-4">
                        <div className="w-24 h-32 bg-gray-50 overflow-hidden"><img src={item.image} className="w-full h-full object-cover" /></div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div><div className="flex justify-between items-start"><h4 className="font-serif text-lg">{item.name}</h4><button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button></div><p className="text-[10px] uppercase tracking-widest text-gray-400">{item.notes}</p></div>
                          <div className="flex justify-between items-center"><div className="flex items-center border border-gray-100 rounded-full px-3 py-1 space-x-4"><button onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3" /></button><span className="text-xs font-medium">{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3" /></button></div><span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                {cart.length > 0 && (
                  <div className="p-8 border-t border-gray-50 space-y-6">
                    <div className="flex justify-between items-center"><span className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">Subtotal</span><span className="text-xl font-serif">${cartTotal.toFixed(2)}</span></div>
                    <button onClick={handleCheckout} className="w-full bg-black text-white py-5 uppercase tracking-[0.4em] text-[10px] hover:bg-yellow-800 transition-colors">Checkout Now</button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {isCheckoutOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !orderSuccess && setIsCheckoutOpen(false)} className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[120] bg-white max-w-2xl w-full p-8 md:p-12 shadow-2xl rounded-sm">
                <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
                
                {orderSuccess ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-serif">Thank You</h2>
                    <p className="text-gray-500 font-light">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
                    <button onClick={() => setIsCheckoutOpen(false)} className="mt-8 border border-black px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all">Back to Shopping</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-serif border-b border-gray-100 pb-6 uppercase tracking-widest">Checkout</h2>
                    
                    {checkoutStep === 1 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400">First Name</label><input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-yellow-600" /></div>
                          <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400">Last Name</label><input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-yellow-600" /></div>
                        </div>
                        <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400">Email Address</label><input type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-yellow-600" /></div>
                        <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400">Shipping Address</label><input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-yellow-600" /></div>
                        <div className="pt-8 flex justify-between items-center">
                          <div className="text-sm text-gray-400">Total: <span className="text-black font-serif text-xl ml-2">${cartTotal.toFixed(2)}</span></div>
                          <button onClick={placeOrder} className="bg-black text-white px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-yellow-800 transition-colors">Place Order</button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                        <p className="text-gray-400 uppercase tracking-widest text-[10px]">Processing your order...</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[90] bg-black text-white p-3 rounded-full shadow-2xl hover:bg-yellow-600 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
}
