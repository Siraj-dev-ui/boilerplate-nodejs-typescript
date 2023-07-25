import { Request, Response } from 'express';
import { CreateUserDto } from '../DTO/createUserDto';
import { UserEntity } from '../Entity/UserEntity';
import { UserService } from '../Services/UserService';
import { SendEmailService } from '../Services/SendEmailService';
import { createUserValidationDecorator } from '../Decorators/createUserDataValidationDecorator';
import { CreateUserValidationSchema } from '../utils/CreateUserValidationSchema';

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
// const { subject, signUpHtml, from } = require('../utils/emailMsgs');
import EmailMessages from '../utils/EmailMessages';

// import { signUp } from '../utils/emailMsgs';
require('dotenv');

// const UserModel = require('../model/userModel');
// import { createUser } from '../Model/UserModel';
// const EncryptPassword = require('../Decorators/encryptPasswordDecorator');
import { UpdateUserDto } from '../DTO/updateUserDto';
import { MailOptionsDto } from '../DTO/mailOptionsDto';
import { GenerateJWT } from '../utils/GenerateJWT';

export class UserController {
  private userService: UserService;
  private sendEmailService: SendEmailService;
  constructor() {
    this.userService = new UserService();
    this.sendEmailService = new SendEmailService();
  }

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const resp = await this.userService.loginUser({ email, password });
    if (resp) {
      bcrypt.compare(
        password,
        resp[0].password,
        async function (err: Error, result: boolean) {
          if (result) {
            const token = await GenerateJWT(resp[0].role_id);
            res.set('Authorization', `Bearer ${token}`);
            res.send({ success: true, payload: resp });
          } else {
            res.send({ success: false, message: 'Incorrect Data entered' });
          }
        }
      );
    }
  }

  @createUserValidationDecorator<CreateUserDto>(CreateUserValidationSchema)
  async createUser(req: Request, res: Response) {
    try {
      const registration_data: CreateUserDto = req.body;
      const data = await this.userService.createUser(registration_data);

      await this.SendMail({
        from: 'userdummy105@gmail.com',
        to: 'sirajalig86@gmail.com',
        subject: 'Please confirm your account',
        htmlMessage: `<h1>Email Confirmation</h1>
      <h2>Hello siraj</h2>
      <p>Thank you for subscribing. </p>
      </div>`,
      });
      res.send({ success: true, message: 'User Created Successfully...' });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  async getUsers(req: Request, res: Response) {
    const result: UserEntity[] = await this.userService.getUsers();

    if (result.length > 0) {
      res.json({ success: true, payload: result });
    } else {
      res.json({ success: false, message: 'no record available to show...' });
    }
  }

  // async getUsersCount(req: Request, res: Response) {
  //   const result = await this.userService.getUsersCount();

  //   if(result.length)
  // }

  async deleteUser(req: Request, res: Response) {
    const result = await this.userService.deleteUser(req.params.userId);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Record has been deleted..' });
    } else {
      res.json({ success: false, message: 'user does not exist.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    const result = await this.userService.updateUser(
      req.body,
      req.params.userId
    );
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'User updated...' });
    } else {
      res.json({
        success: false,
        message: 'Something went wrong while updating user.',
      });
    }
  }
}
