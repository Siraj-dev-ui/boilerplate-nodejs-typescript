const bcrypt = require('bcrypt');

export async function VerifyHashedPassword(
  userPassword: string,
  dbPassword: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    bcrypt.compare('12344', dbPassword, function (err: any, result: any) {
      if (err) {
        reject(err);
        return;
      }

      if (result) {
        resolve(result);
      }
    });
  });
}
