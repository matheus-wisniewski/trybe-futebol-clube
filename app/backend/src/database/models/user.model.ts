import SequelizeUser from './SequelizeUsers';
import { User } from '../../Interfaces/users/User';
import { MyUserModel } from '../../Interfaces/users/UserModel';

export default class UserModel implements MyUserModel {
  private model = SequelizeUser;
  async findByEmail(email: string): Promise<User | null> {
    const getUser = await this.model.findOne({ where: { email } });
    if (!getUser) return null;
    const { id, password, username, role } = getUser;
    return { id, email, password, username, role };
  }
}
