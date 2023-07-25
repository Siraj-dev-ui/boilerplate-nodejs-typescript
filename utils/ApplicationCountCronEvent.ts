import { UserService } from '../Services/UserService';
import { MailOptionsDto } from '../DTO/mailOptionsDto';
const nodemailer = require('nodemailer');

const cron = require('node-cron');

function SendMail({ from, to, subject, htmlMessage }: MailOptionsDto) {
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

export function ApplicationCronCountEvent() {
  const userService = new UserService();
  cron.schedule('* 12 * * *', async () => {
    console.log('running a task every minute');
    const userCount = await userService.getUsersCount();
    await SendMail({
      from: 'userdummy105@gmail.com',
      to: 'sirajalig86@gmail.com',
      subject: 'Registered Users',
      htmlMessage: `<h1>Total Users</h1>
    <h2>Total Registered Users are ${userCount}</h2>
    </div>`,
    });
  });
}
