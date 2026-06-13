import React from 'react';
import { Info, TrendingUp, MapPin } from 'lucide-react';

const ScrapRatesPage = () => {
  const householdItems = [
    {
      name: 'AC (2 Ton)',
      unit: '/unit',
      image: '/hero_split_ac.png',
      price: '4,500',
    },
    {
      name: 'AC (1.5 Ton)',
      unit: '/unit',
      image: '/hero_window_ac.png',
      price: '3,800',
    },
    {
      name: 'AC (1 Ton)',
      unit: '/unit',
      image:
        'https://images.unsplash.com/photo-1590756254933-2873d72a83b6?auto=format&fit=crop&q=80&w=600',
      price: '3,000',
    },
    {
      name: 'Laptop & Computer',
      unit: '/unit',
      image: '/computer_scrap.png',
      price: '1,200',
    },
    {
      name: 'Mobile & Tablet',
      unit: '/unit',
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
      price: '1,000',
    },
    {
      name: 'Battery Scrap',
      unit: '/kg',
      image: '/battery_scrap.png',
      price: '1,500',
    },
    {
      name: 'Electronic Scraps',
      unit: '/kg',
      image: '/electronic_scrap.png',
      price: '1,800',
    },
  ];

  const businessItems = [
    {
      name: 'Server & IT Asset',
      unit: '/unit',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
      price: '8,500',
    },
    {
      name: 'Bulk Laptop/PC',
      unit: '/unit',
      image: '/bulk_laptops.png',
      price: '7,500',
    },
    {
      name: 'Industrial Battery',
      unit: '/kg',
      image: '/industrial_battery.png',
      price: '6,500',
    },
    {
      name: 'Corporate E-Waste',
      unit: '/kg',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      price: '5,500',
    },
  ];

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-gray-900 text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-[3.75rem] font-bold mb-6 tracking-tight leading-[1.02]">
              Live Scrap <span className="text-secondary">Rates</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl">
              Transparent, real-time market pricing for all your scrap items. No hidden charges, just fair value.
            </p>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="container mx-auto px-4 mt-4 md:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-6 grid md:grid-cols-3 gap-8 border border-gray-100">
          <div className="flex items-center gap-4 px-4 py-2 border-r border-gray-100 last:border-0">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Market Status</div>
              <div className="font-bold text-gray-900 uppercase">Prices Updated Daily</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 border-r border-gray-100 last:border-0">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Info />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing Policy</div>
              <div className="font-bold text-gray-900 uppercase">No Hidden Deductions</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 last:border-0">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <MapPin />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Area</div>
              <div className="font-bold text-gray-900 uppercase">Noida • Greater Noida • Delhi NCR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 space-y-10 md:space-y-16">

          {/* Household Section */}
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Household Scrap</h2>
              <div className="w-24 h-1.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {householdItems.map((item, idx) => (
                <div key={idx} className="bg-[#F5F3EE] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-premium transition-all group">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4 tracking-tight">{item.name}</h3>
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-white mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-gray-700 font-semibold">
                    <span className="text-lg font-bold text-primary">₹</span>
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    <span className="text-sm text-gray-500 font-normal">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Section */}
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Business & Industrial</h2>
              <div className="w-24 h-1.5 bg-secondary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {businessItems.map((item, idx) => (
                <div key={idx} className="bg-[#F5F3EE] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-premium transition-all group">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4 tracking-tight">{item.name}</h3>
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-white mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-gray-700 font-semibold">
                    <span className="text-lg font-bold text-primary">₹</span>
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    <span className="text-sm text-gray-500 font-normal">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


    </div>
  );
};

export default ScrapRatesPage;
