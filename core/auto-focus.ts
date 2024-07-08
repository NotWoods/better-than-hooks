/**
 * Auto-focus on this element when it is mounted.
 *
 * @example
 * const Modal = ({ handleClose }) => (
 *   <dialog>
 *     <button ref={autoFocus} onClick={handleClose}>Close</button>
 *   </dialog>
 * )
 */
export const autoFocus = (element: HTMLElement | null): void =>
  element?.focus();

/**
 * CSS selector to find focusable elements.
 * @see https://github.com/microsoft/tabster/blob/6bfd54a45f5b20eccd17b8a05f6c86c241b992c3/src/Focusable.ts#L17-L25
 */
const FOCUSABLE_CSS_SELECTOR = `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), *[tabindex], *[contenteditable]`;

/**
 * Build a ref callback that auto-focuses the first focusable element within the container.
 * @param findFirstFocusable A function to find the first focusable element within the container,
 * such as the first focusable list item.
 *
 * If you don't need to override the default `findFirstFocusable` behavior, you can use `autoFocusFirstFocusable` instead.
 *
 * @example
 * const autoFocusFirstFocusable = buildRefAutoFocusFirstFocusable((container) => container.querySelector('button'))
 *
 * const Modal = ({ data }) => (
 *   <dialog>
 *     <ul ref={autoFocusFirstFocusable}>
 *       {data.map((item) => <ListItem key={item.id}>{item.value}</ListItem>)}
 *     </ul>
 *   </dialog>
 * )
 */
export function buildRefAutoFocusFirstFocusable(
  findFirstFocusable: (container: ParentNode) => HTMLElement | null = (
    container
  ) => container.querySelector(FOCUSABLE_CSS_SELECTOR)
): (container: ParentNode | null) => void {
  return (container) => {
    if (container) {
      findFirstFocusable(container)?.focus();
    }
  };
}

/**
 * Find the first focusable element in the given container,
 * such as the first focusable list item.
 *
 * @example
 * const Modal = ({ data }) => (
 *   <dialog>
 *     <ul ref={autoFocusFirstFocusable}>
 *       {data.map((item) => <ListItem key={item.id}>{item.value}</ListItem>)}
 *     </ul>
 *   </dialog>
 * )
 */
export const autoFocusFirstFocusable = buildRefAutoFocusFirstFocusable();
