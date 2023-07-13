import { CreateUserDto } from '../DTO/createUserDto';

const bcrypt = require('bcrypt');

export function EncryptPassword(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('in decorator : ');
  console.log('target is : ', target);
  console.log('property key ', propertyKey);
  console.log('descriptor : ', descriptor);

  const originalMethod = descriptor.value;

  descriptor.value = async function (this: any, arg: any) {
    console.log('arguments are : ', arg);
    // const user = args[propertyKey === 'createUser' ? 0 : 1]; // Choose user argument based on the method being decorated
    /* if (user.password) { */
    // const user = arg[0];
    const hashedPassword = await bcrypt.hash(arg.password, 10);
    arg.password = hashedPassword;
    // user.password = hashedPassword;
    // }

    console.log('arg after updation : ', arg);

    return originalMethod.apply(this, [arg]);
  };

  return descriptor;
}
