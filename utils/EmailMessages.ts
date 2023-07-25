require('dotenv').config();

export default interface EmailMessages {
  signUpForm: `SignUp`;
  signUpMsg: 'Thanks for registering';
  signUpHmtl: `<h3> You have successfully Signup </h3>`;
}
// exports.signUpFrom = `"HR Softoo" <${process.env.NM_USER}>`;
// exports.signUpSubject = 'You have signup successfully';
// const signUpMsg = 'Thanks for registering';
// exports.signUpHtml = (email: string) => {
//   return `Dear <b>${email},</b> ${signUpMsg} `;
// };
