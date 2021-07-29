import {
  Model,
  Table,
  Column,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { RoleModel } from "../role/Role.model";
import { NUMBER, STRING, UUID, UUIDV4 } from "sequelize";
import { Permission } from "../permission/Permission.model";
import { v4 } from "uuid";

interface IRolePermissionModel {
  uuid: string;
  permissionId: number;
  roleId: number;
}

@Table
export default class RolePermissionModel extends Model<IRolePermissionModel> {
  @IsUUID(4)
  @PrimaryKey
  @Default(v4)
  @Column({
    type: UUID,
  })
  uuid!: string;

  @ForeignKey(() => Permission)
  @Column({
    type: UUID,
  })
  permissionId!: string;

  @ForeignKey(() => RoleModel)
  @Column({
    type: UUID,
  })
  roleId!: string;
}
