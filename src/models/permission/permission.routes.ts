import { Router } from 'express';

import {
  getPermissions,
  createNewPermission,
  deleteCurrentPermission,
} from './Permission.controller';

export const permissionRouter = Router();

permissionRouter
  .get('/', getPermissions)
  .post('/', createNewPermission)
  .delete('/:permissionId', deleteCurrentPermission);
