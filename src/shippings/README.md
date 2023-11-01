This is the module where I'm looking for a multi tenancy on row level.

There should be just one DB schema with a `tenantId` field
and based on that field should be loaded the proper config from `TenantsConfigs`.
Every tenant has it own's credentials for each courier.

In this example there are two tenants: Tenant1 (id = 1) and Tenant2 (id = 2).

When a shipping is created from a tenant1, should be loaded the config for that tenant
