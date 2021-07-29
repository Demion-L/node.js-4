import { getRoleById } from '../role/role.service';
import { UserModel } from './User.model';

export const getUserById = async (id: string): Promise<UserModel | null> => {
  const user = await UserModel.findByPk(id);
  return user;
};

export const createUser = async (
  name: string,
  email: string
): Promise<UserModel> => {
  const user = await UserModel.create({ name, email });
  return user;
};

export const updateUser = async (
  userId: string,
  roleId: string
): Promise<void> => {
  const user = await getUserById(userId);
  const role = await getRoleById(roleId);
  if (!user) {
    throw new Error('User not found');
  } else if (!role) {
    throw new Error('Role not found');
  }
  await user.setRole(role);
};
