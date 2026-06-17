"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Recycle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import dynamic from 'next/dynamic';

const MapModal = dynamic(
  () => import('./MapModal'),
  { ssr: false }
);

const PickupSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    label: 'Home',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    type: 'household',
    service: '',
    otherService: '',
    coords: null
  });
  const [isMapOpen, setIsMapOpen] = useState(false);

  const householdServices = ['Split AC', 'Window AC', 'Refrigerator', 'Washing Machine', 'Old Newspaper', 'Metal Scrap', 'Plastic/E-waste'];
  const businessServices = ['Office Furniture', 'IT Equipment/Server', 'Industrial Machinery', 'Bulk Paper/Files', 'Electrical scrap', 'Demolition Scrap'];

  const handleMapConfirm = async (lat, lng) => {
    setFormData(prev => ({ ...prev, coords: { lat, lng } }));
    setIsMapOpen(false);
    
    // Reverse Geocoding to get address from Lat/Lng
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data.address) {
        setFormData(prev => ({
          ...prev,
          streetAddress: `${data.address.road || ''} ${data.address.suburb || ''}`.trim(),
          city: data.address.city || data.address.town || data.address.village || '',
          state: data.address.state || '',
          pincode: data.address.postcode || ''
        }));
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.coords) {
      alert('please search or tap your location on the map');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('service', formData.service === 'Other' ? formData.otherService : formData.service);
      formDataToSend.append('address', `${formData.streetAddress}, ${formData.city}, ${formData.state} - ${formData.pincode} (${formData.label})`);
      
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          if (parsed.email) {
            formDataToSend.append('email', parsed.email);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      if (formData.coords) {
        formDataToSend.append('coords', JSON.stringify(formData.coords));
      }

      files.forEach((file) => {
        formDataToSend.append('images', file);
      });

      const res = await axios.post(`${API_BASE_URL}/api/pickup`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        alert('Pickup scheduled successfully! We will contact you soon.');
        setFormData({
          name: '',
          phone: '',
          label: 'Home',
          streetAddress: '',
          city: '',
          state: '',
          pincode: '',
          type: 'household',
          service: '',
          otherService: '',
          coords: null
        });
        setFiles([]);
        setPreviews([]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || error.message || 'Please try again.';
      alert(`Error scheduling pickup: ${errorMsg}`);
    }
  };

  return (
    <section id="schedule" className="pt-4 md:pt-6 pb-8 md:pb-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 tracking-tight">Complete Your Request</h2>
            <p className="text-[11px] md:text-sm text-gray-500 font-medium">Please provide your details for a hassle-free scrap collection.</p>
          </div>

          <div className="bg-white p-2.5 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-premium border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-6">
              {/* Type Toggle */}
              <div className="flex justify-center">
                <div className="bg-gray-100 p-1 md:p-1.5 rounded-xl md:rounded-2xl flex gap-1">
                  {['household', 'business'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({...formData, type: t, service: ''})}
                      className={`px-5 py-1.5 md:px-8 md:py-2.5 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${formData.type === t ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-2.5 md:gap-6">
                <div className="space-y-1 md:space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1 md:space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    placeholder="Enter 10 digit number"
                    className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Select Service <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold font-lexend text-gray-800 appearance-none cursor-pointer text-[11px] md:text-xs"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    required
                  >
                    <option value="" disabled>Choose a service...</option>
                    {(formData.type === 'household' ? householdServices : businessServices).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="Other">Other (Special request)</option>
                  </select>
                </div>

                {formData.service === 'Other' && (
                  <div className="md:col-span-2 space-y-1.5 animate-in slide-in-from-top-4">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Specify Service</label>
                    <input 
                      type="text" 
                      placeholder="E.g. Old Books, Heavy Metals..."
                      className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                      value={formData.otherService}
                      onChange={(e) => setFormData({...formData, otherService: e.target.value})}
                    />
                  </div>
                )}
              </div>

              {/* Address Detailed Section */}
              <div className="pt-3 md:pt-4 border-t border-gray-100 space-y-2.5 md:space-y-6">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2 font-lexend">
                   <MapPin size={14} className="text-primary" /> Pickup Location Details
                </h3>

                <div className="grid md:grid-cols-2 gap-2.5 md:gap-6">
                  <div className="space-y-1 md:space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Label</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                      value={formData.label}
                      onChange={(e) => setFormData({...formData, label: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1 md:space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Street Address <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="House No, Area..."
                      className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-3 gap-2 md:gap-3">
                    <div className="space-y-1 md:space-y-1.5">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">City <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-1 md:space-y-1.5">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">State <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-1 md:space-y-1.5">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-lexend">Pincode <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 md:px-5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-bold font-lexend text-gray-800 text-[11px] md:text-xs"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Map Trigger Section */}
                <div
                  onClick={() => setIsMapOpen(true)}
                  className="bg-gray-50 p-2.5 md:p-4 rounded-xl md:rounded-3xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/[0.02] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center transition-all ${formData.coords ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-white text-gray-400 group-hover:text-primary group-hover:scale-105'}`}>
                      {formData.coords ? <CheckCircle2 size={16} /> : <MapPin size={16} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[9px] md:text-[10px] font-lexend">
                        {formData.coords ? 'LOCATION PINNED' : 'PINPOINT ON MAP'} <span className="text-red-500">*</span>
                      </h4>
                      <p className="text-[9px] md:text-[10px] font-bold text-gray-400 mt-0.5 md:mt-1 uppercase font-lexend">
                        {formData.coords ? `${formData.city || 'Area Captured'}` : 'Find your doorstep exactly'}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={14} />
                  </div>
                </div>
                {/* Image Upload Section */}
                <div className="pt-3 md:pt-4 border-t border-gray-100 space-y-2.5 md:space-y-4">
                  <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2 font-lexend">
                    <Recycle size={14} className="text-primary" /> Item Photos (Optional)
                  </h3>

                  {previews.length === 0 ? (
                    <label className="w-full h-20 md:h-24 rounded-xl md:rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group bg-gray-50/50">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-all shadow-md">
                        <Recycle size={16} />
                      </div>
                      <span className="block text-[9px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest font-lexend mt-1.5 md:mt-2">Click to Upload Photos</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div className="grid grid-cols-4 gap-3">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-md group animate-in zoom-in-50">
                          <Image src={preview} alt="Preview" fill className="object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group text-gray-400 hover:text-primary font-black">
                        +
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 md:pt-6">
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 md:py-4 text-sm md:text-xl font-bold md:font-black font-lexend shadow-primary/20"
                >
                  Schedule Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <MapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onConfirm={handleMapConfirm} 
      />
    </section>
  );
};

export default PickupSection;
