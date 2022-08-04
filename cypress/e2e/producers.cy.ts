describe('Producer', () => {
  it('login as producer with wrong credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');
    
    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json)=>{
      cy.get('input[name="email"]').type(json.email);
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.contains('Email or password are invalid');
    })
  });

  it('login as producer with correct credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');
    
    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json)=>{
      cy.get('input[name="email"]').type(json.email);
    cy.get('input[name="password"]').type(json.password);
    cy.get('button[type="submit"]').click();

    cy.contains(json.name);
    })
  });
})
