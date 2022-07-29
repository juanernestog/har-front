describe('About Page', () => {
  it('login as producer with wrong credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/about"]').click();

    cy.contains('¿Quienes somos?');
  });
});
