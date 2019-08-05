# openapi-mass-generator

Mass-generate your APIs with
[`@openapitools/openapi-generator-cli`](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)

## What is this?

This simple tool looks for a config file (by default
`.openapi-generator.config.js`) with an array of commands for
[`@openapitools/openapi-generator-cli`](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)
and runs generator for every such command.

This way you can easily run generators for multiple specs or multiple generators
for the same spec (or both).

It is especially handy if you develop microservices based on OpenAPI or Swagger.
This tool will allow you to generate all the API stubs with a single command
your build config file (e.g. package.json) or at least a single entry per
service.

Because `.openapi-generator.config.js` is a javascript file, you can use
environment variables and any other configuration logic. No longer you need a
bunch of confusing hardcoded filenames in the scripts section of package.json.

## How to use

First, install this package and openapi generator:

```bash
yarn add --dev openapi-mass-generator @openapitools/openapi-generator-cli

```

> Note: `@openapitools/openapi-generator-cli` assumes Java > 8 is installed
and is available in system path.


For the following config file `.openapi-generator.config.js`:

```js
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const SPEC = process.env.SPEC // see .env
const GENERATED_DIR = 'generated'

module.exports = [
  // Typescript Axios client
  {
    'generator-name': 'typescript-axios',
    'input-spec': `./${SPEC}`,
    config: 'config//typescript-axios.json',
    output: `${GENERATED_DIR}/AxiosClient`,
  },

  // Go gin server
  {
    'generator-name': 'go-gin-server',
    'input-spec': `./${SPEC}`,
    output: `${GENERATED_DIR}/GoServer`,
  },
]
```

and the following `.env` file:

```bash
SPEC=spec/petstore-minimal.yaml

```

when you run

```
openapi-mass-generator

```

the following `openapi-generator` commands will be issued:

```bash
openapi-generator generate \
--generator-name=typescript-axios \
--input-spec=spec/petstore-minimal.yaml \
--config=config/typescript-axios.json \
--output=generated/AxiosClient

openapi-generator generate \
--generator-name=go-gin-server \
--input-spec=spec/petstore-minimal.yaml \
--output=generated/GoServer

```

and the following stubs will ge generated:

```bash
generated/AxiosClient
generated/GoServer

```

You can find this example in `example/` directory.

For more details, refer to
[OpenAPI Generator Documentation](https://openapi-generator.tech/docs/usage)
