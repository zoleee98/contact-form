import { errorMessage } from '../../src/data';

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

	it('should give an error message if validation fails on submit', () => {
		cy.get('button').contains('Submit').click();
		cy.get('[data-cy="firstname-error"]').should(
			'have.text',
			errorMessage.required
		);
		cy.get('[data-cy="lastname-error"]').should(
			'have.text',
			errorMessage.required
		);
		cy.get('[data-cy="email-error"]').should(
			'have.text',
			errorMessage.required
		);
		cy.get('[data-cy="querytype-error"]').should(
			'have.text',
			errorMessage.requiredQueryType
		);
		cy.get('[data-cy="message-error"]').should(
			'have.text',
			errorMessage.required
		);
		cy.get('[data-cy="consent-error"]').should(
			'have.text',
			errorMessage.requiredConsent
		);
	});

	it('should be accessible after submit', () => {
		cy.get('button').contains('Submit').click().checkA11y();
	});
});
