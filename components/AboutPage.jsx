"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Shield,
  Zap,
  Recycle,
  Users,
  Sprout,
  Award,
  Leaf,
  TrendingUp,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  // ArrowRight,
  Truck,
  Scale,
  Wallet,
  Star,
} from 'lucide-react';

const STORY_IMG =
  'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1400';
const TEAM_IMG =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '5000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Scrap Recycled', value: '500+ Tons', icon: <Recycle className="w-6 h-6" /> },
    { label: 'Trees Saved', value: '2500+', icon: <Sprout className="w-6 h-6" /> },
    { label: 'Cities Served', value: '12+', icon: <Globe2 className="w-6 h-6" /> },
  ];

  const values = [
    {
      title: 'Digital Accuracy',
      description:
        'ISO-certified digital weighing scales ensure 100% accuracy on every pickup, every time.',
      icon: <Zap className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Trusted & Verified',
      description:
        'Background-verified pickup executives, trained in safety and professional conduct.',
      icon: <Shield className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Best Market Value',
      description:
        'Competitive rates updated daily based on real-time market and global commodity trends.',
      icon: <Target className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Eco-Conscious',
      description:
        'Every kilo recycled diverts waste from landfills and heads to authorised green facilities.',
      icon: <Leaf className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Customer First',
      description:
        'Instant payments, transparent pricing, and a dedicated support team built to serve you.',
      icon: <HeartHandshake className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Growth Mindset',
      description:
        'Constantly expanding our reach, technology, and service quality across India.',
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
    },
  ];

  const journey = [
    {
      year: '2018',
      title: 'The Beginning',
      desc: 'KZS Malik started as a small local scrap venture with a mission to organise the waste ecosystem.',
    },
    {
      year: '2020',
      title: 'Going Digital',
      desc: 'Launched digital weighing and online booking, making recycling transparent for households.',
    },
    {
      year: '2023',
      title: 'Scaling Across NCR',
      desc: 'Expanded to Noida, Greater Noida, and Delhi NCR with 50+ trained pickup executives and partnered recycling plants.',
    },
    {
      year: '2025',
      title: 'Building the Future',
      desc: 'Serving 5000+ happy customers with a vision to become India\'s most trusted recycling brand.',
    },
  ];

  const process = [
    {
      icon: <Scale className="w-7 h-7 text-primary" />,
      title: 'Book & Schedule',
      desc: 'Pick a convenient slot via our website, WhatsApp, or app in under 60 seconds.',
    },
    {
      icon: <Truck className="w-7 h-7 text-primary" />,
      title: 'Doorstep Pickup',
      desc: 'A verified executive arrives on time with calibrated digital weighing equipment.',
    },
    {
      icon: <Wallet className="w-7 h-7 text-primary" />,
      title: 'Instant Payment',
      desc: 'Get paid in cash, UPI, or bank transfer before the crew leaves your premises.',
    },
    {
      icon: <Recycle className="w-7 h-7 text-primary" />,
      title: 'Responsible Recycling',
      desc: 'Scrap is sorted and routed to authorised, pollution-compliant recycling partners.',
    },
  ];

  const badges = [
    'ISO 9001 Certified',
    'Pollution Control Board Approved',
    'GST Registered',
    'Background-Verified Crew',
  ];

  return (
    <div className="pt-16 md:pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 lg:py-20 bg-white overflow-hidden">
        {/* Soft green corner accents */}
        <div className="absolute -top-32 -left-32 w-105 h-105 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute -top-20 -right-32 w-90 h-90 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-75 h-75 bg-secondary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title row */}
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-xl lg:text-4xl font-bold text-gray-900 leading-[1.02] tracking-tight">
                About <span className="text-primary">KZS Malik</span>
              </h1>
              <div className="hidden sm:flex w-14 h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl items-center justify-center shrink-0">
                <Recycle className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
              </div>
            </div>

            {/* Quote / tagline card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary/5 border-l-4 border-primary rounded-2xl p-8 lg:p-10 mb-12 shadow-sm"
            >
              <p className="text-sm lg:text-xl text-primary-hover font-semibold leading-relaxed flex items-start gap-3">
                Your trusted partner for hassle-free doorstep scrap collection and sustainable
                recycling solutions.
                <Leaf className="w-6 h-6 lg:w-7 lg:h-7 text-primary shrink-0 mt-1" />
              </p>
            </motion.div>

            {/* Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl lg:text-4xl font-bold text-primary tracking-tight">
                  Who We Are
                </h2>
                <HeartHandshake className="w-7 h-7 text-secondary" />
              </div>

              <p className="text-[13px] lg:text-lg text-gray-700 leading-relaxed font-medium">
                <strong className="text-gray-900 font-bold">KZS Malik</strong> is a
                technology-driven waste management platform that connects homes and businesses
                with <strong className="text-gray-900 font-bold">verified, background-checked
                  scrap collectors</strong>. Our mission is to make recycling{' '}
                <strong className="text-gray-900 font-bold">easy</strong>,{' '}
                <strong className="text-gray-900 font-bold">transparent</strong>, and{' '}
                <strong className="text-gray-900 font-bold">environmentally impactful</strong>.
              </p>

              <p className="text-[13px] lg:text-lg text-gray-700 leading-relaxed font-medium">
                Whether it&apos;s your old newspapers, electronics, metals, or plastics — KZS Malik
                ensures everything gets responsibly recycled and never ends up in landfills.
              </p>

              <div className="flex items-center gap-2 pt-6 lg:max-w-md">
                <a
                  href="#schedule"
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold text-xs md:text-base transition-all shadow-lg shadow-primary/20 whitespace-nowrap flex-1 text-center"
                >
                  Schedule Pickup
                </a>
                <a
                  href="#mission"
                  className="bg-white border-2 border-gray-100 hover:border-primary/20 text-gray-700 px-5 py-3 rounded-xl font-bold text-xs md:text-base transition-all shadow-sm whitespace-nowrap flex-1 text-center"
                >
                  Our Story
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-10 md:py-16 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter max-w-3xl mx-auto">
              From a local idea to <span className="text-primary">Indias scrap revolution</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp} className="relative">
              <img
                src={STORY_IMG}
                alt="Our journey"
                className="relative rounded-4xl w-full h-70 md:h-130 object-cover drop-shadow-2xl"
              />
              <div className="hidden md:flex absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div>
                  <div className="text-sm font-black text-gray-900">7+ Years</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Of Expertise
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              {journey.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      {item.year}
                    </div>
                    {idx < journey.length - 1 && (
                      <div className="w-px h-full bg-linear-to-b from-primary/40 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Mission &amp; Vision
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter max-w-3xl mx-auto">
              Built with <span className="text-primary">purpose</span>, driven by impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              {...fadeUp}
              className="group relative overflow-hidden rounded-4xl bg-white border-2 border-gray-100 p-10 lg:p-12 hover:shadow-premium hover:border-primary/30 transition-all"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                      What drives us
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight">
                      Our Mission
                    </h3>
                  </div>
                </div>

                <p className="text-sm lg:text-lg text-gray-600 font-medium leading-relaxed">
                  To provide a hassle-free, transparent, and eco-friendly scrap collection
                  service at your doorstep — diverting waste from landfills to authorised
                  recycling plants while rewarding you fairly.
                </p>

                <ul className="space-y-3 pt-2">
                  {['Doorstep service', 'Transparent pricing', 'Eco-certified partners'].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-semibold text-gray-700"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="group relative overflow-hidden rounded-4xl bg-white border-2 border-gray-100 p-10 lg:p-12 hover:shadow-premium hover:border-secondary/30 transition-all"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe2 className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">
                      Where we are headed
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight">
                      Our Vision
                    </h3>
                  </div>
                </div>

                <p className="text-sm lg:text-lg text-gray-600 font-medium leading-relaxed">
                  To become the most trusted name in India circular economy — making recycling
                  as easy as ordering food online, and empowering every home and business to
                  contribute to sustainability effortlessly.
                </p>

                <ul className="space-y-3 pt-2">
                  {['Nationwide reach', 'Tech-first experience', 'Zero-waste future'].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-semibold text-gray-700"
                      >
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                        </div>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Why KZS Malik
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter max-w-3xl mx-auto">
              Values that drive <span className="text-primary">every pickup</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-premium transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative">
                  <div className="mb-6 p-4 bg-primary/5 rounded-2xl inline-block group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp} className="relative order-2 lg:order-1">
              <img
                src={TEAM_IMG}
                alt="Our team at work"
                className="relative rounded-4xl w-full h-70 md:h-135 object-cover drop-shadow-2xl"
              />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900">50+ Crew Members</div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Trained &amp; Verified
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-10 order-1 lg:order-2">
              <motion.div {...fadeUp} className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                  How We Work
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter">
                  A <span className="text-primary">seamless</span> 4-step process
                </h2>
                <p className="text-base text-gray-500 font-medium leading-relaxed">
                  From booking to recycling, every step is designed to be quick, fair, and stress-free for you.
                </p>
              </motion.div>

              <div className="space-y-5">
                {process.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-5 p-5 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:shadow-md transition-all group"
                  >
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Step 0{idx + 1}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 uppercase tracking-tight mb-1">
                        {p.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Certifications &amp; Trust
            </span>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {badges.map((b, idx) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-premium hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                  {b}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
