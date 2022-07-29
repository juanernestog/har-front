// e2e test of home page
describe('Home Page', () => {
  it('product card should be visible', () => {
    cy.visit('/');

    cy.get('[data-testid="product-card"]').should('be.visible');
  });
});
