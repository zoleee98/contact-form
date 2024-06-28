import { FormControl } from './form/FormControl';
import { FormGroup } from './form/FormGroup';
import { errorMessage } from './data';
import checkmark from './assets/images/icon-success-check.svg';

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
const snackbar = document.querySelector('.snackbar') as HTMLElement;

form.addEventListener('submit', handleSubmit);

document.addEventListener('keyup', (e) => {
	if (e.key == 'Escape') {
		snackbar.classList.remove('show');
	}
});

document
	.querySelector('label[for="consent"]')
	?.addEventListener('mousedown', (e) => {
		e.preventDefault();
	});

function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	formGroup.validate();
	if (!formGroup.valid) return;
	form.reset();
	formGroup.markAllAsUntouched();
	snackbar.innerHTML = `
		<div class="snackbar-header">
			<img
				src="${checkmark}"
				alt="Checkmark"
				aria-hidden="true"
			/>
			Message Sent!
		</div>
		<div class="snackbar-body">
			Thanks for completing the form. We'll be in touch soon!
		</div>
	`;
	snackbar.classList.add('show');
}
