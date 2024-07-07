/**
 * A callback that can be passed to a component's `ref` prop.
 *
 * It will be called with the DOM node as the `instance` argument, and the returned cleanup function is called when the component is unmounted.
 * Older versions of React and Preact call the function with `null` when the component is unmounted and never call the cleanup function.
 *
 * @see https://react.dev/reference/react-dom/components/common#ref-callback
 */
export type RefCallback<T> = (instance: T | null) => void | (() => void);
