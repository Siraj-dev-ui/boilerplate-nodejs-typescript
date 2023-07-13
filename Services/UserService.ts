import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { UserModel } from '../Model/UserModel';

export class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async createUser(registration_data: CreateUserDto) {
    this.userModel.createUser(registration_data);
  }
  async getUsers() {
    return this.userModel.getAllUsers();
  }
  async updateUser(data: UpdateUserDto, userId: any) {
    return this.userModel.updateUser(data, userId);
  }
  async deleteUser(userId: string) {
    return this.userModel.deleteUser(userId);
  }
}
