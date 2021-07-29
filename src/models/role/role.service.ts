import { Permission } from '../permission/Permission.model';
import { RoleModel } from './Role.model';

export const getRoleById = async (id: string): Promise<RoleModel | null> => {
  const role = await RoleModel.findByPk(id);
  return role;
};

export const newRole = async (req: Request) => {
  return await RoleModel.create({
    name: req.body.name,
  });
};

export const rolesWithPermissions = async () => {
  return await RoleModel.findAll({ include: [Permission] });
};

export const createNewRole = async (
  name: string,
  permissionsIds: string[]
): Promise<void> => {
  const role = await RoleModel.create({ name });
  permissionsIds.map(async (pid) => {
    const permission = await Permission.findByPk(pid);
    if (!permission) throw new Error('This permission not foun');
    role.addPermission(permission);
  });
};
