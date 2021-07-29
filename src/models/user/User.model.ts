import {
  Model,
  Table,
  Column,
  Default,
  PrimaryKey,
  Unique,
  BelongsTo,
  UpdatedAt,
  CreatedAt,
  IsUUID,
  Length,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  IsEmail,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import { RoleModel } from '../role/Role.model';
import { DATE, STRING, UUID } from 'sequelize';

export interface IUser {
  uuid: string;
  name: string;
  email: string;
  role: RoleModel;
  createdAt: Date;
  updatedAt: Date;
}

@Table
export class UserModel extends Model<IUser> {
  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: UserModel) {
    instance.name = instance.name.toLocaleUpperCase();
  }

  @IsUUID(4)
  @PrimaryKey
  @Default(v4)
  @Column({
    type: UUID,
  })
  uuid!: string;

  @Length({ min: 2, max: 15 })
  @Column({
    type: STRING,
  })
  name!: string;

  @IsEmail
  @Unique
  @Column({
    type: STRING,
  })
  email!: string;

  @CreatedAt
  @Column({
    type: DATE,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DATE,
  })
  updatedAt!: Date;

  @ForeignKey(() => RoleModel)
  @Column({
    type: UUID,
  })
  roleId?: string;

  @BelongsTo(() => RoleModel)
  role: RoleModel;
}
