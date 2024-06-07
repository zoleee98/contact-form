describe('template spec', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('passes', () => {
		cy.title().should('equal', 'Vite + TS');
	});
});
