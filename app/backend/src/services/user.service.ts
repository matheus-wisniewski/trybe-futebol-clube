import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const getUser = await this.userModel.findByEmail(email);
    if (!getUser) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const validatePassword = await bcrypt.compare(password, getUser.password);
    if (!validatePassword) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign({
      id: getUser.id, role: getUser.role }, process.env.JWT_SECRET || 'padrao', {
      expiresIn: '7d',
    });
    return {
      status: 'SUCCESSFUL', data: { token } };
  }
}
