import Component from './Component';
export interface FormOptions {
    onSubmit?: (formData: FormInfo) => void;
    template: (templateData?: object) => string;
    shouldPreventDefaultSubmit?: boolean;
}
export interface FormInfo {
    action: string;
    method: string;
    body: FormData;
}
declare class Form extends Component<FormOptions> {
    private form;
    /**
     * Creates a new instance of form controller
     * @param {FormOptions} options
     * @param {*} templateParams
     */
    constructor(options: FormOptions, templateParams?: object);
    /**
     * @returns {HTMLFormElement}
     */
    readonly element: HTMLFormElement;
    /**
     * Removes event listeners and links to objects
     */
    destroy(): void;
    protected readonly defaultOptions: FormOptions;
    /**
     * @returns {object} formData as a plane object
     */
    private readonly formData;
    /**
     * Listens to submit
     * @param {Event} e
     */
    private submitHandler(e);
}
export default Form;
