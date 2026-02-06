import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set - email functionality will be disabled');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  SUBSCRIPTION_CONFIRMED: 'subscription-confirmed',
  PAYMENT_FAILED: 'payment-failed',
  WEEKLY_REPORT: 'weekly-report',
  ISSUE_ALERT: 'issue-alert',
  CHURN_RISK: 'churn-risk',
} as const;

export interface EmailData {
  to: string | string[];
  subject: string;
  template: keyof typeof EMAIL_TEMPLATES;
  data: Record<string, any>;
}

export async function sendEmail({ to, subject, template, data }: EmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Email sending skipped - RESEND_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@wryko.com',
      to,
      subject,
      html: await renderEmailTemplate(template, data),
    });

    console.log(`Email sent successfully to ${to}: ${subject}`);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function renderEmailTemplate(template: keyof typeof EMAIL_TEMPLATES, data: Record<string, any>): Promise<string> {
  // For now, simple templates. In production, use a proper template engine
  switch (template) {
    case 'WELCOME':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Wryko</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #A855F7;">Welcome to Wryko! 🚀</h1>
            <p>Hi ${data.name || 'there'},</p>
            <p>Welcome to Wryko! Your autonomous B2B lead generation platform is ready to transform your business.</p>
            <p>Here's what happens next:</p>
            <ul>
              <li>Complete your onboarding setup</li>
              <li>Configure your first campaign</li>
              <li>Watch our AI engines generate leads automatically</li>
            </ul>
            <p>
              <a href="${data.dashboardUrl || '#'}" style="background: #A855F7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Access Your Dashboard
              </a>
            </p>
            <p>Questions? Reply to this email or reach out to our team.</p>
            <p>Best regards,<br>The Wryko Team</p>
          </div>
        </body>
        </html>
      `;

    case 'SUBSCRIPTION_CONFIRMED':
      return `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #10B981;">Subscription Confirmed! ✅</h1>
            <p>Hi ${data.name},</p>
            <p>Your Wryko ${data.plan} subscription is now active!</p>
            <p><strong>Plan:</strong> ${data.plan}</p>
            <p><strong>Amount:</strong> $${data.amount}/month</p>
            <p><strong>Next billing date:</strong> ${data.nextBillingDate}</p>
            <p>Your AI engines are spinning up and will begin generating leads within 24 hours.</p>
            <p>
              <a href="${data.dashboardUrl}" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View Dashboard
              </a>
            </p>
          </div>
        </body>
        </html>
      `;

    case 'WEEKLY_REPORT':
      return `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #6366F1;">Your Weekly Wryko Report 📊</h1>
            <p>Hi ${data.name},</p>
            <p>Here's your lead generation performance for this week:</p>
            <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Key Metrics</h3>
              <ul>
                <li><strong>New Leads:</strong> ${data.newLeads || 0}</li>
                <li><strong>Emails Sent:</strong> ${data.emailsSent || 0}</li>
                <li><strong>Open Rate:</strong> ${data.openRate || 0}%</li>
                <li><strong>Reply Rate:</strong> ${data.replyRate || 0}%</li>
                <li><strong>Qualified Leads:</strong> ${data.qualifiedLeads || 0}</li>
              </ul>
            </div>
            <p>
              <a href="${data.dashboardUrl}" style="background: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View Full Report
              </a>
            </p>
          </div>
        </body>
        </html>
      `;

    default:
      return `<p>Template ${template} not found</p>`;
  }
}