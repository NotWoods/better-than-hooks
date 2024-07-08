import { buildRefAutoFocusFirstFocusable } from "@better-than-hooks/core";
import type { RefCallback } from "preact";
import { useMemo } from "preact/hooks";

/**
 * Build a ref callback that auto-focuses the first focusable element within the container.
 * @param findFirstFocusable A function to find the first focusable element within the container,
 * such as the first focusable list item.
 *
 * If you don't need to override the default `findFirstFocusable` behavior, you can use `autoFocusFirstFocusable` instead.
 *
 * @example
 * const findFirstFocusable = (container) => container.querySelector('button')
 * const Modal = ({ data }) => {
 *   const autoFocusFirstFocusable = useAutoFocusFirstFocusable(findFirstFocusable);
 *
 *   return (
 *     <dialog>
 *       <ul ref={autoFocusFirstFocusable}>
 *         {data.map((item) => <ListItem key={item.id}>{item.value}</ListItem>)}
 *       </ul>
 *     </dialog>
 *   );
 * }
 */
export function useAutoFocusFirstFocusable(
  findFirstFocusable?: (container: ParentNode) => HTMLElement | null
): RefCallback<ParentNode> {
  return useMemo(
    () => buildRefAutoFocusFirstFocusable(findFirstFocusable),
    [findFirstFocusable]
  );
}
