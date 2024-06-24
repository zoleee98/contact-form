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
		const controls = Object.values(this.controls);
		for (const control of controls) {
			control.validate();
			control.element.classList.add('touched');
		}
		controls.find((control) => !control.valid)?.element.focus();
	}
}

export { FormGroup };
