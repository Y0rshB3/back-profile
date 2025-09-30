import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendContactEmail(data: EmailData): Promise<void> {
    const mailOptions = {
      from: `"Portfolio - Y0rshB3" <${process.env.SMTP_USER}>`,
      to: 'contact@y0rshb3.com',
      cc: 'jebp91@hotmail.com',
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f4f4f4; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
    <h2 style="color: #2c3e50; margin-top: 0; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
      📬 New Contact Message
    </h2>
    
    <div style="background-color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 10px 0;"><strong style="color: #2c3e50;">Name:</strong> ${data.name}</p>
      <p style="margin: 10px 0;"><strong style="color: #2c3e50;">Email:</strong> 
        <a href="mailto:${data.email}" style="color: #3498db; text-decoration: none;">${data.email}</a>
      </p>
      <p style="margin: 10px 0;"><strong style="color: #2c3e50;">Subject:</strong> ${data.subject}</p>
    </div>
    
    <div style="background-color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #2c3e50; margin-top: 0;">Message:</h3>
      <p style="white-space: pre-wrap; color: #555;">${data.message}</p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 12px;">
      <p>This message was sent from your portfolio contact form at y0rshb3.com</p>
      <p>Reply directly to this email to respond to ${data.name}</p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
New Contact Message from Portfolio

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
Reply to this email to respond to ${data.name}.
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
