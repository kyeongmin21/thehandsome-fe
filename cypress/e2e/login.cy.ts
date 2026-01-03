
describe('로그인 페이지', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    describe('페이지 렌더링', () => {
        it('로그인 폼이 제대로 표시된다', () => {
            cy.contains('h1', '로그인').should('be.visible')
            cy.get('input[name="user_id"]').should('be.visible')
            cy.get('input[name="password"]').should('be.visible')
            cy.get('button[type="submit"]').should('be.visible')
        })

        it('회원가입 및 아이디 찾기 링크가 있다', () => {
            cy.contains('a', '회원가입').should('have.attr', 'href', '/join')
            cy.contains('a', '아이디 찾기').should('have.attr', 'href', '/find-id')
        })
    })

    describe('유효성 검사', () => {
        it('빈 값으로 제출할 수 없다', () => {
            cy.get('button[type="submit"]').should('be.disabled')
        })

        it('아이디만 입력하면 버튼이 비활성화된다', () => {
            cy.get('input[name="user_id"]').type('testuser')
            cy.get('button[type="submit"]').should('be.disabled')
        })

        it('비밀번호만 입력하면 버튼이 비활성화된다', () => {
            cy.get('input[name="password"]').type('password123')
            cy.get('button[type="submit"]').should('be.disabled')
        })

        it('아이디와 비밀번호를 모두 입력하면 버튼이 활성화된다', () => {
            cy.get('input[name="user_id"]').type('testuser')
            cy.get('input[name="password"]').type('password123')
            cy.get('button[type="submit"]').should('not.be.disabled')
        })

        it('버튼 색상이 입력 상태에 따라 변경된다', () => {
            // 초기 상태 - gray
            cy.get('button[type="submit"]').should('be.disabled').and('have.class', 'bg-gray-300')

            // 입력 후 - black
            cy.get('input[name="user_id"]').type('testuser')
            cy.get('input[name="password"]').type('password123')
            cy.get('button[type="submit"]').should('not.be.disabled').and('not.have.class', 'bg-gray-300')
        })
    })

    describe('로그인 시도', () => {
        it('성공적으로 로그인한다', () => {
            cy.get('input[name="user_id"]').type('testuser');
            cy.get('input[name="password"]').type('testPass1234');
            cy.get('button[type="submit"]').should('not.be.disabled').click();
            cy.on('window:alert', (text) => {
                expect(text).to.contains('로그인 되었습니다.');
            });
        });


        it('네트워크 오류 시 적절한 메시지를 표시한다', () => {
            cy.intercept('POST', '/api/auth/callback/credentials', {
                forceNetworkError: true
            }).as('networkError')

            cy.get('input[name="user_id"]').type('testuser')
            cy.get('input[name="password"]').type('password123')
            cy.get('button[type="submit"]').click()

            cy.on('window:alert', (text) => {
                expect(text).to.contains('로그인 처리 중 오류가 발생했습니다')
            })
        })
    })

    describe('내비게이션', () => {
        it('회원가입 버튼 클릭 시 회원가입 페이지로 이동한다', () => {
            cy.contains('a', '회원가입').click()
            cy.url().should('include', '/join')
        })

        it('아이디 찾기 링크 클릭 시 아이디 찾기 페이지로 이동한다', () => {
            cy.contains('a', '아이디 찾기').click()
            cy.url().should('include', '/find-id')
        })
    })

    describe('접근성', () => {
        it('모든 인터랙티브 요소에 적절한 aria-label이 있다', () => {
            cy.get('a[aria-label="회원가입 이동"]').should('exist')
            cy.get('a[aria-label="아이디 찾기로 이동"]').should('exist')
        })

        it('키보드로 폼의 주요 요소를 탐색할 수 있다', () => {
            // 아이디 -> 비밀번호만 테스트
            cy.get('input[name="user_id"]').click()
            cy.focused().should('have.attr', 'name', 'user_id')

            cy.realPress('Tab')
            cy.focused().should('have.attr', 'name', 'password')
        })

    })
})