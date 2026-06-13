"use client";

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle2, XCircle, LogOut, Clock, Calendar, MapPin, Phone, Home, Eye, X } from 'lucide-react';
import Link from 'next/link';
import API_BASE_URL from '../apiConfig';

const UserDashboard = () => {
  const [pickups, setPickups] = useState({ household: [], business: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchUserPickups = useCallback(async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/pickups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setPickups(res.data.data);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserPickups();
  }, [fetchUserPickups]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const resolveImgSrc = (img) => (img.startsWith('http') ? img : `${API_BASE_URL}${img}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-outfit">
        <Package className="w-12 h-12 text-primary animate-bounce mb-4" />
        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Account...</span>
      </div>
    );
  }

  const allPickups = [
    ...pickups.household.map(p => ({ ...p, type: 'household' })),
    ...pickups.business.map(p => ({ ...p, type: 'business' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const stats = {
    total: allPickups.length,
    completed: allPickups.filter(p => p.status === 'Completed').length,
    pending: allPickups.filter(p => p.status === 'Pending').length
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-outfit">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo_icon.png" alt="KZS Malik" className="w-8 h-8 object-contain" />
          <div className="leading-none text-left">
            <span className="block text-base font-black text-gray-900 tracking-tighter uppercase font-outfit">My Account</span>
            <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold font-outfit">KZS Malik Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-gray-200 transition-all font-outfit">
            <Home size={14} /> Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all font-outfit"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* User Card */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <span className="block text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1 font-outfit">Hello, {user?.name || 'User'}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-outfit flex items-center gap-1.5 mt-2">
              <Package size={14} className="text-primary" /> {user?.email}
            </span>
          </div>

          <Link href="/#schedule" className="btn-primary px-8 py-3.5 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">
            Schedule A New Pickup
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left">
            <span className="block text-2xl font-black text-gray-900 font-outfit leading-none mb-1">{stats.total}</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-outfit">Total Requests</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left">
            <span className="block text-2xl font-black text-green-600 font-outfit leading-none mb-1">{stats.completed}</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-outfit">Completed</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left">
            <span className="block text-2xl font-black text-blue-600 font-outfit leading-none mb-1">{stats.pending}</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-outfit">Pending</span>
          </div>
        </div>

        {/* Pickups List */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter text-left font-outfit">Pickup History</h3>

          {allPickups.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-[2rem] border border-gray-100 shadow-sm text-gray-400 font-bold uppercase tracking-widest text-xs font-outfit">
              You haven't scheduled any pickups yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {allPickups.map((p) => (
                <div key={p._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block font-black text-gray-900 text-base uppercase tracking-tight font-outfit">{p.name}</span>
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest font-outfit flex items-center gap-1 mt-1">
                        {p.type === 'household' ? <Package size={10} /> : <Truck size={10} />}
                        {p.type} pickup
                      </span>
                    </div>
                    <span className={`text-[9px] font-black uppercase py-1 px-3.5 rounded-full ${p.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' : p.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-bold text-gray-600 font-outfit">
                    <div className="flex gap-2 items-center bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                      <Truck size={14} className="text-primary shrink-0" />
                      <span className="uppercase tracking-wider text-[10px]">{p.service || 'General Scrap'}</span>
                    </div>

                    <div className="flex gap-2 items-center bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                      <Calendar size={14} className="text-primary shrink-0" />
                      <span>{p.date ? new Date(p.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Flexible'}</span>
                    </div>

                    <div className="flex gap-2 items-start bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">{p.address}</span>
                    </div>
                  </div>

                  {p.images && p.images.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-outfit">Uploaded Images:</span>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {p.images.map((img, i) => (
                          <div key={i} className="relative group overflow-hidden rounded-xl border border-gray-100 shadow-sm cursor-pointer" onClick={() => setLightboxImage(resolveImgSrc(img))}>
                            <img
                              src={resolveImgSrc(img)}
                              className="w-16 h-16 object-cover group-hover:scale-105 transition-transform"
                              alt="Scrap item"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye size={14} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-200 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img 
            src={lightboxImage}
            alt="Full view"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
