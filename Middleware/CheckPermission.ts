import { Request, Response, NextFunction } from 'express';
import { UserService } from '../Services/UserService';

export function checkPermission(action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await query((req as any).role_id, action);
    if (result.length > 0) {
      return next();
    } else {
      res.send({ success: false, message: 'Access Denied.' });
    }
  };
}
async function query(role_id: number, permission: string) {
  const userService = new UserService();

  const res = await userService.getPermissionInfo(role_id, permission);
  return res;
}
