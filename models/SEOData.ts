import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'scrap-rates'
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String },
  author: { type: String, default: 'KZS Malik' },
  ogImage: { type: String }, // Optional Open Graph Image
}, { timestamps: true });

const SEOData = mongoose.models.SEOData || mongoose.model('SEOData', seoSchema);
export default SEOData;
