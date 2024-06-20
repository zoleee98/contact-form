const errorMessage = {
	requiredField: 'This field is required',
	requiredQueryType: 'Please select a query type',
	requiredConsent: 'To submit this form, please consent to being contacted',
	invalidEmail: 'Please enter a valid email address',
} as const;

const defaultError = {
	firstname: errorMessage.requiredField,
	lastname: errorMessage.requiredField,
	email: errorMessage.requiredField,
	querytype: errorMessage.requiredQueryType,
	message: errorMessage.requiredField,
	consent: errorMessage.requiredConsent,
} as const;

describe('contact-form', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.injectAxe();
	});

	it('should be accessible on load (A11y check)', () => {
		cy.checkA11y();
	});

	it('should not show any errors on load', () => {
		cy.get('[data-errorFor]').each((errorFor) => {
			cy.wrap(errorFor).should('have.text', '');
		});
	});

	it('should be keyboard accessible', () => {
		cy.get('#firstname').focus();
		cy.get(
			'#firstname, #lastname, #email, #general, #message, #consent'
		).each((input) => {
			cy.wrap(input).should('be.focused').realPress('Tab');
		});
	});

	it('should give an error message if validation fails on submit', () => {
		cy.get('button').contains('Submit').click();
		cy.get(
			'#firstname, #lastname, #email, #general, #message, #consent'
		).each((input) => {
			cy.wrap(input)
				.invoke('attr', 'name')
				.then((name) => {
					cy.get(`[data-errorFor='${name}']`).should(
						'have.text',
						defaultError[name as keyof typeof defaultError]
					);
				});
		});
	});

	it('should give an error message on blur', () => {
		cy.get(
			'#firstname, #lastname, #email, #general, #message, #consent'
		).each((input) => {
			cy.wrap(input)
				.focus()
				.blur()
				.invoke('attr', 'name')
				.then((name) => {
					cy.get(`[data-errorFor='${name}']`).should(
						'have.text',
						defaultError[name as keyof typeof defaultError]
					);
				});
		});
	});

	it('should give an error message for wrong email format', () => {
		cy.get('#email').type('botya#protonmail.com').realPress('Tab');
		cy.get('[data-errorFor="email"]').should(
			'have.text',
			errorMessage.invalidEmail
		);
	});

	it('should have input class `touched` when focused', () => {
		cy.get(
			'#firstname, #lastname, #email, #querytype, #message, #consent'
		).each((input) => {
			cy.wrap(input).focus().should('have.class', 'touched');
		});
	});

	it('should be accessible after clicking submit', () => {
		cy.get('button').contains('Submit').click().checkA11y();
	});
});
