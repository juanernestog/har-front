describe('empty spec', () => {
  it('login as client', () => {
    cy.visit('/login');
    
    cy.get('[href="/login/clients"]').click();

    cy.get('input[name="email"]').type('client1@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.contains('Client One');
  });
});
