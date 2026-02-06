import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Get feedback type emoji and color
const getFeedbackTypeStyle = (type) => {
  const styles = {
    suggestion: { emoji: '💡', color: '#3B82F6', label: 'Suggestion' },
    bug: { emoji: '🐛', color: '#EF4444', label: 'Bug Report' },
    feature: { emoji: '✨', color: '#8B5CF6', label: 'Feature Request' },
    other: { emoji: '💬', color: '#6B7280', label: 'Other' },
  };
  return styles[type] || styles.other;
};

// Generate HTML email template
const generateFeedbackEmailTemplate = (feedback) => {
  const { name, email, type, message } = feedback;
  const typeStyle = getFeedbackTypeStyle(type);
  const submittedAt = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Feedback - AntiGravity Tools</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #222222;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #EF6E76 0%, #d4545c 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                🚀 New Feedback Received
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                AntiGravity Developer Tools
              </p>
            </td>
          </tr>
          
          <!-- Feedback Type Badge -->
          <tr>
            <td style="padding: 30px 40px 0 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 8px 16px; background-color: ${typeStyle.color}20; color: ${typeStyle.color}; border-radius: 20px; font-size: 14px; font-weight: 600;">
                      ${typeStyle.emoji} ${typeStyle.label}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- User Info -->
          <tr>
            <td style="padding: 25px 40px;">
              <table role="presentation" style="width: 100%; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a2a;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding-bottom: 15px; border-bottom: 1px solid #2a2a2a;">
                          <p style="margin: 0 0 5px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                          <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                            ${name || 'Anonymous User'}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 15px;">
                          <p style="margin: 0 0 5px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                          <p style="margin: 0; color: #EF6E76; font-size: 16px;">
                            ${email || 'Not provided'}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 15px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <div style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a2a; padding: 20px;">
                <p style="margin: 0; color: #e0e0e0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${message}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 25px 40px; border-top: 1px solid #222222;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #666666; font-size: 13px;">
                      📅 Submitted on ${submittedAt}
                    </p>
                    <p style="margin: 0; color: #444444; font-size: 12px;">
                      This email was sent from AntiGravity Developer Tools feedback form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send feedback email
export const sendFeedbackEmail = async (feedback) => {
  const transporter = createTransporter();
  const typeStyle = getFeedbackTypeStyle(feedback.type);

  const mailOptions = {
    from: `"AntiGravity Tools" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: feedback.email || process.env.EMAIL_USER,
    subject: `${typeStyle.emoji} New ${typeStyle.label}: ${feedback.message.substring(0, 50)}${feedback.message.length > 50 ? '...' : ''}`,
    html: generateFeedbackEmailTemplate(feedback),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Feedback email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending feedback email:', error);
    throw error;
  }
};

export default { sendFeedbackEmail };
