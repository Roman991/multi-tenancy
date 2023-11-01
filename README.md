## Folders structure

- `config`, `migrations` and `seeders` are used by sequelize-cli to setup the DB
- `src`
  - `lib` common providers shared accross all tenants
  - `models` sequelize models
  - `shippings` module where I want to implement the multi-tenancy

## Multi tenancy implementation

To keep it simple there are only essential elements to understand the requirements:

#### Database models

- Tenant (list of tenants)
- TenantsConfig (every tenant should have its own configs)
- User (list of users)

multi-tananted:

- Shippings (this table has also a `tenantId` field for the row level tenancy)

### Controllers for shipping

There should be only controller for creating shippings.

POST `/shippings` should read the `x-tenant` header and through `shippingService` load the proper `fedexService` with the tenant config.

This boilerplate is for example only, you can change it as you think is better.

### Shipping module

Inside the `shippings.service.ts` there is a rough implementation of what i'm trying to achieve

### TODO

Im looking for a BE structure that can handle multiple tenants (10-20 tenants)

1. the BE should be aware of TenantConfig changes, to use always latest config data (without app reload)
2. ideally providers whould be instantiated once for tenant( and then cached somehow, until config changed)
3. there should be some centralized middleware/interceptor to manage/return tenants configs
4. there should be some centalized middleware/interceptor to check if user belongs to the declared tenant
