import { Permission, IPermission } from './Permission.model';

export const getPermissionById = (id: string) => {
  return Permission.findByPk(id);
};

export const getAllPermissions = () => {
  return Permission.findAll();
};

export const createPermission = async (
  body: IPermission
): Promise<Permission> => {
  const permission: Permission = await Permission.create(body);
  return permission;
};

export const deletePermission = async (id: string): Promise<void> => {
  const permission: Permission | null = await getPermissionById(id);
  if (!Permission) {
    throw new Error('Permission not found');
  }
  await permission.destroy({ force: true });
};
