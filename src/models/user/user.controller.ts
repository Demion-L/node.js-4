import { RequestHandler } from 'express';
import { createUser, updateUser } from './user.service';

export const createNewUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  await createUser(req.body.name, req.body.email);
  return res.status(200).end();
};

export const putchUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    await updateUser(req.body.roleId, req.body.userId);
    return res.status(200).end();
  } catch (error) {
    console.error(error.message);
    return res.status(403).send(error.message);
  }

  // const user: UserModel | null = await getUserById(req.params.userId);
  // const role: RoleModel | null = await getRoleById(req.params.roles);
  // if (!user) return res.status(404).send('User not found');
  // if (!role) return res.status(404).send('User not found');
  // // @ts-ignore
  // await user.updateUser( user, role);
  // res.status(200).end();
};
