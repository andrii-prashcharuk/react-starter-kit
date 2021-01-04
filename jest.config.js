module.exports = {
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    setupFiles: [
        '<rootDir>/jest.init.js',
    ],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
    ],
    testMatch: ['**/*.(test|spec).js?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
};
