// jest.config.js

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Ambiente de teste Node.js
  testMatch: ['**/*.test.ts'], // Padroniza os arquivos de teste
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./src/__tests/jest.setup.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests/*', '<rootDir>/src/external/http/*']
};
