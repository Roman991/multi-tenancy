## Multi tenancy implementation

To keep it simple there are only few models ussential to the multi tenancy:
core:

- Tenant
- TenantsConfig
- User

multi-tananted:

- Shippings

There are only one DB and one controller for creating shippings.

POST `/shippings` should read the `x-tenant` header and through `shippingService` load the proper `royalShippingService` with tenant config (stored in psql db).

This boilerplate is for example only, you can change it as you think is better.

The `load-config.ts` loads all configs on bootstrap, but I think there are better solutions for lazyly loads providers only if needed

### Example with seeded data

`POST /shippings` with payload: `{userId: 1, tenantId:1 ...}`

The shippingService should use the config from Tenant 1 to init/use `royalService` (pass:123, user:123)
