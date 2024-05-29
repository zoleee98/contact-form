describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/');
	});
	it('passes', () => {
		cy.title().should('equal', 'Vite + TS');
	});
});
