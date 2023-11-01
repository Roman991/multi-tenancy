import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Tenant } from './tenant.model';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { User } from './user.model';

@Table({ timestamps: false })
export class Shipping extends Model<
  InferAttributes<Shipping>,
  InferCreationAttributes<Shipping>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column
  courier: string;

  @Column
  tracking: string;

  @ForeignKey(() => Tenant)
  @Column
  tenantId: number;

  @BelongsTo(() => Tenant, 'tenantId')
  tenant: NonAttribute<Tenant>;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: NonAttribute<User>;
}
