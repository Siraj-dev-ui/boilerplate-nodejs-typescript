import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

export function VerifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.send({ success: false, message: 'You are not authorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
    if (!err) {
      (req as any).role_id = decoded.role_id;
      next();
    } else {
      return res.send({ success: false, message: 'You are Not authorized' });
    }
  });
}
