import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Tenant } from './tenant.model';

@Table({ tableName: 'tenants_configs' })
export class TenantsConfig extends Model<
  InferAttributes<TenantsConfig>,
  InferCreationAttributes<TenantsConfig>
> {
  @ForeignKey(() => Tenant)
  @Column
  tenant_id: number;

  @BelongsTo(() => Tenant, 'tenant_id')
  tenant: Tenant;

  @PrimaryKey
  @Column
  section_name: string;

  @PrimaryKey
  @Column
  config_name: string;

  @Column(DataType.JSON)
  value: any;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
