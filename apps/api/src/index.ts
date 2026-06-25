import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { ContactRequest, HealthResponse } from '@codzhub/shared';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  } : undefined
});

// Send notification email
async function sendContactEmail(request: ContactRequest) {
  if (!process.env.SMTP_USER) {
    console.log('--- Mock SMTP Email Log ---');
    console.log(`From: ${process.env.EMAIL_SENDER || 'no-reply@codzhub.com'}`);
    console.log(`To: ${process.env.EMAIL_RECEIVER || 'admin@codzhub.com'}`);
    console.log(`Subject: New Contact Request from ${request.name}`);
    console.log(`Content:`, JSON.stringify(request, null, 2));
    console.log('---------------------------');
    return;
  }

  const sender = process.env.EMAIL_SENDER || `"CodzHub Form" <${process.env.SMTP_USER}>`;
  const receiver = process.env.EMAIL_RECEIVER || process.env.SMTP_USER;

  const mailOptions = {
    from: sender,
    to: receiver,
    subject: `New Contact Request: ${request.projectType} from ${request.name}`,
    html: `
      <h2>New Contact Request Received</h2>
      <p><strong>Name:</strong> ${request.name}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      <p><strong>Phone:</strong> ${request.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${request.company || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${request.projectType}</p>
      <p><strong>Budget Range:</strong> ${request.budgetRange || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${request.timeline || 'N/A'}</p>
      <p><strong>Locale:</strong> ${request.locale}</p>
      <p><strong>Created At:</strong> ${request.createdAt}</p>
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${request.message}</p>
      ${request.referenceLink ? `<p><strong>Reference Link:</strong> <a href="${request.referenceLink}">${request.referenceLink}</a></p>` : ''}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending SMTP email:', error);
  }
}

// GET /api/health
app.get('/api/health', (req, res) => {
  const response: HealthResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

// POST /api/contact-requests
app.post('/api/contact-requests', async (req, res) => {
  try {
    const body = req.body as ContactRequest;
    
    const name = body.name;
    const email = body.email;
    const phone = body.phone || undefined;
    const company = body.company || undefined;
    const projectType = body.projectType;
    const budgetRange = body.budgetRange || undefined;
    const timeline = body.timeline || undefined;
    const message = body.message;
    const referenceLink = body.referenceLink || undefined;
    const locale = body.locale || 'en';
    const createdAt = new Date().toISOString();

    // Simple validation
    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const savedRequest: ContactRequest = {
      id: Date.now(),
      name,
      email,
      phone,
      company,
      projectType,
      budgetRange,
      timeline,
      message,
      referenceLink,
      locale,
      createdAt
    };

    // Send email notification asynchronously
    sendContactEmail(savedRequest).catch(err => {
      console.error('Error sending email:', err);
    });

    return res.status(201).json(savedRequest);
  } catch (error: any) {
    console.error('Error processing contact request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
