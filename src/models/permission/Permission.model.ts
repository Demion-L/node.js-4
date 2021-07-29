import {
  Model,
  Table,
  Column,
  BelongsToMany,
  IsUUID,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { Actions } from "../../config/constants";
import { RoleModel } from "../role/Role.model";
import { STRING, UUID, UUIDV4 } from "sequelize";
import RolePermissionModel from "../role-permission/RolePermission.model";
import { v4 } from "uuid";

export interface IPermission {
  uuid: string;
  name: Actions;
  roles: RoleModel[];
}

@Table
export class Permission extends Model<IPermission> {
  @IsUUID(4)
  @PrimaryKey
  @Default(v4)
  @Column({
    type: UUID,
  })
  uuid!: string;

  @Column({
    type: STRING,
  })
  name!: string;

  @BelongsToMany(() => RoleModel, () => RolePermissionModel, {onDelete: 'cascade'})
  roles: RoleModel[];
}
