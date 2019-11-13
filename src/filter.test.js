const { expect } = require("chai");
const { includeOnly } = require("./filter");

describe("includeOnly", () => {
  const schema = () => ({
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
  });

  const schemaWithRole1 = () => ({
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
      },
      "/route2": {
        GET: {
          security: [{ auth_jwt: ["role1"] }],
        },
      },
    },
  });

  const emptySchema = () => ({ paths: {} });

  const schemaWithMissingSecurity = () => ({
    paths: {
      "/route1": {
        GET: {
          description: "route 1 GET",
        },
      },
    },
  });

  it("should include routes with single specified role", () => {
    expect(includeOnly("auth_jwt", ["role1"], schema())).to.deep.equal(schemaWithRole1());
  });
  it("should include routes with multiple specified roles", () => {
    expect(includeOnly("auth_jwt", ["role1", "role2"], schema())).to.deep.equal(schema());
  });
  it("should not modify other fields", () => {
    expect(includeOnly("auth_jwt", ["role1", "role2"], schema()).paths["/route1"].GET.description).to.equal(
      "route 1 GET"
    );
  });
  it("should return empty when no roles specified", () => {
    expect(includeOnly("auth_jwt", [], schema())).to.deep.equal(emptySchema());
  });
  it("should return empty when no matching roles specified", () => {
    expect(includeOnly("auth_jwt", ["role3"], schema())).to.deep.equal(emptySchema());
  });
  it("should return empty for unrecognised auth", () => {
    expect(includeOnly("unrecognised", ["role1"], schema())).to.deep.equal(emptySchema());
  });
  it("should include routes with missing security", () => {
    expect(includeOnly("auth_jwt", ["role1"], schemaWithMissingSecurity())).to.deep.equal(schemaWithMissingSecurity());
  });
});
