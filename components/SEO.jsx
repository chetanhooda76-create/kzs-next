"use client";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const SEO = () => {
  const location = useLocation();
  
  const updateMetaTag = (name, content, attr = 'name') => {
    if (!content) return;
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };
  
  useEffect(() => {
    const fetchSEO = async () => {
      // Get the page identifier from the pathname
      const path = location.pathname === '/' ? 'home' : location.pathname.substring(1).split('/')[0];
      
      try {
        const res = await axios.get(`${API_BASE_URL}/api/seo/${path}`);
        if (res.data.success && res.data.data) {
          const { title, description, keywords, author } = res.data.data;
          
          // Set browser title
          document.title = title || "KZS Malik | Scrap Recycling";
          
          // Update meta tags
          updateMetaTag('description', description);
          updateMetaTag('keywords', keywords);
          updateMetaTag('author', author || 'KZS Malik');
          
          // Logic for OG tags if needed
          updateMetaTag('og:title', title, 'property');
          updateMetaTag('og:description', description, 'property');
        }
      } catch (err) {
        console.error('SEO Fetch Error:', err);
      }
    };

    fetchSEO();
  }, [location.pathname]);

  return null;
};

export default SEO;
