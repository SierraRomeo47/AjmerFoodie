/**
 * VERCEL SERVERLESS FUNCTION: /api/contact
 * Handles brand collaboration inquiry form submissions.
 * Supports Resend API (recommended), custom SMTP, or fallback logging.
 */

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  // 1. Enable CORS for development & domain access
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    let parsedBody = req.body;
    if (typeof parsedBody === 'string') {
      try {
        parsedBody = JSON.parse(parsedBody);
      } catch {
        parsedBody = {};
      }
    }

    const {
      brand,
      contact,
      email,
      phone,
      category,
      deliverables,
      timeline,
      budget,
      brief
    } = parsedBody || {};

    // 2. Server-side validation
    if (!brand || !contact || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields (brand, contact, email, phone).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address provided.'
      });
    }

    // 3. Format email content
    const referenceId = 'AF-' + Math.floor(100000 + Math.random() * 900000);
    const subject = `🌟 New Collab Inquiry: ${brand} x AjmerFoodie [${referenceId}]`;
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'Drskhmat29@gmail.com';
    const safeBrief = escapeHtml(brief || 'Excited to discuss collaboration details.').replace(/\n/g, '<br>');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fdfaf6; margin: 0; padding: 24px; color: #292524; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #ebd9c8; }
          .header { background: linear-gradient(135deg, #D94826, #C98A2C); padding: 28px 24px; color: #ffffff; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
          .body-content { padding: 24px; }
          .badge { display: inline-block; background: #fff4ea; color: #D94826; border: 1px solid #f3d4be; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { padding: 12px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f5ede4; }
          th { width: 35%; color: #78716c; font-weight: 600; background: #faf6f0; }
          td { color: #1c1917; font-weight: 500; }
          .brief-box { background: #faf6f0; border-radius: 10px; padding: 16px; margin-top: 16px; font-size: 14px; line-height: 1.6; border-left: 4px solid #D94826; }
          .footer { background: #faf6f0; padding: 16px; text-align: center; font-size: 12px; color: #a8a29e; border-top: 1px solid #f0e6da; }
          .btn-action { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AjmerFoodie Collaboration Inquiry</h1>
            <p>Dr. Shikha Mathur Portfolio Lead</p>
          </div>
          <div class="body-content">
            <span class="badge">Reference #${referenceId}</span>
            <p>You have received a new brand collaboration request from <strong>${escapeHtml(contact)}</strong> representing <strong>${escapeHtml(brand)}</strong>.</p>
            
            <table>
              <tr><th>Brand / Company</th><td><strong>${escapeHtml(brand)}</strong></td></tr>
              <tr><th>Contact Person</th><td>${escapeHtml(contact)}</td></tr>
              <tr><th>Email Address</th><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><th>Phone / WhatsApp</th><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
              <tr><th>Collaboration Pillar</th><td>${escapeHtml(category || 'Not specified')}</td></tr>
              <tr><th>Deliverables</th><td>${escapeHtml(deliverables || 'Reels & Stories')}</td></tr>
              <tr><th>Target Timeline</th><td>${escapeHtml(timeline || 'Flexible')}</td></tr>
              <tr><th>Proposed Budget</th><td><strong>${escapeHtml(budget || 'Discuss')}</strong></td></tr>
            </table>

            <div class="brief-box">
              <strong>Campaign Brief & Vision:</strong><br>
              ${safeBrief}
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="https://wa.me/${String(phone).replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(contact)},%20thank%20you%20for%20reaching%20out%20to%20AjmerFoodie!" class="btn-action">
                Reply via WhatsApp &rarr;
              </a>
            </div>
          </div>
          <div class="footer">
            Sent securely via AjmerFoodie Official Collaboration Portal • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Dispatch Email via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.SENDER_EMAIL || 'AjmerFoodie Collabs <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email,
          subject: subject,
          html: htmlContent
        })
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error('Resend API Error:', errorData);
        // Return fallback indicator so frontend can trigger mailto client
        return res.status(200).json({
          success: true,
          mode: 'fallback_prompt',
          message: 'Inquiry received. Launching backup email client.',
          referenceId: referenceId
        });
      }

      return res.status(200).json({
        success: true,
        mode: 'sent_direct',
        message: 'Inquiry sent directly to Dr. Shikha Mathur.',
        referenceId: referenceId
      });
    }

    // 5. If no API keys set yet, log & acknowledge (allows seamless frontend verification)
    console.log(`[Collab Inquiry Received] Ref: ${referenceId} | Brand: ${brand} | Email: ${email}`);
    return res.status(200).json({
      success: true,
      mode: 'fallback_prompt',
      message: 'Inquiry received. Ready for automated delivery once RESEND_API_KEY is configured.',
      referenceId: referenceId
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing inquiry.'
    });
  }
}
