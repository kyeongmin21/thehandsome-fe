import './commands';
import "cypress-real-events";



// Uncaught exception 무시 (Next.js router 관련)
Cypress.on('uncaught:exception', (err, runnable) => {
    // URL 관련 에러는 무시
    if (err.message.includes('Failed to construct \'URL\'')) {
        return false
    }
    // 다른 에러는 실패 처리
    return true
})