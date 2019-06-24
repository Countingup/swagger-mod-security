const fs = require("fs");
const { includeOnly } = require("./index");

// read example swagger schema from file
const schema = JSON.parse(fs.readFileSync("./example.json", "utf8"));

// filter - include only operations on routes with auth_jwt role "role1" specified.
const filtered = includeOnly("auth_jwt", ["role1"], schema);

// display filtered result
console.log(JSON.stringify(filtered, null, 2));

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
