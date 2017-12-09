import Component from './Component';

export interface FormOptions {
	onSubmit?: (formData:FormInfo) => void;
	template: (templateData?:object) => string;
	shouldPreventDefaultSubmit?: boolean;
}

export interface FormInfo {
	action: string;
	method: string;
	body: FormData;
}

class Form extends Component<FormOptions> {
	private form:HTMLFormElement;

	/**
	 * Creates a new instance of form controller
	 * @param {FormOptions} options
	 * @param {*} templateParams
	 */
	constructor (options:FormOptions, templateParams?:object) {
		super(options);
		
		this.submitHandler = this.submitHandler.bind(this);
		this.form = this.render(templateParams) as HTMLFormElement;
		if (!this.form || this.form.tagName !== 'FORM') {
			throw new Error('Template should create a form element');
		}
		this.form.addEventListener('submit', this.submitHandler);
	}

	/**
	 * @returns {HTMLFormElement}
	 */
	public get element ():HTMLFormElement {
		return this.form;
	}

	/**
	 * Removes event listeners and links to objects
	 */
	public destroy ():void {
		this.form.removeEventListener('submit', this.submitHandler);
		delete this.form;
		delete this.options;
	}

	protected get defaultOptions ():FormOptions {
		return {
			shouldPreventDefaultSubmit: true,
			template: () => {throw new Error('Template function is required');}
		};
	}

	/**
	 * @returns {object} formData as a plane object
	 */
	private get formData () {
		const form = this.form;
		return (<any>Array).from(form.querySelectorAll('[name]'))
			.reduce((acc:FormInfo, elem:HTMLInputElement) => {
				const { name, value } = elem;
				if (name && typeof value !== 'undefined') {
					acc.body.append(name, value);
				}
				return acc;
			}, {
				action: form.action,
				method: form.method,
				body: new FormData()
			});
	}

	/**
	 * Listens to submit
	 * @param {Event} e
	 */
	private submitHandler (e:Event):void {
		if (this.options.shouldPreventDefaultSubmit) {
			e.preventDefault();
		}
		if (typeof this.options.onSubmit === 'function') {
			this.options.onSubmit(this.formData);
		}
	}
}

export default Form;
