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
