"use client";

import { useState } from 'react';
import { MapPin, Phone, Send } from 'lucide-react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "919318474695";
    const text = `*New Inquiry from KZS Malik Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative py-16 pb-24 bg-white overflow-hidden">
        {/* Soft green corner accents */}
        <div className="absolute -top-32 -left-32 w-105 h-105 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute -top-20 -right-32 w-90 h-90 bg-secondary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-75 h-75 bg-primary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-premium rounded-full text-xs font-bold text-gray-600 border border-gray-50">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <Phone size={14} className="text-primary" />
              We reply within 30 minutes
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[3.75rem] font-bold text-gray-900 tracking-tight leading-[1.02]">
              Get in <span className="text-primary">touch</span> with
              <br />
              our scrap experts.
            </h1>

            <p className="text-[13px] md:text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Questions about pricing, bulk pickups, or business contracts? Pick any channel
              below — our team is just a call, WhatsApp, or email away.
            </p>

            <div className="flex items-center gap-2 pt-2 max-w-70 md:max-w-sm mx-auto">
              <a
                href="tel:+918287873624"
                className="bg-primary hover:bg-primary-hover text-white px-3 py-2 md:px-5 md:py-3 rounded-xl font-bold text-[10px] md:text-base transition-all shadow-xl shadow-primary/20 inline-flex items-center justify-center gap-1.5 flex-1 whitespace-nowrap"
              >
                <Phone size={14} />
                Call Now
              </a>
              <a 
                href="https://wa.me/919318474695?text=Hello%20KZS%20Malik,%20I%20want%20to%20schedule%20a%20scrap%20pickup.%0A%0AMy%20details:%0AName:%20%0AAddress:%20%0AScrap%20Items:%20" 
                target="_blank"
                className="bg-white border-2 border-gray-100 hover:border-primary/20 text-gray-700 px-3 py-2 md:px-5 md:py-3 rounded-xl font-bold text-[10px] md:text-base transition-all shadow-sm inline-flex items-center justify-center gap-1.5 flex-1 whitespace-nowrap"
              >
                 <FaWhatsapp size={14} className="text-[#25D366]" />
                 WhatsApp
               </a>
             </div>
           </div>
         </div>
       </section>
 
       {/* Contact Cards Section */}
       <section className="container mx-auto px-4 -mt-16 mb-12">
         <div className="grid md:grid-cols-3 gap-6">
           {[
             { 
               icon: <Phone className="text-white" />, 
               label: 'Call Us', 
               value: (
                 <div className="flex flex-col gap-1">
                   <span>+91 93184 74695</span>
                   <span>+91 82878 73624</span>
                   <span>+91 98712 110540</span>
                 </div>
               ), 
               bg: 'bg-[#16A34A]', 
               link: 'tel:+918287873624' 
             },
             { icon: <FaWhatsapp className="text-white" size={24} />, label: 'WhatsApp', value: '+91 93184 74695', bg: 'bg-[#25D366]', link: 'https://wa.me/919318474695' },
             { icon: <FaEnvelope className="text-white" size={24} />, label: 'Email Support', value: 'info@kzsmalik.com', bg: 'bg-[#EA4335]', link: 'mailto:info@kzsmalik.com' },
           ].map((card, i) => (
            <motion.a 
              key={i}
              href={card.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:scale-105 transition-all"
            >
              <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                {card.icon}
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{card.label}</span>
              <div className="font-bold text-gray-900 text-sm">{card.value}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 bg-white p-6 md:p-12 rounded-[3rem] shadow-premium border border-gray-100">
          {/* Left: Contact Form */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">Send Us a Message</h2>
              <p className="text-gray-500 font-medium">We typically respond in less than 30 minutes.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-sm" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-sm" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Subject</label>
                <input 
                  type="text" 
                  placeholder="Bulk Pickup Query" 
                  required 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-sm" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">How can we help?</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your scrap items..." 
                  required 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-sm resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full py-3.5 md:py-5 flex items-center justify-center gap-3 text-sm md:text-lg group">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right: Map & Locations */}
          <div className="space-y-8">
            <div className="h-100 bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112106.6660167232!2d77.103006456073!3d28.5355161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1713875000000!5m2!1sen!2sin"
                className="w-full h-full border-0 transition-all duration-700" 
                loading="lazy"
                title="Service Areas"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#EA4335] text-white rounded-xl flex items-center justify-center shadow-lg"><MapPin size={20}/></div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-gray-400 leading-none">Service Area</p>
                     <p className="text-[10px] font-bold text-gray-900 mt-1">Noida • Greater Noida • Delhi NCR</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
