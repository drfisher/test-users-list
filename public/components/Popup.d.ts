import Component from './Component';
export interface PopupOptions {
    cssModClose?: string;
    cssModCloseIgnore?: string[];
    cssModHtmlFrized?: string;
    cssModLoading?: string;
    cssModVisible?: string;
    cssSelContainer?: string;
    template: () => string;
}
declare class Popup extends Component<PopupOptions> {
    private _container;
    private popup;
    constructor(options: PopupOptions);
    /**
     * Removes all content from popup
     * @returns {Popup}
     */
    clear(): Popup;
    /**
     * Remove event listeners and popup itself
     */
    destroy(): void;
    /**
     * Hides popup
     */
    hide(): Popup;
    /**
     * Shows passed element in an popup or just popup
     * @param {HTMLElement|Promise<HTMLElement>} element
     */
    show(element: HTMLElement | Promise<HTMLElement>): Popup;
    /**
     * Toggles preloader
     * @param {boolean} shouldShowLoading
     * @returns {Popup}
     */
    toggleLoading(shouldShowLoading: boolean): Popup;
    /**
     * Checks if a popup is visible
     * @returns {boolean}
     */
    readonly visible: boolean;
    private readonly container;
    /**
     * @param {MouseEvent} e
     */
    private onCloseClick(e);
    protected readonly defaultOptions: PopupOptions;
}
export default Popup;
