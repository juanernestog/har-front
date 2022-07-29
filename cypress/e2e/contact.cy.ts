//e2e testing of contact page
describe('Contact Page', () => {
  it('should be able to send a message', () => {
    cy.visit('/contact');

    cy.contains('¿Quienes somos?');
  });
});
