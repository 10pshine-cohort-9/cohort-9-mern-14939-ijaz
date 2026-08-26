export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^.*/api/client$": "<rootDir>/src/test/__mocks__/client.ts",
  },
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
};
