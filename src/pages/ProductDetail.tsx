import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ALL_PRODUCTS, Product } from '../types';
import React, { useState, useMemo, useEffect } from 'react';

interface ProductDetailProps {
  addToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ addToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<{ name: string; date: string; rating: number; comment: string }[]>([]);

  useEffect(() => {
    setQuantity(1);
    const saved = localStorage.getItem(`reviews-${id}`);
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews([
        { name: "Eleanor R.", date: "Oct 12, 2023", rating: 5, comment: "Absolutely divine. The scent lingers beautifully throughout the day. I've received so many compliments!" },
        { name: "Julian M.", date: "Sep 28, 2023", rating: 4, comment: "A very sophisticated fragrance. It's bold but not overpowering. Perfect for evening events." },
        { name: "Sophia L.", date: "Aug 15, 2023", rating: 5, comment: "My new signature scent. The packaging is as luxurious as the fragrance itself. Highly recommend." }
      ]);
    }
  }, [id]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  
  const product = useMemo(() => 
    ALL_PRODUCTS.find(p => p.id === Number(id)), 
  [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = {
      ...newReview,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: '', rating: 5, comment: '' });
    setIsReviewFormOpen(false);
  };

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-serif">Fragrance Not Found</h2>
        <Link to="/collection" className="text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1">Back to Collection</Link>
      </div>
    );
  }

  const relatedProducts = ALL_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-6">
      <Helmet>
        <title>{product.name} | Laavish Aromas Luxury Fragrance</title>
        <meta name="description" content={`${product.name}: ${product.description.substring(0, 150)}... Discover this ${product.category} scent with notes of ${product.notes}.`} />
        <meta name="keywords" content={`${product.name}, ${product.notes}, luxury perfume, ${product.category} fragrance`} />
        <meta property="og:title" content={`${product.name} | Laavish Aromas`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>
      <Link to="/collection" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors mb-12">
        <ArrowLeft className="w-3 h-3" />
        <span>Back to Collection</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-16 lg:gap-24 mb-32">
        <div className="md:w-1/2 aspect-[3/4] bg-gray-50 overflow-hidden">
          <motion.img 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            src={product.image} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{product.reviews} Reviews</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">{product.name}</h1>
            <p className="text-yellow-700 uppercase text-[10px] tracking-[0.4em] mb-8">{product.notes}</p>
            <p className="text-gray-500 font-light leading-relaxed text-lg mb-10">{product.description}</p>
            <div className="text-4xl font-serif mb-12">${product.price.toFixed(2)}</div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 mb-12">
              <div className="flex items-center justify-between sm:justify-start border border-gray-200 rounded-full px-6 py-3 space-x-8">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1"><Minus className="w-4 h-4" /></button>
                <span className="text-sm font-medium w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1"><Plus className="w-4 h-4" /></button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)} 
                className="flex-1 bg-black text-white py-4 uppercase tracking-[0.4em] text-[10px] hover:bg-yellow-800 transition-colors flex items-center justify-center space-x-4"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl font-serif mb-2">Customer Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating} out of 5</span>
            </div>
          </div>
          <button 
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="mt-6 md:mt-0 border border-black px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-all"
          >
            {isReviewFormOpen ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        <AnimatePresence>
          {isReviewFormOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              className="overflow-hidden mb-16"
            >
              <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full border-b border-gray-200 bg-transparent py-2 focus:outline-none focus:border-yellow-600 transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Rating</label>
                    <div className="flex space-x-2 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star className={`w-5 h-5 ${star <= newReview.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Your Experience</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border-b border-gray-200 bg-transparent py-2 focus:outline-none focus:border-yellow-600 transition-colors resize-none" 
                  />
                </div>
                <button type="submit" className="bg-black text-white px-12 py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-yellow-800 transition-all">Submit Review</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-12">
          {reviews.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-50 pb-12 last:border-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-sm mb-1">{review.name}</h4>
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{review.date}</span>
              </div>
              <p className="text-gray-500 font-light leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">You May Also Like</h2>
            <div className="h-[1px] bg-yellow-600 mx-auto w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-6">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="font-serif text-xl mb-1">{p.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">{p.notes}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
