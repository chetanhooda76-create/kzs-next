"use client";

import React from 'react';
import { CalendarCheck, Truck, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    {
      stepNumber: "STEP 1",
      title: "SCHEDULE PICKUP",
      description: "Fill our simple form or pin your location on the map to request a doorstep collection.",
      icon: CalendarCheck,
    },
    {
      stepNumber: "STEP 2",
      title: "DOORSTEP COLLECTION",
      description: "Our trained crew arrives at your doorstep to weigh and collect scrap with 100% accuracy.",
      icon: Truck,
    },
    {
      stepNumber: "STEP 3",
      title: "INSTANT PAYMENT",
      description: "Get paid instantly via your preferred method before our crew leaves your premises.",
      icon: Wallet,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">
            Best Value for your Scrap in <span className="text-primary">3 simple steps</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
            Our professional team makes the recycling process transparent, quick, and rewarding for you.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto mb-16"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="text-center group"
              >
                {/* Concentric Icon Rings */}
                <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                  {/* Outer circle */}
                  <div className="absolute inset-0 rounded-full border border-[#15803D]/5 group-hover:border-[#15803D]/10 group-hover:scale-110 transition-all duration-500" />
                  {/* Middle circle */}
                  <div className="absolute inset-3 rounded-full border border-[#15803D]/10 group-hover:border-[#15803D]/15 group-hover:scale-105 transition-all duration-500" />
                  {/* Inner circle containing the icon */}
                  <div className="absolute inset-6 rounded-full bg-emerald-50/60 group-hover:bg-emerald-50 flex items-center justify-center text-primary shadow-sm transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Step Metadata */}
                <span className="block text-[10px] font-black text-gray-400 tracking-widest mb-2 font-inter">
                  {step.stepNumber}
                </span>

                {/* Step Title */}
                <h3 className="text-sm md:text-base font-black text-gray-900 tracking-wider mb-3 font-inter">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Serving Locations Footer */}
        <div className="border-t border-gray-100/80 pt-10 text-center max-w-4xl mx-auto">
          <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 uppercase font-inter">
            Currently Serving These Major Locations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {["Noida", "Greater Noida", "Delhi NCR"].map((loc, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {loc}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
