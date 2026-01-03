declare global {
    namespace Cypress {
        interface Chainable {
            login(userId: string, password: string): Chainable<void>
        }
    }
}

// 로그인 헬퍼 함수
Cypress.Commands.add('login', (userId: string, password: string) => {
    cy.visit('/login')
    cy.get('input[name="user_id"]').type(userId)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
})

export {}