import express from 'express';
import bodyParser from 'body-parser';
import { Actions, PORT } from './config/constants';
import { sequelize } from './database/sequelize';
import { UserModel } from './models/user/User.model';
import { RoleModel } from './models/role/Role.model';
import { Permission } from './models/permission/Permission.model';
import { userRouter } from './models/user/user.routes';
import { roleRouter } from './models/role/role.routes';
import { permissionRouter } from './models/permission/permission.routes';

export const app = express();

app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);

const bob: object = {
  name: 'Bob',
  email: 'asdf@mail.ru',
  role: { name: 'reader' },
};

async function start() {
  await RoleModel.create(
    {
      name: 'reader',
      permissions: [
        {
          permission: Actions.READ,
        },
        {
          permission: Actions.CREATE,
        },
        {
          permission: Actions.UPDATE,
        },
        {
          permission: Actions.DELETE,
        },
      ],
    },
    {
      include: [Permission],
    }
  );
  await UserModel.create(bob, { include: [RoleModel] })
    .then((res) => {
      const user = { id: res.id, name: res.name, role: res.role };
      console.log(user);
    })
    .catch((err) => console.log(err));
}

app.listen(PORT, () => {
  console.log(`Server was running at port: ${PORT}`);

  sequelize
    .authenticate()
    .then(async () => {
      console.log('database connected');

      try {
        await sequelize
          .sync
          // { force: true }
          ();
        await start();
      } catch (e) {
        console.error(e);
      }
    })
    .catch((e: Error) => {
      console.error(e);
    });
});
