const queryDB = require('../Config/dbConfig');
// const bcrypt = require('bcrypt');
import { CreateUserDto } from '../DTO/createUserDto';
import { loginDataDto } from '../DTO/loginDataDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { EncryptPassword } from '../Decorators/encryptPasswordDecorator';

export class UserModel {
  @EncryptPassword
  async createUser(registration_data: CreateUserDto) {
    const { email, password, role_id } = registration_data;

    const data = [email, password, role_id];

    return await queryDB(
      'INSERT into users (email,password,role_id) values(?,?,?) ',
      data
    );
  }

  async loginUser(loginData: loginDataDto) {
    const resp = await queryDB('select * from users where email=? limit 1', [
      loginData.email,
    ]);
    return resp;
  }

  async getAllUsers() {
    return await queryDB('select * from users');
  }

  async getUsersCount() {
    const data = await queryDB('select count(*) as total_users from users');
    return data[0].total_users;
  }

  async updateUser(vals: UpdateUserDto, userId: any) {
    let query = 'update users SET ';
    let queryParams = [];
    let fieldsToUpdate = [];

    // if (vals.password) vals.password = await bcrypt.hash(vals.password, 13);

    for (const [key, value] of Object.entries(vals)) {
      fieldsToUpdate.push(`${key} = ?`);
      queryParams.push(value);
    }
    query += fieldsToUpdate.join(', ');
    query += ' WHERE id = ?';
    queryParams.push(userId);

    return await queryDB(query, queryParams);
  }

  async deleteUser(userId: string) {
    return await queryDB(`delete from users where id = ?`, [userId]);
  }

  async getPermissionInfo(role_id: number, permission: string) {
    return await queryDB(
      `select * from role_permissions rp join permissions p on 
      rp.permission_id = p.id where rp.role_id=? and 
      p.name=?`,
      [role_id, permission]
    );
  }
}
