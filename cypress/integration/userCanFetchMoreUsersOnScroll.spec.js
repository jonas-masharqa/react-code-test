/* eslint-disable no-undef */
describe('User can load more users on scroll', () => {
  it('successfully', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=1',
      response: 'fixture:users.json'
    });
    cy.route({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      response: 'fixture:scrolledUsers.json'
    });

    cy.visit('http://localhost:3000');

    cy.scrollTo('bottom', { duration: 3000 });

    cy.get('#user-1').within(() => {
      cy.get('#name-1').should('contain', 'Michael');
      cy.get('#name-1').should('contain', 'Lawson');
    });

    cy.scrollTo('bottom', { duration: 3000 });

    cy.get('#user-7').within(() => {
      cy.get('#name-7').should('contain', 'Michael');
      cy.get('#name-7').should('contain', 'Lawson');
    });
    cy.get('#user-8');
    cy.get('#user-9');
    cy.get('#user-10');
    cy.get('#user-11');
    cy.get('#user-12');
  });
});
