import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="pt-32 pb-32">
      <Helmet>
        <title>Our Story | Laavish Aromas Luxury Perfumery</title>
        <meta name="description" content="Learn about the heritage and artistry of Laavish Aromas. Discover our journey of crafting memories through scent and our commitment to sustainable luxury." />
        <meta name="keywords" content="about laavish aromas, perfume heritage, sustainable luxury, artisanal fragrance history" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-24">
          <span className="text-yellow-600 text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Heritage</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">Crafting Memories Through Scent</h1>
          <div className="h-[1px] bg-yellow-600 mx-auto w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="relative z-10 aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-50 -z-10" />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">A Journey of Olfactory Art</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              Founded in the heart of the world's perfume capital, Laavish Aromas began with a simple vision: to create fragrances that don't just smell good, but tell a story.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              Our master perfumers source the rarest ingredients from across the globe—from the deep woods of Cambodia to the rose fields of Bulgaria—to ensure every drop is a masterpiece of olfactory art.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              We believe that a fragrance is more than just a scent; it's an extension of one's personality, a silent language that speaks volumes. Our collections are designed for those who appreciate the finer things in life and seek to leave a lasting impression.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-serif text-yellow-800">15+</div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Years of Artistry</h4>
              <p className="text-gray-400 font-light text-sm">A legacy built on passion and precision.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-yellow-800">40+</div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Unique Blends</h4>
              <p className="text-gray-400 font-light text-sm">Crafted for every mood and occasion.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-yellow-800">100%</div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Pure Essence</h4>
              <p className="text-gray-400 font-light text-sm">Only the finest natural ingredients.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Sustainable Luxury</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              At Laavish Aromas, we are committed to ethical sourcing and sustainable practices. We work directly with local farmers to ensure fair trade and support the communities that provide us with our precious ingredients.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              Our packaging is designed to be as beautiful as it is eco-friendly, using recyclable materials without compromising on the luxury experience.
            </p>
          </div>
          <div className="order-1 md:order-2 relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="relative z-10 aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
