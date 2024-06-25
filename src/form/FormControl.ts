class FormControl<
	T extends
		| HTMLInputElement
		| HTMLTextAreaElement
		| HTMLSelectElement = HTMLInputElement
> {
	readonly element: T;
	readonly validationMessage: ValidationMessage;
	readonly errorFor?: HTMLElement;

	constructor(name: string, validationMessage: ValidationMessage = {}) {
		const inputElements = document.querySelectorAll(`[name=${name}]`);
		if (!inputElements[0]) throw new Error(`Cannot find input ${name}`);
		this.element = inputElements[0] as T;
		this.validationMessage = validationMessage;
		this.errorFor = document.querySelector(
			`[data-errorFor='${name}']`
		) as HTMLElement;

		for (const input of inputElements) {
			input.addEventListener('focus', () => {
				input.classList.add('touched');
				this.setErrorMessage('');
			});
			input.addEventListener('blur', () => {
				this.element.value = this.element.value.trim();
				this.validate();
			});
		}
	}

	get valid() {
		return this.element.validity.valid;
	}

	setErrorMessage(message: string) {
		if (!this.errorFor) return;
		this.errorFor.textContent = message;
	}

	getValidityType() {
		const validity = this.element.validity;
		for (const validityType in validity) {
			const state = validity[validityType as keyof typeof validity];
			if (state) return validityType as keyof ValidityState;
		}
		throw new Error('None of the validity state was true');
	}

	validate() {
		const message = this.validationMessage[this.getValidityType()];
		this.setErrorMessage(message ?? '');
		this.element.ariaInvalid = String(!this.valid);
	}

	markAsTouched() {
		this.element.classList.add('touched');
	}

	markAsUntouched() {
		this.element.classList.remove('touched');
	}
}

type ValidationMessage = Partial<Record<keyof ValidityState, string>>;

export { FormControl };
export type { ValidationMessage };
