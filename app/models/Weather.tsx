import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  zip: String,
  countryCode: String,
  data: Object,
  fetchedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Weather || mongoose.model('Weather', weatherSchema);