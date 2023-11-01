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

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Tenant } from './tenant.model';

@Table({ timestamps: false })
export class TenantsConfig extends Model<
  InferAttributes<TenantsConfig>,
  InferCreationAttributes<TenantsConfig>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @ForeignKey(() => Tenant)
  @Column
  tenantId: number;

  @BelongsTo(() => Tenant, 'tenantId')
  tenant: Tenant;

  @PrimaryKey
  @Column
  configName: string;

  @Column(DataType.JSON)
  configValue: any;
}
