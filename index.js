#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

const CONFIG_FILENAME_DEFAULT = '.openapi-generator.config.js'

function arrayFlat(arr) {
  return [].concat.apply([], arr)
}

function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()
}

function run(configPath) {
  const configs = require(configPath)

  configs.forEach(config => {
    const command = 'openapi-generator'
    const action = 'generate'

    const args = arrayFlat(
      Object.entries(config).map(([key, val]) => [`--${key}`, val]),
    )

    const output = config['output']
    if (output) {
      fs.mkdirSync(output, { recursive: true })
    }

    childProcess.spawn(command, [action, ...args], {
      stdio: [process.stdin, process.stdout, process.stderr],
      env: {
        JAVA_OPTS: '-Dlog.level=warn',
        ...process.env,
      },
    })
  })
}

function main() {
  const configPathDefault = path.join(process.cwd(), CONFIG_FILENAME_DEFAULT)
  if (fileExists(configPathDefault)) {
    run(configPathDefault)
  } else if (1 > process.argv > 3) {
    console.error(
      `usage ${process.argv[0]} <path to .openapi-generator.config.js>`,
    )
    process.exit(1)
  } else {
    const configPath = process.argv[1]
    if (!fileExists(configPath)) {
      console.error(
        `usage ${process.argv[0]} <path to .openapi-generator.config.js>`,
      )
      process.exit(1)
    }
  }
}

main()
