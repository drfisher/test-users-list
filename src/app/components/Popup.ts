import Component from './Component';
import keyboard from '../tools/keyboard';

let html:HTMLHtmlElement;

export interface PopupOptions {
	// css class of "close" buttons
	cssModClose?: string;
	// a list of css classes which sould be ignored on "close" click
	cssModCloseIgnore?: string[];
	// css modificator for document.html when popup is active
	cssModHtmlFrized?: string;
	// css modificator for this.popup to show loading
	cssModLoading?: string;
	// css modificator for this.popup to show popup
	cssModVisible?: string;
	// selector of a container of popup's content
	cssSelContainer?: string;
	// a template which returns popup's html markup
	template: () => string
}

class Popup extends Component<PopupOptions> {
	private _container:HTMLElement;
	private popup:HTMLElement;

	constructor (options:PopupOptions) {
		super(options);

		if (!html) {
			html = document.querySelector('html') as HTMLHtmlElement;
		}

		this.popup = this.render() as HTMLElement;
		document.body.appendChild(this.popup);

		this.hide = this.hide.bind(this);
		this.onCloseClick = this.onCloseClick.bind(this);

		// Listen to events
		if (this.options.cssModClose) {
			this.popup.addEventListener('click', this.onCloseClick)
		}
		toggleEscapeButtonSubscription.call(this, true);
	}

	/**
	 * Removes all content from popup
	 * @returns {Popup}
	 */
	public clear ():Popup {
		this.container.innerHTML = '';
		return this;
	}

	/**
	 * Remove event listeners and popup itself
	 */
	public destroy () {
		const popup = this.popup;
		const popupParent = popup.parentElement;
		this.clear().hide();
		delete this.popup;
		popup.removeEventListener('click', this.onCloseClick);
		if (popupParent) {
			popupParent.removeChild(popup);
		}
	}

	/**
	 * Hides popup
	 */
	public hide ():Popup {
		const { cssModHtmlFrized, cssModVisible } = this.options;
		toggleEscapeButtonSubscription.call(this, false);
		cssModVisible && this.popup.classList.remove(cssModVisible);
		cssModHtmlFrized && html.classList.remove(cssModHtmlFrized);
		return this;
	}

	/**
	 * Shows passed element in an popup or just popup
	 * @param {HTMLElement|Promise<HTMLElement>} element
	 */
	public show (element:HTMLElement|Promise<HTMLElement>):Popup {
		const { cssModHtmlFrized, cssModVisible } = this.options;
		if (element) {
			this.toggleLoading(true);
			Promise.resolve(element).then(element => {
				this.clear();
				this.container.appendChild(element);
				this.toggleLoading(false);
			});
		}
		toggleEscapeButtonSubscription.call(this, true);
		cssModVisible && this.popup.classList.add(cssModVisible);
		cssModHtmlFrized && html.classList.add(cssModHtmlFrized);
		return this;
	}

	/**
	 * Toggles preloader
	 * @param {boolean} shouldShowLoading
	 * @returns {Popup}
	 */
	public toggleLoading (shouldShowLoading:boolean):Popup {
		const loadingMod = this.options.cssModLoading;
		if (loadingMod) {
			this.popup.classList.toggle(loadingMod, shouldShowLoading);
		}
		return this;
	}

	/**
	 * Checks if a popup is visible
	 * @returns {boolean}
	 */
	public get visible ():boolean {
		return this.popup.classList.contains(this.options.cssModVisible || '');
	}

	private get container ():HTMLElement {
		const cssSel = this.options.cssSelContainer;
		if (!this._container && cssSel) {
			const container = this.popup.querySelector(cssSel) as HTMLElement;
			this._container = container;
		}
		return this._container;
	}

	/**
	 * @param {MouseEvent} e
	 */
	private onCloseClick (e:MouseEvent):void {
		const { cssModClose, cssModCloseIgnore = []} = this.options;
		let target: HTMLElement = e.target as HTMLElement;
		let shouldClose = false;

		do {
			let classList = target.classList;
			if (classList.contains(cssModClose as string)) {
				shouldClose = true;
				break;
			}
			let shouldIgnore = cssModCloseIgnore.some(className => classList.contains(className));
			if (shouldIgnore) {
				// If target is in ignored container we should stop checkings
				break;
			}
			target = target.parentElement as HTMLElement;
		} while (target && target !== this.popup);

		if (shouldClose) {
			this.hide();
		}
	}

	protected get defaultOptions ():PopupOptions {
		return {
			cssModClose: 'js-overlay-close',
			cssModCloseIgnore: ['overlay__box'],
			cssModHtmlFrized: 'frized',
			cssModLoading: 'overlay_loading',
			cssModVisible: 'overlay_visible',
			cssSelContainer: '.js-overlay-content',
			template: () => {
				throw new Error('Template is required');
			}
		};
	}
}

/**
 * @this {Popup}
 * @param {boolean} shouldSubscribe
 */
function toggleEscapeButtonSubscription (shouldSubscribe:boolean):void {
	keyboard.subscribe(this.hide, {keyCode: 27, eventName: 'keydown'});
}

export default Popup;
