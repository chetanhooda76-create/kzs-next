"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success && response.data.token) {
        if (response.data.isAdmin) {
          localStorage.setItem('adminToken', response.data.token);
          window.location.href = '/admin';
        } else {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          window.location.href = '/user-dashboard';
        }
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-gray-100/50">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest mb-6 font-outfit">
          <ArrowLeft size={14} /> Back to home
        </Link>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2 font-outfit uppercase tracking-tighter">
            Welcome Back
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-outfit">Sign in to check your scheduled pickups</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold font-outfit">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-outfit">Email Address</label>
            <input
              type="email"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-xs text-gray-800 font-outfit"
              placeholder="name@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 font-outfit">Password</label>
            <input
              type="password"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-xs text-gray-800 font-outfit"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 mt-2 shadow-xl shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-500 font-bold font-outfit">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-black">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
