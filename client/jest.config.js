// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./"
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^api/(.*)$": "<rootDir>/src/api/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^modules/(.*)$": "<rootDir>/src/modules/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^ui/(.*)$": "<rootDir>/src/ui/$1",
    "^cypress/(.*)$": ["<rootDir>/cypress/$1"],
    "^helpers/(.*)$": ["<rootDir>/helpers/$1"],
    "^mocks/(.*)$": ["<rootDir>/mocks/$1"],
    "^.storybook/(.*)$": ["<rootDir>/.storybook/$1"],
    "^.msw/(.*)$": ["<rootDir>/.msw/$1"]
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
