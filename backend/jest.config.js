module.exports = {
	preset: 'ts-jest', // ✅ Use ts-jest to process TypeScript files
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./test/__setup/jest.setup.ts'],
	testMatch: ['**/test/**/*.test.ts'], // ✅ Match TypeScript test files
	transform: {
		'^.+\\.ts$': 'ts-jest' // ✅ Ensure TypeScript files are compiled
	},
	moduleFileExtensions: ['ts', 'js'],
};
