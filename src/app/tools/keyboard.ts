/**
 * A storage of all event listeners
 * @type {{}}
 */
const listeners = {};

const allowedEvents = ['keypress', 'keydown', 'keyup'];

/**
 * Add a new event listener
 * @param {string} eventName
 */
const listenTo = (eventName:string) => {
	const eventSpace = getEventSpace(eventName);
	if (!eventSpace.isListening) {
		document.addEventListener(eventName, eventHandler);
	}
};

/**
 * Common handler for all keyboard events
 * @param {KeyboardEvent} e
 */
const eventHandler = (e:KeyboardEvent) => {
	const {type, keyCode} = e;
	getKeyListeners(type, keyCode).forEach(handler => handler(e));
};

/**
 * Returns a structure for event name or creates it and returns
 * @param {string} eventName
 * @returns {object}
 */
const getEventSpace = (eventName:string) => {
	if (!listeners[eventName]) {
		listeners[eventName] = {
			isListening: false,
			keys: {}
		};
	}
	return listeners[eventName];
};

/**
 * Creates a structure for key ode in an event space
 * @param {string} eventName
 * @param {string} keyCode
 */
const getKeyListeners = (eventName:string, keyCode:number) => {
	const eventKeys = getEventSpace(eventName).keys;
	if (!eventKeys[keyCode]) {
		eventKeys[keyCode] = [];
	}
	return eventKeys[keyCode];
};

/**
 * Add new event handlers
 * @param {function} handler
 * @param {object} params
 */
export const subscribe = (handler:()=>any, params:HandlerParams):void => {
	const {keyCode, eventName = 'keypress'} = params;

	if (allowedEvents.indexOf(eventName) === -1) {
		console.error(`${eventName} is not allowed keyboard event`);
		return;
	}

	const eventListeners = getKeyListeners(eventName, keyCode);
	
	// TODO: we can use Set here instead of array:
	if (eventListeners.indexOf(handler) === -1) {
		eventListeners.push(handler);
	}
	listenTo(eventName);
};

/**
 * Removed event handler
 * @param {function} handler
 * @param {object} params
 */
export const unsubscribe = (handler:()=>any, params:HandlerParams):void => {
	const {keyCode, eventName = 'keypress'} = params;
	const handlers = getKeyListeners(eventName, keyCode);
	const handlerIndex = handlers.findIndex(handler);
	if (handlerIndex !== -1) {
		handlers.splice(handlerIndex, 1);
	}
};

export interface HandlerParams {
	// KeyboardEvent.keyCode
	keyCode: number;
	// KeyboardEvent.type
	eventName?: string;
}

export default { subscribe, unsubscribe }
