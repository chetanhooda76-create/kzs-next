import mongoose from 'mongoose';

const ScrapItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['household', 'business']
  }
}, { timestamps: true });

const ScrapItem = mongoose.models.ScrapItem || mongoose.model('ScrapItem', ScrapItemSchema);
export default ScrapItem;
