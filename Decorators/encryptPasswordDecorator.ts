import { CreateUserDto } from '../DTO/createUserDto';

const bcrypt = require('bcrypt');

export function EncryptPassword(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (this: any, arg: any) {
    // const user = args[propertyKey === 'createUser' ? 0 : 1]; // Choose user argument based on the method being decorated
    /* if (user.password) { */
    // const user = arg[0];
    const hashedPassword = await bcrypt.hash(arg.password, 10);
    arg.password = hashedPassword;
    // user.password = hashedPassword;
    // }

    return originalMethod.apply(this, [arg]);
  };

  return descriptor;
}
