# swagger-mod-security

Modifies an existing swagger document using filters operating on the `security` section of paths.

Currently the only supported filter is `includeOnly`.

See https://github.com/pwelagedara/swagger-mod for filters operating on other fields.

## Available filters

### `includeOnly`

Returns a swagger document including only the paths containing the specified roles. This can only operate on one type
of security at a time.

## Examples

See the `examples` directory.

## License

[MIT](https://opensource.org/licenses/MIT) License.
