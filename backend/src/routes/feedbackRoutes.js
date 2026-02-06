import express from 'express';
import { sendFeedbackEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    // Validate required fields
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Validate feedback type
    const validTypes = ['suggestion', 'bug', 'feature', 'other'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid feedback type' 
      });
    }

    // Send email
    const result = await sendFeedbackEmail({
      name: name?.trim() || '',
      email: email?.trim() || '',
      type: type || 'other',
      message: message.trim(),
    });

    res.json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit feedback. Please try again later.' 
    });
  }
});

export default router;
