import elemFromString from '../tools/elemFromString';

export interface ComponentOptions<T> {
	template: (templateParams?:object) => T;
}

/**
 * An abstract class with basic capabilities
 */
class Component<O extends ComponentOptions<any>> {
	protected options: O;

	constructor (options:O) {
		this.options = (<any>Object).assign(this.defaultOptions, options);
	}

	/**
	 * @returns {O}
	 */
	protected get defaultOptions ():O {
		return {
			template: () => {}
		} as O;
	}

	protected render (templateParams?:object):Element {
		return elemFromString(this.options.template(templateParams));
	}
}

export default Component;
