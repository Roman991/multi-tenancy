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

@Table({ timestamps: true })
export class Tenant extends Model<
  InferAttributes<Tenant>,
  InferCreationAttributes<Tenant>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column({ unique: true })
  tenantName: string;

  @HasMany(() => User)
  users: NonAttribute<User[]>;

  @HasMany(() => TenantsConfig)
  configs: NonAttribute<TenantsConfig[]>;
}
