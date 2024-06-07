describe('contact-form', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.injectAxe();
	});

	it('should be accessible on load (A11y check)', () => {
		cy.checkA11y();
	});

	it('should be keyboard accessible', () => {
		// selectors must have this exact sequence otherwise test will fail
		const inputSelectors = [
			'#firstname',
			'#lastname',
			'#email',
			'#general',
			'#message',
			'#consent',
			'button',
		];
		cy.get(inputSelectors[0]).focus();
		for (const selector of inputSelectors) {
			cy.get(selector).should('be.focused');
			cy.realPress('Tab');
		}
	});
});
