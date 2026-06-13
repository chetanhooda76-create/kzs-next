"use client";

import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-20 pb-0 overflow-hidden bg-linear-to-b from-[#ECFDF5] via-white to-white">
      {/* Soft corner green accents */}
      <div className="absolute -top-32 -left-32 w-130 h-130 bg-primary/15 rounded-full blur-[140px] -z-10" />
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-primary/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-200 h-100 bg-secondary/10 rounded-full blur-[160px] -z-10" />

      {/* Floating Scrap Items (Matching reference screenshot exactly) */}
      <div className="hidden md:block absolute top-[24%] left-[17%] w-24 lg:w-28 z-20 pointer-events-none select-none transform rotate-6">
        <Image src="/hero_battery.png" alt="Battery Scrap" width={120} height={120} className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-[37%] left-[21%] w-14 lg:w-16 z-20 pointer-events-none select-none transform rotate-10">
        <Image src="/recyclables.png" alt="Notebook Scrap" width={80} height={80} className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-[56%] left-[18%] w-24 lg:w-28 z-20 pointer-events-none select-none transform rotate-[-8deg]">
        <Image src="/hero_cooler.png" alt="Cooler Scrap" width={120} height={120} className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-[23%] right-[15%] w-24 lg:w-32 z-20 pointer-events-none select-none">
        <Image src="/hero_laptops.png" alt="Laptops Scrap" width={140} height={100} className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-[36%] right-[22%] w-14 lg:w-16 z-20 pointer-events-none select-none transform rotate-[-10deg]">
        <Image src="/recyclables.png" alt="Notebook Scrap" width={80} height={80} className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-[50%] right-[19%] w-24 lg:w-32 z-20 pointer-events-none select-none transform rotate-6">
        <Image src="/hero_split_ac.png" alt="AC Scrap" width={140} height={100} className="w-full h-auto object-contain" />
      </div>

      {/* Centered content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white shadow-premium rounded-full text-[10px] md:text-xs font-bold font-inter text-gray-600 border border-gray-50 mb-4 animate-in fade-in slide-in-from-bottom-4 whitespace-nowrap">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src="/logo_icon.png" alt="" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            Doorstep Scrap Pickup · Noida • Greater Noida • Delhi NCR
          </div>

          {/* Headline */}
          <h1 className="text-lg md:text-2xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Sell Scrap Smartly,
            <br />
            <span className="text-primary">Earn Instantly</span>
          </h1>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Book a doorstep pickup in 60 seconds. Our trained crew arrives with ISO-certified
            digital scales, weighs every kilo fairly, and pays you instantly — no haggling, no
            hidden deductions.
          </p>

          {/* Process flow */}
          <div className="flex flex-nowrap items-center justify-center gap-1.5 md:gap-5 text-[10px] md:text-lg font-bold font-inter text-gray-700 pt-2 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 md:gap-2">
              <span className="w-5 h-5 md:w-7 md:h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-[10px] md:text-sm">
                1
              </span>
              Schedule
            </span>
            <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-primary shrink-0" />
            <span className="inline-flex items-center gap-1 md:gap-2">
              <span className="w-5 h-5 md:w-7 md:h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-[10px] md:text-sm">
                2
              </span>
              We Collect
            </span>
            <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-primary shrink-0" />
            <span className="inline-flex items-center gap-1 md:gap-2">
              <span className="w-5 h-5 md:w-7 md:h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-[10px] md:text-sm">
                3
              </span>
              Get Paid Instantly
            </span>
          </div>

          {/* Rating pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-[10px] md:text-sm font-bold text-gray-800">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            4.9 / 5 · Trusted by 10,000+ Homes
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
