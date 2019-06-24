# swagger-mod-security

## `includeOnly`

Filters a swagger schema to include only path operations with specified `security` present.

If a path is filtered and returns no operations, it is excluded.

No fields of the schema will be modified.

E.g.,

```javascript
const schema = {
  paths: {
    "/route1": {
      GET: {
        description: "route 1 GET",
        security: [
          {
            auth_jwt: ["role1"],
          },
        ],
      },
      POST: {
        security: [
          {
            auth_jwt: ["role1", "role2"],
          },
        ],
      },
      DELETE: {
        security: [
          {
            auth_jwt: ["role2"],
          },
        ],
      },
    },
    "/route2": {
      GET: {
        security: [{ auth_jwt: ["role1"] }],
      },
    },
  },
};

const filteredSchema = includeOnly("auth_jwt", ["role1"], schema);

// Output:
//
//{
//  paths: {
//    "/route1": {
//      GET: {
//        description: "route 1 GET",
//        security: [
//          {
//            auth_jwt: ["role1"],
//          },
//        ],
//      },
//      POST: {
//        security: [
//          {
//            auth_jwt: ["role1", "role2"],
//          },
//        ],
//      },
//    },
//    "/route2": {
//      GET: {
//        security: [{ auth_jwt: ["role1"] }],
//      },
//    },
//  },
//}
```
