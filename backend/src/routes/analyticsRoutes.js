import express from 'express';
const router = express.Router();

router.post('/track', async (req, res) => {
  res.json({ message: 'Track analytics' });
});

export default router;
