import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { User } from './user.model';
import { TenantsConfig } from './tenants-config.model';

@Table({ tableName: 'tenants', timestamps: true, underscored: true })
export class Tenant extends Model<
  InferAttributes<Tenant>,
  InferCreationAttributes<Tenant>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column({ unique: true })
  tenant_name: string;

  @HasMany(() => User)
  users: NonAttribute<User[]>;

  @Column(DataType.DATE)
  created_at: CreationOptional<Date>;

  @Column(DataType.DATE)
  updated_at: CreationOptional<Date>;

  @HasMany(() => TenantsConfig)
  configs: NonAttribute<TenantsConfig[]>;
}
