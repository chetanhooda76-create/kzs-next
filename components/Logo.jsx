import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
        <Image src="/logo_icon.png" 
          alt="KZS Malik Logo" 
          width={64}
          height={64}
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">
          KZS <span className="text-primary">Malik</span>
        </span>
        <span className="text-[12px] uppercase tracking-[0.2em] text-gray-500 font-bold">
          Scrap Recycling
        </span>
      </div>
    </Link>
  );
};
