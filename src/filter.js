const Immutable = require("immutable");

exports.includeOnly = (authKey, acceptedRoles, schema) => {
  return Immutable.fromJS(schema)
    .update("paths", paths =>
      paths
        .map(path => {
          return path.filter(operation => {
            const security = (operation.get("security") || Immutable.List()).toJS();
            if (security.length === 0) {
              return true; // No security = most permissive so should always be included
            }

            for (let i = 0; i < security.length; i++) {
              const auth = security[i];
              const roles = auth[authKey];
              if (roles) {
                for (let j = 0; j < roles.length; j++) {
                  if (acceptedRoles.indexOf(roles[j]) !== -1) {
                    return true;
                  }
                }
              }
            }
            return false;
          });
        })
        .filter(path => path.count() > 0)
    )
    .toJS();
};
