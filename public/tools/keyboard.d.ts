/**
 * Add new event handlers
 * @param {function} handler
 * @param {object} params
 */
export declare const subscribe: (handler: () => any, params: HandlerParams) => void;
/**
 * Removed event handler
 * @param {function} handler
 * @param {object} params
 */
export declare const unsubscribe: (handler: () => any, params: HandlerParams) => void;
export interface HandlerParams {
    keyCode: number;
    eventName?: string;
}
declare const _default: {
    subscribe: (handler: () => any, params: HandlerParams) => void;
    unsubscribe: (handler: () => any, params: HandlerParams) => void;
};
export default _default;
