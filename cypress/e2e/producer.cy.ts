//e2e testing of producer page
describe('Producer Page', () => {
  it('login as producer with wrong credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json) => {
      cy.get('input[name="email"]').type(json.email);
      cy.get('input[name="password"]').type('1234');
      cy.get('button[type="submit"]').click();

      cy.contains('Email or password are invalid');
    });
  });

  it('login as producer with correct credentials', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json) => {
      cy.get('input[name="email"]').type(json.email);
      cy.get('input[name="password"]').type(json.password);
      cy.get('button[type="submit"]').click();

      cy.contains('Producer Dashboard');
    });
  });

  it('should be able to add a new product', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json) => {
      cy.get('input[name="email"]').type(json.email);
      cy.get('input[name="password"]').type(json.password);
      cy.get('button[type="submit"]').click();

      cy.get('[href="/producer/products/add"]').click();

      cy.get('input[name="name"]').type('Test Product');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="description"]').type('Test Description');
      cy.get('input[name="image"]').type(
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      );
      cy.get('button[type="submit"]').click();

      cy.contains('Test Product');
    });
  });

  it('should be able to edit a product', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json) => {
      cy.get('input[name="email"]').type(json.email);
      cy.get('input[name="password"]').type(json.password);
      cy.get('button[type="submit"]').click();

      cy.get('[href="/producer/products/add"]').click();

      cy.get('input[name="name"]').type('Test Product');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="description"]').type('Test Description');
      cy.get('input[name="image"]').type(
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      );
      cy.get('button[type="submit"]').click();

      cy.get('[href="/producer/products/1/edit"]').click();

      cy.get('input[name="name"]').type('Test Product Edited');
      cy.get('input[name="price"]').type('2000');
      cy.get('input[name="description"]').type('Test Description Edited');
      cy.get('input[name="image"]').type(
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      );
      cy.get('button[type="submit"]').click();

      cy.contains('Test Product Edited');
    });
  });

  it('should be able to delete a product', () => {
    cy.visit('/logout');
    cy.visit('/login');

    cy.get('[href="/login/producers"]').click();

    cy.fixture('producer.json').then((json) => {
      cy.get('input[name="email"]').type(json.email);
      cy.get('input[name="password"]').type(json.password);
      cy.get('button[type="submit"]').click();

      cy.get('[href="/producer/products/add"]').click();

      cy.get('input[name="name"]').type('Test Product');
      cy.get('input[name="price"]').type('1000');
      cy.get('input[name="description"]').type('Test Description');
      cy.get('input[name="image"]').type(
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      );
      cy.get('button[type="submit"]').click();

      cy.get('[href="/producer/products/1/delete"]').click();

      cy.contains('Test Product').should('not.exist');
    });
  });
});
