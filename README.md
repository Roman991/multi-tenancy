## About This Repository

This is a boilerplate for a BE with multitenancy on row level.
Using nestjs as main framework and sequelize as orm

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

1. ~~the BE should be aware of TenantConfig changes, to always use the latest config data (without app reload)~~
   > ~~this can be done moving tenantConfigs store to a class (then invocking the class from the tenant.intercepto, and when updating the db, changing also the tenantConfig store)~~
2. ideally providers should be instantiated just once for tenant( and then cached somehow, until config changed)
   > imo it is a task that requires advanced knowledge in nestjs and probably it requires a complete refactoring of the codebase.
   > I'm exploring some solutions
   >
   > 1. choose a nomenclature for providers and then call them by @Inject('fedexService'+tenantId) //fedexService1
   >    https://docs.nestjs.com/providers#property-based-injection
   > 2. Load all tenant + tenant configs at bootstrap and register all services at once
   >    https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
   > 3. Do all at module level: idk with contextId, useFactory or dynamic instantiation of provide
   >    https://docs.nestjs.com/fundamentals/module-ref#registering-request-provider
3. ~~there should be some centralized middleware/interceptor to manage/return tenants configs~~
4. ~~there should be some centalized middleware/interceptor to check if user belongs to the declared tenant~~
   > ~~this can be achieved by adding a guard that has loaded all users and tenant, and checks if user belongs to declared tenant~~
