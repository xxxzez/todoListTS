module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: 'jest-environment-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
}
