/* eslint-disable no-undef */
describe('User can view specific user', () => {
  it('successfully', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://reqres.in/api/users/1',
      response: 'fixture:specificUser.json'
    });
    cy.visit('http://localhost:3000');

    cy.get('#users').within(() => {
      cy.get('#user-1').click();
    });
    cy.get('#user-first_name-1');
    cy.get('#user-last_name-1');
    cy.get('#user-email-1');
  });
});
