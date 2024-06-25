import { FormControl } from './form/FormControl';
import { FormGroup } from './form/FormGroup';
import { errorMessage } from './data';

const form = document.querySelector('form')!;
const formGroup = new FormGroup({
	firstname: new FormControl('firstname', {
		valueMissing: errorMessage.requiredField,
	}),
	lastname: new FormControl('lastname', {
		valueMissing: errorMessage.requiredField,
	}),
	email: new FormControl('email', {
		valueMissing: errorMessage.requiredField,
		typeMismatch: errorMessage.invalidEmail,
	}),
	querytype: new FormControl('querytype', {
		valueMissing: errorMessage.requiredQueryType,
	}),
	message: new FormControl('message', {
		valueMissing: errorMessage.requiredField,
	}),
	consent: new FormControl('consent', {
		valueMissing: errorMessage.requiredConsent,
	}),
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	formGroup.validate();
	if (!formGroup.valid) return;
	form.reset();
	formGroup.markAllAsUntouched();
});

document
	.querySelector('label[for="consent"]')
	?.addEventListener('mousedown', (e) => {
		e.preventDefault();
	});
