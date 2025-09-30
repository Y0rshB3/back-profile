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
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendContactEmail(data: EmailData): Promise<void> {
    const mailOptions = {
      from: `"${data.name}" <${process.env.SMTP_USER}>`,
      to: 'contact@y0rshb3.com',
      cc: 'jebp91@hotmail.com',
      replyTo: data.email,
      subject: `[Portfolio Contact] ${data.subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Asunto:</strong> ${data.subject}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
Nuevo mensaje de contacto

Nombre: ${data.name}
Email: ${data.email}
Asunto: ${data.subject}

Mensaje:
${data.message}
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
