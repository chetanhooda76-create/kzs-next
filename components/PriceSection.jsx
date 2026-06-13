import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const PriceSection = () => {
  return (
    <section id="prices" className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 space-y-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tighter leading-tight">
            Households & Businesses have different needs <br className="hidden md:block" /> 
            <span className="text-primary">and we cater to each of them</span>
          </h2>
        </div>

        <div className="space-y-12 md:space-y-20">
          {/* Household Segment */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-12">
            <div className="flex-1 order-2 md:order-1 flex justify-end">
              <div className="space-y-8 max-w-md">
                <div className="space-y-4">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-tight">For Households</h3>
                  <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>
              <ul className="space-y-6">
                {[
                  'On-Demand Doorstep Pickups',
                  'Accurate Digital Weighing',
                  'Safety (Trained & Verified Staff)',
                  'Instant Cash/Online Payment'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm md:text-lg font-bold text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-6 scale-95 group-hover:rotate-3 transition-transform duration-500"></div>
              <Image 
                src="/house_3d_clean.png" 
                width={500}
                height={500}
                alt="Household Scrap" 
                className="relative z-10 w-[70%] md:w-full max-w-md mx-auto drop-shadow-2xl animate-in zoom-in-50 duration-700" 
              />
            </div>
          </div>

          {/* Business Segment */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-12">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-secondary/10 rounded-[40px] -rotate-6 scale-95 group-hover:-rotate-3 transition-transform duration-500"></div>
              <Image
                src="/business_3d_clean.png" 
                width={500}
                height={500}
                alt="Business Scrap" 
                className="relative z-10 w-[70%] md:w-full max-w-md mx-auto drop-shadow-2xl animate-in zoom-in-50 duration-700" 
              />
            </div>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-tight">For Businesses</h3>
                <div className="w-20 h-1.5 bg-secondary rounded-full"></div>
              </div>
              <ul className="space-y-6">
                {[
                  'Formal Payments & Documentation',
                  'Sustainability Reports',
                  'Competitive Bulk Pricing',
                  'Corporate E-waste Disposal'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm md:text-lg font-bold text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PriceSection;
