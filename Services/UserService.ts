import { CreateUserDto } from '../DTO/createUserDto';
import { loginDataDto } from '../DTO/loginDataDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { UserModel } from '../Model/UserModel';

export class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async createUser(registration_data: CreateUserDto) {
    return this.userModel.createUser(registration_data);
  }
  async getUsers() {
    return this.userModel.getAllUsers();
  }

  async getUsersCount() {
    const userCount = await this.userModel.getUsersCount();
    return userCount;
  }
  async updateUser(data: UpdateUserDto, userId: any) {
    return this.userModel.updateUser(data, userId);
  }
  async deleteUser(userId: string) {
    return this.userModel.deleteUser(userId);
  }

  async loginUser(data: loginDataDto) {
    const resp = await this.userModel.loginUser(data);
    return resp;
  }

  async getPermissionInfo(role_id: number, permission: string) {
    return await this.userModel.getPermissionInfo(role_id, permission);
  }
}
