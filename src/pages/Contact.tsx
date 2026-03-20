import { Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ContactProps {
  setToast: (msg: string) => void;
}

export default function Contact({ setToast }: ContactProps) {
  return (
    <div className="pt-32 pb-32">
      <Helmet>
        <title>Contact Us | Laavish Aromas Concierge</title>
        <meta name="description" content="Get in touch with Laavish Aromas. Visit our flagship boutique in Paris or contact our fragrance experts for personalized assistance." />
        <meta name="keywords" content="contact laavish aromas, perfume boutique paris, customer care, fragrance experts" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-yellow-600 text-[10px] uppercase tracking-[0.5em] mb-4 block">Get In Touch</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">Visit Our Boutique or Contact Us</h1>
          <div className="h-[1px] bg-yellow-600 mx-auto w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              Have a question about our fragrances or need help choosing the perfect scent? Our experts are here to assist you.
            </p>
            <div className="space-y-8 pt-4">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Flagship Store</h4>
                  <p className="text-gray-500 text-sm font-light">123 Fragrance Avenue, Paris, France</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Email Us</h4>
                  <p className="text-gray-500 text-sm font-light">concierge@laavisharomas.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Customer Care</h4>
                  <p className="text-gray-500 text-sm font-light">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-16 shadow-2xl rounded-sm">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setToast("Message sent successfully!"); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Name</label>
                  <input required type="text" className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-yellow-600 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Email</label>
                  <input required type="email" className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-yellow-600 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Subject</label>
                <input required type="text" className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-yellow-600 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Message</label>
                <textarea required rows={4} className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-yellow-600 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-black text-white py-5 uppercase tracking-[0.4em] text-[10px] hover:bg-yellow-800 transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
