# swagger-mod-security

Methods to filter a provided swagger schema by `security`.

See https://github.com/pwelagedara/swagger-mod for other filtering capabilities.

## `includeOnly`

Filters a swagger schema to include only path operations with specified `security` present.

If a path is filtered and returns no operations, it is excluded.

No fields of the schema will be modified.

See [example.js](./example.js).
