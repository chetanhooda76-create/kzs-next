import React from 'react';
import Link from 'next/link';
//import recycleImage from '../assets/recycle.jpeg';
//import recycleImage2 from '../assets/recycle1.jpg.jpeg';

const RecycleSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tighter uppercase">
            Recycle We Collect
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 bg-white flex items-center justify-center">
            <img
              src="/recycle.jpeg"
              alt="E-Waste We Collect"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 bg-white flex items-center justify-center">
            <img
              src="/recycle1.jpg"
              alt="Household Appliances & Special E-Waste we collect"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/scrap-rates" 
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 inline-block"
          >
            See Scrap Rates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecycleSection;
