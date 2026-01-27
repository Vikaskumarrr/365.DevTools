import express from 'express';
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  res.json({ message: 'Get all blogs' });
});

// Get single blog
router.get('/:slug', async (req, res) => {
  res.json({ message: 'Get single blog' });
});

export default router;
