import Logo from './Logo';
import { MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white p-2 rounded-xl inline-block"><Logo /></div>
            <p className="text-sm text-gray-400">Making recycling easy, rewarding, and accessible for everyone.</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-tight">Support Addresses</h4>
            <div className="space-y-4 text-xs font-medium">
              <p className="flex gap-2"><MapPin size={16} className="text-[#EA4335] shrink-0" /> Noida</p>
              <p className="flex gap-2"><MapPin size={16} className="text-[#EA4335] shrink-0" /> Greater Noida</p>
              <p className="flex gap-2"><MapPin size={16} className="text-[#EA4335] shrink-0" /> Delhi NCR</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-tight">Contact Us</h4>
            <div className="space-y-4 text-xs font-medium">
              <a href="tel:+9198712110540" className="flex gap-3 hover:text-white transition-all items-center"><Phone size={16} className="text-[#007AFF]" /> +91 98712 110540</a>
              <a href="tel:+918287873624" className="flex gap-3 hover:text-white transition-all items-center"><Phone size={16} className="text-[#007AFF]" /> +91 82878 73624</a>
              <a href="tel:+919318474695" className="flex gap-3 hover:text-white transition-all items-center"><Phone size={16} className="text-[#007AFF]" /> +91 93184 74695</a>
              <a href="https://wa.me/919318474695" target="_blank" className="flex gap-3 items-center hover:text-white transition-all"><FaWhatsapp size={16} className="text-[#25D366]" /> WhatsApp Available 24/7</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-tight">Follow Us</h4>
            <p className="text-xs mb-6">Stay updated with latest scrap rates and recycling tips.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/kzsmalik/" target="_blank" className="w-10 h-10 bg-[#E4405F] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#E4405F]/20" title="Instagram"><FaInstagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61563159184319" target="_blank" className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#1877F2]/20" title="Facebook"><FaFacebookF size={18} /></a>
              <a href="https://wa.me/919318474695" target="_blank" className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#25D366]/20" title="WhatsApp"><FaWhatsapp size={18} /></a>
              <a href="mailto:kzsmalik400@gmail.com" className="w-10 h-10 bg-[#EA4335] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-[#EA4335]/20" title="Email"><FaEnvelope size={18} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 KZS Malik. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-row items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
