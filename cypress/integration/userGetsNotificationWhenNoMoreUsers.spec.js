/* eslint-disable no-undef */
// eslint-disable-next-line quotes
describe("User gets notified if there's no more users to load", () => {
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
    cy.scrollTo('bottom', { duration: 3000 });
    cy.scrollTo('bottom', { duration: 3000 });
    cy.scrollTo('bottom', { duration: 3000 });

    cy.get('#no-users').should('contain', 'There are no more users to load.');
  });
});
