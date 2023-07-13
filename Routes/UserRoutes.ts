import { UserController } from '../Controller/UserController';
import { Request, Response } from 'express';

const express = require('express');
// const userController = require('../controller/userController');

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/createUser', (req: Request, res: Response) =>
  userController.createUser(req, res)
);
userRouter.get('/getUsers', (req: Request, res: Response) =>
  userController.getUsers(req, res)
);
userRouter.patch('/updateUser/:userId', (req: Request, res: Response) =>
  userController.updateUser(req, res)
);
userRouter.delete('/deleteUser/:userId', (req: Request, res: Response) =>
  userController.deleteUser(req, res)
);
// userRouter.get('/check', userController.myFunction);

module.exports = userRouter;
