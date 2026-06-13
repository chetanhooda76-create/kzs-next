"use client";

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-20 flex items-center">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <Link href="/" className="text-gray-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-tight">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-tight">About Us</Link>
          <Link href="/scrap-rates" className="text-gray-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-tight">Scrap Rates</Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-tight">Contact us</Link>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link href="/#schedule"
            className="bg-secondary hover:bg-secondary-hover text-black px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-secondary/10 hover:scale-105 active:scale-95">
            Schedule Pickup
          </Link>
          <a
            href="https://wa.me/919318474695?text=Hello%20KZS%20Malik,%20I%20want%20to%20schedule%20a%20scrap%20pickup.%0A%0AMy%20details:%0AName:%20%0AAddress:%20%0AScrap%20Items:%20"
            target="_blank"
            className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-[#25D366]/20"
            title="WhatsApp Support"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-60 p-5 space-y-5 animate-in slide-in-from-right">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-tight">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-primary transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-primary transition-colors">About Us</Link>
            <Link href="/scrap-rates" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-primary transition-colors">Scrap Rates</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-primary transition-colors">Contact us</Link>
          </div>
          <hr />
          <div className="space-y-4">
            <Link href="/#schedule" className="btn-secondary w-full py-3 text-xs font-bold" onClick={() => setIsMenuOpen(false)}>Schedule a Pickup</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
