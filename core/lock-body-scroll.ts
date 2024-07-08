/**
 * Temporarily disable scrolling on the document body while the referenced component is mounted.
 *
 * This can be beneficial in scenarios where you want to restrict scrolling
 * while displaying a modal, a dropdown menu, or any other component that requires the user’s focus.
 *
 * Once the referenced component is unmounted or no longer needed,
 * the callback returns a cleanup function that restores the original overflow style,
 * ensuring that the scroll behavior is reverted to its previous state.
 *
 * @example
 * const Modal = () => (
 *   <dialog ref={lockBodyScroll}>
 *     <h2>Modal</h2>
 *   </dialog>
 * )
 */
export function lockBodyScroll(): () => void {
  const originalStyle = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = originalStyle;
  };
}
