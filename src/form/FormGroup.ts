import { FormControl } from './';

class FormGroup {
	readonly controls: Record<string, FormControl>;

	constructor(controls: Record<string, FormControl>) {
		this.controls = controls;
	}

	get valid() {
		return Object.values(this.controls).every((control) => control.valid);
	}

	get(controlName: string): FormControl | null {
		return this.controls[controlName] ?? null;
	}

	validate() {
		for (const control of Object.values(this.controls)) {
			control.validate();
			control.element.classList.add('touched');
		}
	}
}

export { FormGroup };
