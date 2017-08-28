module.exports = {
  verbose: true,
  timers: 'fake',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    'src/util/**/*.js',
    '!src/theme/**/*.js',
    '!src/**/index.js',
    '!**/src/**/*.stories.js',
    '!**/src/**/*.styled.js',
    '!**/__mocks__/**',
    '!**/__tests__/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/(lib|internal|build|docs|dist)/',
    '/flow-typed/',
    '/__fixtures__/',
    '/node_modules/',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/internal/jest/transform.js',
  },
  testRegex: '.*.test\\.js',
  setupTestFrameworkScriptFile: '<rootDir>/internal/jest/setup.js',
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/(lib|internal|build|docs|dist)/',
    '__snapshots__',
    '/styles/',
  ],
  transformIgnorePatterns: ['/node_modules/', '/docs/', '/flow-typed/', '/styles/'],
};
