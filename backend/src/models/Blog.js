import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  category: { type: String, required: true },
  tags: [String],
  image: String,
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
