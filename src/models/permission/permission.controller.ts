import { RequestHandler } from 'express';
import { Permission } from './Permission.model';
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
} from './permission.service';

export const getPermissions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const permissions: Permission | null = await getAllPermissions();

  if (!permissions) return res.status(404).send('permissions not found');
  res.status(200).send();
};

export const createNewPermission: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const permission: Permission = await createPermission(req.body);
  res.status(200).send();
};

export const deleteCurrentPermission: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    let id = req.params.permissionId;
    const permission: Permission | null = await getPermissionById(id);
    if (!permission) return res.status(404).send('User not found');
    deletePermission(id);
    res.status(200).send();
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_CODE.NOT_FOUND).send(error.message);
  }
};
