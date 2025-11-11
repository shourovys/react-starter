module.exports = {
  consumer: {
    name: 'react-frontend',
  },
  provider: {
    name: 'api-service',
  },
  port: 1234,
  host: 'http://127.0.0.1',
  pactfileWriteMode: 'overwrite',
  pactDir: './tests/contracts/pacts',
  logDir: './tests/contracts/logs',
  spec: 2,
  cors: false,
  timeout: 30000,
  requestFilter: null,
  stateHandlers: {},
  context: {},
  // Disable HTTPS for local testing
  ssl: false,
  // Custom directories
  dir: './tests/contracts/pacts',
  log: './tests/contracts/logs/pact.log',
  // Test configuration
  test: {
    timeout: 60000,
    reporter: 'json',
  },
  // Publish configuration (optional)
  publish: false,
  // Build configuration
  build: {
    outputDir: './tests/contracts',
    customBuildCommands: [],
  },
  // Verification configuration
  verify: {
    timeout: 60000,
  },
  // Broker configuration (optional, for publishing contracts)
  broker: {
    enablePending: false,
    includePendingStatus: false,
    consumerVersionSelectors: [],
    enableDirty: false,
    allowWarnings: false,
    verbose: false,
  },
};
