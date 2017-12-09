export interface ComponentOptions<T> {
    template: (templateParams?: object) => T;
}
/**
 * An abstract class with basic capabilities
 */
declare class Component<O extends ComponentOptions<any>> {
    protected options: O;
    constructor(options: O);
    /**
     * @returns {O}
     */
    protected readonly defaultOptions: O;
    protected render(templateParams?: object): Element;
}
export default Component;
