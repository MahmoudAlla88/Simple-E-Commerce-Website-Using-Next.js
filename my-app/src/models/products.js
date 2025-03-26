import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Products = mongoose.models.Products || mongoose.model('Products', userSchema);

export default Products;
