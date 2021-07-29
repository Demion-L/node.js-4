import { newRole, rolesWithPermissions } from './role.service';

export const createNewRole = async (req: Request, res: Response) => {
  try {
    await newRole(req.body.name, req.body.permissionsIds);
    return res.status(200).end();
  } catch (error) {
    console.error(error.message);
    return res.error(403).send(error.message);
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    await rolesWithPermissions(req.body.name, req.body.permissionsIds);
    return res.status(200).end();
  } catch (error) {
    console.error(error.message);
    return res.error(403).send(error.message);
  }
};
