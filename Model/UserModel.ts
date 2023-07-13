const queryDB = require('../Config/dbConfig');
// const bcrypt = require('bcrypt');
import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { EncryptPassword } from '../Decorators/encryptPasswordDecorator';

// exports.login = (email: string) => {
//   return QueryDB('Select * from users where email = ?', [email]);
// };

export class UserModel {
  @EncryptPassword
  async createUser(registration_data: CreateUserDto) {
    console.log('in model functions', registration_data);
    const { email, password } = registration_data;

    // registration_data.password = await bcrypt.hash(password, 13);

    const data = [email, password];
    // console.log('data is : ', data);

    return await queryDB(
      'INSERT into users (email,password) values(?,?) ',
      data
    );
  }

  async getAllUsers() {
    return await queryDB('select * from users');
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
    console.log('query is : ', query, 'query params are : ', queryParams);

    return await queryDB(query, queryParams);
  }

  async deleteUser(userId: string) {
    return await queryDB(`delete from users where id = ?`, [userId]);
  }
}

// const createUser = async (registration_data: CreateUserDto) => {
// @EncryptPassword
// async function createUser(registration_data: CreateUserDto) {
//   const { email, password } = registration_data;

//   // registration_data.password = await bcrypt.hash(password, 13);

//   const data = [email, password];
//   // console.log('data is : ', data);

//   return await queryDB('INSERT into users (email,password) values(?,?) ', data);
// }

// const getAllUsers = async () => {
//   return await queryDB('select * from users');
// };

// const updateUser = async (vals: UpdateUserDto, userId: any) => {
//   let query = 'update users SET ';
//   let queryParams = [];
//   let fieldsToUpdate = [];

//   // if (vals.password) vals.password = await bcrypt.hash(vals.password, 13);

//   for (const [key, value] of Object.entries(vals)) {
//     fieldsToUpdate.push(`${key} = ?`);
//     queryParams.push(value);
//   }
//   query += fieldsToUpdate.join(', ');
//   query += ' WHERE id = ?';
//   queryParams.push(userId);
//   console.log('query is : ', query, 'query params are : ', queryParams);

//   return await queryDB(query, queryParams);
// };

// const deleteUser = async (userId: string) => {
//   return await queryDB(`delete from users where id = ?`, [userId]);
// };

// module.exports = { deleteUser, updateUser, getAllUsers };
