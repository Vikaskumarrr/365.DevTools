import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  res.json({ message: 'Submit feedback' });
});

export default router;
