// jest.config.ts
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    // Next.js 앱의 경로
    dir: './',
})

const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 매 테스트 전 실행될 설정
    testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)