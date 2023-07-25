import { UserController } from '../Controller/UserController';
import { VerifyToken } from '../Middleware/VerifyToken';
import { Request, Response } from 'express';
import { checkPermission } from '../Middleware/CheckPermission';

const express = require('express');
// const userController = require('../controller/userController');

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/login', (req: Request, res: Response) =>
  userController.login(req, res)
);
userRouter.post('/createUser', VerifyToken, (req: Request, res: Response) =>
  userController.createUser(req, res)
);
userRouter.get(
  '/getUsers',
  VerifyToken,
  checkPermission('view'),
  (req: Request, res: Response) => userController.getUsers(req, res)
);
userRouter.patch(
  '/updateUser/:userId',
  VerifyToken,
  checkPermission('update'),
  (req: Request, res: Response) => userController.updateUser(req, res)
);
userRouter.delete(
  '/deleteUser/:userId',
  VerifyToken,
  checkPermission('delete'),
  (req: Request, res: Response) => userController.deleteUser(req, res)
);
// userRouter.get('/check', userController.myFunction);

module.exports = userRouter;
