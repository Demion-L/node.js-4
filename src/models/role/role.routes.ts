import { Router } from 'express';
import { createNewRole, getRoles } from './role.service';


export const roleRouter = Router();

roleRouter
  .get('/', getRoles)
  .post('/', createNewRole);


