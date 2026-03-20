import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS, Product } from '../types';

interface CollectionProps {
  addToCart: (product: Product) => void;
}

export default function Collection({ addToCart }: CollectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const collectionProducts = useMemo(() => {
    if (activeCategory === "All") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-32">
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl mb-4 font-serif">The Collection</h1>
          <div className="h-[1px] bg-yellow-600 mx-auto w-20 mb-12" />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {["All", "Signature", "Trending", "New", "Limited"].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] pb-2 transition-all duration-300 border-b ${activeCategory === cat ? 'border-yellow-600 text-yellow-700' : 'border-transparent text-gray-400 hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {collectionProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.05 }} 
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden bg-[#f3f2ef] aspect-[3/4] mb-6">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-sm">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} 
                      className="w-full py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-yellow-600 transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <h3 className="text-xl mb-2 font-serif">{product.name}</h3>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-3">{product.notes}</p>
                <p className="text-lg font-light text-yellow-800">${product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
