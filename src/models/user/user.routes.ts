import { Router } from 'express';

import { createNewUser, putchUser } from './user.controller';

export const userRouter = Router();

userRouter
  .post('/', createNewUser)
  .patch('/:userId/roles', putchUser);
