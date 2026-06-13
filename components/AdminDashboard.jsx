"use client";

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle, XCircle, LogOut, Trash, ExternalLink, Menu, X, Globe, BarChart3, TrendingUp, Edit } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminAnalytics from './AdminAnalytics';
import API_BASE_URL from '../apiConfig';

const AdminDashboard = () => {
  const [pickups, setPickups] = useState({ household: [], business: [] });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('household');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('adminToken'));
    setIsSidebarOpen(window.innerWidth > 1024);
  }, []);

  const [filterRange, setFilterRange] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [seoList, setSeoList] = useState([]);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState(null);
  const [seoFormData, setSeoFormData] = useState({
    page: '',
    title: '',
    description: '',
    keywords: '',
    author: 'KZS Malik'
  });

  const [scrapItems, setScrapItems] = useState([]);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [ratesFormData, setRatesFormData] = useState({
    name: '',
    unit: '/unit',
    price: '',
    category: 'household'
  });
  const [rateImageFile, setRateImageFile] = useState(null);

  const fetchPickups = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/pickups`);
      if (res.data.success) {
        setPickups(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSeo = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/seo`);
      if (res.data.success) {
        setSeoList(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchScrapItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/scrap-items`);
      if (res.data.success) {
        setScrapItems(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify token on mount — agar token expire ho gaya ho toh auto-logout
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data.success) {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } catch {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadData = async () => {
      if (activeTab === 'seo') {
        await fetchSeo();
      } else if (activeTab === 'rates') {
        await fetchScrapItems();
      } else if (activeTab === 'analytics') {
        setLoading(false);
      } else {
        await fetchPickups();
      }
    };

    loadData();
  }, [isAuthenticated, activeTab, fetchSeo, fetchPickups, fetchScrapItems]);

  const saveSeo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/seo`, seoFormData);
      if (res.data.success) {
        alert('SEO Data Saved Successfully');
        setIsSeoModalOpen(false);
        fetchSeo();
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || 'Error saving SEO data';
      alert(`Error saving SEO data: ${errorMsg}`);
    }
  };

  const deleteSeo = async (id) => {
    if (!window.confirm('Delete this SEO configuration?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/seo/${id}`);
      fetchSeo();
    } catch (err) {
      console.error(err);
    }
  };

  const openSeoModal = (seo = null) => {
    if (seo) {
      setEditingSeo(seo);
      setSeoFormData(seo);
    } else {
      setEditingSeo(null);
      setSeoFormData({ page: '', title: '', description: '', keywords: '', author: 'KZS Malik' });
    }
    setIsSeoModalOpen(true);
  };

  const openRatesModal = (rate = null) => {
    if (rate) {
      setEditingRate(rate);
      setRatesFormData({
        name: rate.name,
        unit: rate.unit,
        price: rate.price,
        category: rate.category
      });
    } else {
      setEditingRate(null);
      setRatesFormData({ name: '', unit: '/unit', price: '', category: 'household' });
    }
    setRateImageFile(null);
    setIsRatesModalOpen(true);
  };

  const saveRate = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const fd = new FormData();
    fd.append('name', ratesFormData.name);
    fd.append('unit', ratesFormData.unit);
    fd.append('price', ratesFormData.price);
    fd.append('category', ratesFormData.category);
    if (rateImageFile) {
      fd.append('image', rateImageFile);
    }

    try {
      setLoading(true);
      let res;
      if (editingRate) {
        res = await axios.put(`${API_BASE_URL}/api/admin/scrap-items/${editingRate._id}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        if (!rateImageFile) {
          alert('Please select an image for the new scrap item');
          setLoading(false);
          return;
        }
        res = await axios.post(`${API_BASE_URL}/api/admin/scrap-items`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      }

      if (res.data.success) {
        alert(editingRate ? 'Scrap rate updated' : 'Scrap rate created');
        setIsRatesModalOpen(false);
        fetchScrapItems();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save scrap rate');
    } finally {
      setLoading(false);
    }
  };

  const deleteRate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scrap rate?')) return;
    
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.delete(`${API_BASE_URL}/api/admin/scrap-items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        fetchScrapItems();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete scrap rate');
    } finally {
      setLoading(false);
    }
  };

  const deletePickup = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/pickups/${type}/${id}`);
      fetchPickups();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, type, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/pickups`, { id, type, status });
      fetchPickups();
    } catch (err) {
      console.error(err);
    }
  };

  const filterByDate = (items) => {
    if (filterRange === 'all') return items;
    const now = new Date();
    return items.filter((p) => {
      const d = new Date(p.createdAt);
      if (filterRange === 'day') return d.toDateString() === now.toDateString();
      if (filterRange === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (filterRange === 'year') return d.getFullYear() === now.getFullYear();
      if (filterRange === 'custom') {
        if (!customStart && !customEnd) return true;
        const start = customStart ? new Date(customStart) : null;
        const end = customEnd ? new Date(customEnd) : null;
        if (end) end.setHours(23, 59, 59, 999);
        if (start && d < start) return false;
        if (end && d > end) return false;
        return true;
      }
      return true;
    });
  };

  const resolveImgSrc = (img) => (img.startsWith('http') ? img : `${API_BASE_URL}${img}`);

  if (!isAuthenticated) return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  if (loading) return <div className="p-20 text-center font-bold">Loading Admin Panel...</div>;

  const RenderPickup = ({ p, type }) => (
    <div key={p._id} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-3 md:space-y-4 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <span className="block font-black text-gray-900 text-sm md:text-lg font-outfit uppercase tracking-tight">{p.name}</span>
          <span className="block text-primary font-bold text-xs md:text-sm tracking-widest">{p.phone}</span>
        </div>
        <div className="flex flex-col items-end gap-1.5 md:gap-2">
          <span className={`text-[8px] md:text-[10px] font-black uppercase py-1 px-3 md:py-1.5 md:px-4 rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : p.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {p.status}
          </span>
          <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">{new Date(p.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="space-y-1.5 md:space-y-2">
        <div className="flex gap-2 items-center bg-gray-50/50 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-50">
          <Truck size={14} className="text-primary" />
          <span className="text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-widest">{p.service || 'General Scrap'}</span>
        </div>
        <p className="text-[10px] md:text-xs font-medium text-gray-500 leading-relaxed bg-gray-50/50 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-50 italic">
          {p.address}
        </p>
      </div>

      {p.images && p.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {p.images.map((img, i) => (
            <img
              key={i}
              src={resolveImgSrc(img)}
              onClick={() => setLightboxImage(resolveImgSrc(img))}
              className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-transform cursor-pointer"
              alt="Scrap"
              onError={(e) => {
                const node = e.currentTarget;
                node.onerror = null;
                const placeholder = document.createElement('div');
                placeholder.className = 'w-20 h-20 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center px-1';
                placeholder.textContent = 'Image unavailable';
                node.parentNode.replaceChild(placeholder, node);
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-1 md:pt-2">
        <div className="flex gap-2">
          {p.status !== 'Completed' && (
            <button onClick={() => updateStatus(p._id, type, 'Completed')} className="p-2 md:p-2.5 bg-green-50 text-green-600 rounded-lg md:rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm" title="Mark Completed"><CheckCircle size={16}/></button>
          )}
          {p.status !== 'Cancelled' && (
            <button onClick={() => updateStatus(p._id, type, 'Cancelled')} className="p-2 md:p-2.5 bg-yellow-50 text-yellow-600 rounded-lg md:rounded-xl hover:bg-yellow-600 hover:text-white transition-all shadow-sm" title="Mark Cancelled"><XCircle size={16}/></button>
          )}
        </div>
        <button onClick={() => deletePickup(p._id, type)} className="p-2 md:p-2.5 bg-red-50 text-red-600 rounded-lg md:rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Delete Permanent"><Trash size={16}/></button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 bg-white border-r border-gray-100 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 md:p-8 h-full flex flex-col relative font-lexend">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2.5 mb-8 md:mb-10">
            <img src="/logo_icon.png" alt="KZS Malik" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <div className="leading-none text-left">
              <span className="block text-base md:text-lg font-black text-gray-900 tracking-tighter">KZS Malik</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400 font-bold">Admin Panel</span>
            </div>
          </div>

          <nav className="grow space-y-2">
            {[
              { id: 'household', label: 'Household', icon: <Package size={20} /> },
              { id: 'business', label: 'Business', icon: <Truck size={20} /> },
              { id: 'rates', label: 'Scrap Rates', icon: <TrendingUp size={20} /> },
              { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
              { id: 'seo', label: 'SEO Manager', icon: <Globe size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="my-6 border-t border-gray-100 pt-6">
              <a 
                href="/" 
                target="_blank"
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
              >
                <ExternalLink size={20} /> View Site
              </a>
            </div>
          </nav>

          <div className="pt-6 border-t border-gray-50">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] text-center italic font-outfit">© 2026 KZS Malik</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`grow transition-all ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-3 md:py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-500 lg:hidden">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-[12px] md:text-xl font-black text-gray-900 uppercase tracking-tighter font-outfit whitespace-nowrap">
              {activeTab === 'analytics'
                ? 'Analytics Dashboard'
                : activeTab === 'household'
                ? 'Household Requests'
                : activeTab === 'business'
                ? 'Business Requests'
                : activeTab === 'rates'
                ? 'Scrap Rates Manager'
                : 'SEO Management'}
            </h2>
          </div>
          
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('adminToken');
            }}
            className="flex items-center gap-1 md:gap-2 bg-red-50 text-red-600 font-bold text-[8px] md:text-xs uppercase tracking-widest px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
          >
            <LogOut size={12} className="md:w-4 md:h-4" /> Logout
          </button>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'analytics' ? (
            <AdminAnalytics />
          ) : activeTab === 'seo' ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-[10px] md:text-sm text-gray-500 font-medium font-lexend max-w-xs md:max-w-none">Manage your websites search visibility and metadata.</p>
                <button 
                  onClick={() => openSeoModal()}
                  className="w-fit md:w-auto px-6 py-2.5 md:py-3.5 bg-primary text-white rounded-xl font-black text-[10px] md:text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all whitespace-nowrap uppercase tracking-widest"
                >
                  Create New Entry
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-lexend">Page & Title</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-lexend">Meta Details</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-lexend text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {seoList.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-gray-400 font-bold">No SEO settings configured yet.</td>
                      </tr>
                    ) : seoList.map((s) => (
                      <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-6">
                          <span className="block font-black text-primary text-xs uppercase mb-1">{s.page}</span>
                          <span className="block font-bold text-gray-900 text-sm">{s.title}</span>
                        </td>
                        <td className="px-6 py-6">
                          <p className="text-xs text-gray-500 line-clamp-2 max-w-md italic">{s.description}</p>
                          <div className="mt-2 flex gap-2">
                             {s.keywords?.split(',').map((k, i) => (
                               <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-bold">{k.trim()}</span>
                             ))}
                          </div>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openSeoModal(s)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"><ExternalLink size={16}/></button>
                            <button onClick={() => deleteSeo(s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'rates' ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-[10px] md:text-sm text-gray-500 font-medium font-lexend max-w-xs md:max-w-none">Manage your scrap rates catalog, pricing, and category divisions.</p>
                <button 
                  onClick={() => openRatesModal()}
                  className="w-fit md:w-auto px-6 py-2.5 md:py-3.5 bg-primary text-white rounded-xl font-black text-[10px] md:text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all whitespace-nowrap uppercase tracking-widest font-outfit"
                >
                  Create Scrap Rate
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left font-outfit">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit">Image</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit">Item Details</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit">Price / Unit</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {scrapItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-bold font-outfit uppercase tracking-widest text-xs">No scrap rates configured yet.</td>
                      </tr>
                    ) : scrapItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={resolveImgSrc(item.image)}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                            alt={item.name}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] font-black uppercase py-1 px-3.5 rounded-full ${item.category === 'household' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-dark'}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">
                          ₹{item.price} <span className="text-xs text-gray-400 font-normal">{item.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openRatesModal(item)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit"><Edit size={16}/></button>
                            <button onClick={() => deleteRate(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'day', label: 'Today' },
                  { id: 'month', label: 'This Month' },
                  { id: 'year', label: 'This Year' },
                  { id: 'custom', label: 'Custom' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setFilterRange(r.id)}
                    className={`px-3 py-2 md:px-4 md:py-2.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest rounded-xl border transition-all ${filterRange === r.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/40'}`}
                  >
                    {r.label}
                  </button>
                ))}
                {filterRange === 'custom' && (
                  <div className="flex items-center gap-2 ml-1">
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="px-3 py-2 text-[11px] font-bold bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/10"
                    />
                    <span className="text-[10px] text-gray-400 font-black uppercase">to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="px-3 py-2 text-[11px] font-bold bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeTab === 'household' ? (
                  (() => {
                    const list = filterByDate(pickups.household);
                    if (list.length === 0) return <div className="col-span-full py-20 text-center text-gray-400 font-bold">No household requests found.</div>;
                    return list.map((p) => <RenderPickup p={p} type="household" key={p._id} />);
                  })()
                ) : (
                  (() => {
                    const list = filterByDate(pickups.business);
                    if (list.length === 0) return <div className="col-span-full py-20 text-center text-gray-400 font-bold">No business requests found.</div>;
                    return list.map((p) => <RenderPickup p={p} type="business" key={p._id} />);
                  })()
                )}
              </div>
            </>
          )}
        </div>

        {/* SEO Modal */}
        {isSeoModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
              <div className="p-5 md:p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-[12px] md:text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">SEO Configuration</h3>
                  <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Setup page meta tags</p>
                </div>
                <button onClick={() => setIsSeoModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-gray-900 transition-all">
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={saveSeo} className="p-5 md:p-8 space-y-4 md:space-y-5">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1 md:space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Page</label>
                    <select
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs md:text-sm appearance-none cursor-pointer"
                      value={seoFormData.page}
                      onChange={(e) => setSeoFormData({ ...seoFormData, page: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select a page…</option>
                      <option value="home">home ( / )</option>
                      <option value="about">about ( /about )</option>
                      <option value="scrap-rates">scrap-rates ( /scrap-rates )</option>
                      <option value="contact">contact ( /contact )</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Author</label>
                    <input 
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs md:text-sm"
                      value={seoFormData.author}
                      onChange={(e) => setSeoFormData({...seoFormData, author: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Title</label>
                  <input 
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs md:text-sm"
                    placeholder="Enter SEO title"
                    value={seoFormData.title}
                    onChange={(e) => setSeoFormData({...seoFormData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Keywords</label>
                  <input 
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs md:text-sm"
                    placeholder="keyword1, keyword2"
                    value={seoFormData.keywords}
                    onChange={(e) => setSeoFormData({...seoFormData, keywords: e.target.value})}
                  />
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                  <textarea 
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs md:text-sm min-h-20"
                    placeholder="Describe this page..."
                    value={seoFormData.description}
                    onChange={(e) => setSeoFormData({...seoFormData, description: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="w-full py-3 md:py-4 bg-primary text-white rounded-xl font-black text-xs md:text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                  {editingSeo ? 'Update Settings' : 'Save SEO Configuration'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Scrap Rates Modal */}
        {isRatesModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
              <div className="p-5 md:p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">{editingRate ? 'Edit Scrap Rate' : 'Create Scrap Rate'}</h3>
                  <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Configure item pricing & assets</p>
                </div>
                <button onClick={() => setIsRatesModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-gray-900 transition-all font-outfit font-black">
                  ✕
                </button>
              </div>
              
              <form onSubmit={saveRate} className="p-5 md:p-8 space-y-4 md:space-y-5 text-left font-outfit">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <select
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs appearance-none cursor-pointer"
                      value={ratesFormData.category}
                      onChange={(e) => setRatesFormData({ ...ratesFormData, category: e.target.value })}
                      required
                    >
                      <option value="household">Household</option>
                      <option value="business">Business & Industrial</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs"
                      placeholder="e.g. 4,500"
                      value={ratesFormData.price}
                      onChange={(e) => setRatesFormData({...ratesFormData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Item Name</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs"
                      placeholder="e.g. AC (2 Ton)"
                      value={ratesFormData.name}
                      onChange={(e) => setRatesFormData({...ratesFormData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                    <select
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/10 outline-none font-bold text-xs appearance-none cursor-pointer"
                      value={ratesFormData.unit}
                      onChange={(e) => setRatesFormData({ ...ratesFormData, unit: e.target.value })}
                      required
                    >
                      <option value="/unit">/unit</option>
                      <option value="/kg">/kg</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Scrap Image</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setRateImageFile(e.target.files[0])}
                    className="w-full text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 p-2.5 rounded-xl cursor-pointer"
                    required={!editingRate}
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                  {editingRate ? 'Update Scrap Item' : 'Create Scrap Item'}
                </button>
              </form>
            </div>
          </div>
        )}

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
      </main>
    </div>
  );
};

export default AdminDashboard;
