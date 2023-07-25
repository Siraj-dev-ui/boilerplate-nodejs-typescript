const nodemailer = require('nodemailer');
import { MailOptionsDto } from '../DTO/mailOptionsDto';

export class SendEmailService {
  SendMail({ from, to, subject, htmlMessage }: MailOptionsDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.NM_HOST,
      port: process.env.NM_PORT,
      auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS,
      },
    });
    var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: htmlMessage,
    };
    return transporter.sendMail(mailOptions);
  }
}
