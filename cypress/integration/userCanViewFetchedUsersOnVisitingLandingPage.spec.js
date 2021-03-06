/* eslint-disable no-undef */
describe('User can view fetched users when visiting landing page', () => {
  it('successfully', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=1',
      response: 'fixture:users.json'
    });
    cy.visit('http://localhost:3000');

    cy.get('#users').within(() => {
      cy.get('#user-1').within(() => {
        cy.get('#name-1').should('contain', 'Michael');
        cy.get('#name-1').should('contain', 'Lawson');
      });
    });
  });
});
