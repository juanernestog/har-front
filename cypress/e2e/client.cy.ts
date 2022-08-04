describe('Client', () => {
  it('login as client with wrong credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');
    
    cy.get('[href="/login/clients"]').click();

    cy.fixture('client.json').then((json)=>{
      cy.get('input[name="email"]').type(json.email);
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.contains('Email or password are invalid');
    })
  });

  it('login as client with correct credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');
    
    cy.get('[href="/login/clients"]').click();

    cy.fixture('client.json').then((json)=>{
      cy.get('input[name="email"]').type(json.email);
    cy.get('input[name="password"]').type(json.password);
    cy.get('button[type="submit"]').click();

    cy.contains(json.name);
    })
  });

  it('manipulate cart', () => {
    cy.visit('/login');
    
    cy.get('[href="/login/clients"]').click();

    cy.fixture('client.json').then((json)=>{
      cy.get('input[name="email"]').type(json.email);
    cy.get('input[name="password"]').type(json.password);
    cy.get('button[type="submit"]').click();
    })

    cy.get(':nth-child(1) > .text-center > .card-body > form > .mb-3 > .form-control').type('2');
    cy.get(':nth-child(1) > .text-center > .card-body > form > .btn').click();

    cy.get('.nav > .d-flex').contains('1');

    cy.get(':nth-child(2) > .text-center > .card-body > form > .mb-3 > .form-control').type('3');
    cy.get(':nth-child(2) > .text-center > .card-body > form > .btn').click();

    cy.get('.nav > .d-flex').contains('2');

    cy.get(':nth-child(3) > .text-center > .card-body > form > .mb-3 > .form-control').type('3');
    cy.get(':nth-child(3) > .text-center > .card-body > form > .btn').click();

    cy.get('.nav > .d-flex').contains('3');

    cy.get('.nav > .d-flex').click();

    cy.get(':nth-child(1) > .text-center > .card-body > .btn').click();

    cy.get('.nav > .d-flex').contains('2');

    cy.get('.btn-primary').click();
  });
  
});
