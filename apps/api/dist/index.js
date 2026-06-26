"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// --- Security: Restrict CORS to known origins ---
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000'];
app.use((0, cors_1.default)({ origin: allowedOrigins }));
// --- Security: Explicit body size limit ---
app.use(express_1.default.json({ limit: '16kb' }));
// --- Security: HTML escaping for email content ---
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
// Configure Nodemailer Transporter
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    } : undefined
});
// Send notification email
async function sendContactEmail(request) {
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
      <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(request.phone || 'N/A')}</p>
      <p><strong>Company:</strong> ${escapeHtml(request.company || 'N/A')}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(request.projectType)}</p>
      <p><strong>Budget Range:</strong> ${escapeHtml(request.budgetRange || 'N/A')}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(request.timeline || 'N/A')}</p>
      <p><strong>Locale:</strong> ${escapeHtml(request.locale)}</p>
      <p><strong>Created At:</strong> ${escapeHtml(request.createdAt || '')}</p>
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(request.message)}</p>
      ${request.referenceLink ? `<p><strong>Reference Link:</strong> ${escapeHtml(request.referenceLink)}</p>` : ''}
    `
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
    }
    catch (error) {
        console.error('Error sending SMTP email:', error);
    }
}
// GET /api/health
app.get('/api/health', (req, res) => {
    const response = {
        status: 'healthy',
        timestamp: new Date().toISOString()
    };
    res.json(response);
});
// --- Security: Rate limit contact form submissions ---
const contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later' }
});
// POST /api/contact-requests
app.post('/api/contact-requests', contactLimiter, async (req, res) => {
    try {
        const body = req.body;
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
        // --- Security: Server-side validation ---
        if (!name || !email || !projectType || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }
        const savedRequest = {
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
    }
    catch (error) {
        console.error('Error processing contact request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// --- Security: Catch-all 404 for undefined API routes ---
app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
