import { Request, Response } from 'express';
import { CreateUserDto } from '../DTO/createUserDto';
import { UserEntity } from '../Entity/UserEntity';
import { UserService } from '../Services/UserService';
// const UserModel = require('../model/userModel');
// import { createUser } from '../Model/UserModel';
// const EncryptPassword = require('../Decorators/encryptPasswordDecorator');
import { EncryptPassword } from '../Decorators/encryptPasswordDecorator';
import { UpdateUserDto } from '../DTO/updateUserDto';

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    console.log('in the functions');
    try {
      const registration_data: CreateUserDto = req.body;
      // console.log(registration_data);
      const data = await this.userService.createUser(registration_data);
      // const { email } = req.body;
      res.send({ success: true, message: 'User Created Successfully...' });
    } catch (error) {
      console.log('error from controller : ', error);
      res.send({ success: false, message: 'having error' });
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

  async deleteUser(req: Request, res: Response) {
    const result = await this.userService.deleteUser(req.params.userId);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Record has been deleted..' });
    } else {
      res.json({ success: false, message: 'user does not exist.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    console.log('updating user...');
    const result = await this.userService.updateUser(
      req.body,
      req.params.userId
    );
    console.log('result from constroller : ', result);
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

// function EncryptPassword(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   const originalMethod = descriptor.value;
//   descriptor.value = async function (...args: any[]) {
//     // Encryption logic here
//     // For example, you can encrypt the password before passing it to the original method
//     args[0].password = '123';
//     // Call the original method
//     return originalMethod.apply(this, args);
//   };
//   return descriptor;
// }

// @EncryptPassword
// exports.createUser = async (req: Request, res: Response) => {
//   try {
//     const registration_data: CreateUserDto = req.body;
//     // console.log(registration_data);
//     const data = await createUser(registration_data);
//     // const { email } = req.body;
//     res.send({ success: true, message: 'User Created Successfully...' });
//   } catch (error) {
//     console.log('error from controller : ', error);
//     res.send({ success: false, message: 'having error' });
//   }
// };

// exports.getUsers = async (req: Request, res: Response) => {
//   const result: UserEntity[] = await UserModel.getAllUsers();

//   if (result.length > 0) {
//     res.json({ success: true, payload: result });
//   } else {
//     res.json({ success: false, message: 'no record available to show...' });
//   }
// };

// exports.deleteUser = async (req: Request, res: Response) => {
//   const result = await UserModel.deleteUser(req.params.userId);
//   if (result.affectedRows > 0) {
//     res.json({ success: true, message: 'Record has been deleted..' });
//   } else {
//     res.json({ success: false, message: 'user does not exist.' });
//   }
// };

// exports.updateUser = async (req: Request, res: Response) => {
//   console.log('updating user...');
//   const result = await UserModel.updateUser(req.body, req.params.userId);
//   console.log('result from constroller : ', result);
//   if (result.affectedRows > 0) {
//     res.json({ success: true, message: 'User updated...' });
//   } else {
//     res.json({
//       success: false,
//       message: 'Something went wrong while updating user.',
//     });
//   }
// };
