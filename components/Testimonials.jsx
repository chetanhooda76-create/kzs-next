import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { 
      name: "Rahul Sharma", 
      image: "/testimonials/rahul.png",
      role: "Homeowner",
      content: "Best scrap buyers in Delhi NCR. Fair weight and instant payment. The executive was very professional and on time.", 
      rating: 5 
    },
    { 
      name: "Megha Gupta", 
      image: "/testimonials/megha.png",
      role: "Office Manager",
      content: "Very professional for office E-waste disposal. They provided all necessary documentation and handled the bulk items efficiently.", 
      rating: 5 
    },
    { 
      name: "Amit Patel", 
      image: "/testimonials/amit.png",
      role: "Business Owner",
      content: "Scheduled a bulk pickup, process was very smooth. The digital weighing gave me complete peace of mind.", 
      rating: 5 
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tighter">
            Happy <span className="text-primary">Customers</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-premium relative group hover:-translate-y-2 transition-all duration-300"
            >
              <Quote className="absolute top-8 right-8 text-primary/5 group-hover:text-primary/10 transition-colors" size={60} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-4 ring-primary/5">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg leading-none mb-1">{t.name}</h4>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed font-medium relative z-10 text-sm">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
