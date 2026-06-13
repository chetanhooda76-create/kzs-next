import mongoose from 'mongoose';

const HouseholdPickupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String }, // link pickup to user
  service: { type: String },
  images: [{ type: String }],
  coords: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

const HouseholdPickup = mongoose.models.HouseholdPickup || mongoose.model('HouseholdPickup', HouseholdPickupSchema);
export default HouseholdPickup;
