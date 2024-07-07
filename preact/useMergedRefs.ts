import type { Ref, RefObject } from "preact";
import { useCallback } from "preact/hooks";

/**
 * A Ref function which can be treated like a ref object in that it has an attached
 * current property, which will be updated as the ref is evaluated.
 */
export type RefObjectFunction<T> = RefObject<T> & ((value: T) => void);

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs - Refs to collectively update with one ref value.
 * @returns A function with an attached "current" prop, so that it can be treated like a RefObject.
 *
 * Ported from the Fluent UI library.
 * @see https://github.com/microsoft/fluentui/blob/400cd5a243536dc82a7d34de17eebc896de66dc6/packages/react-components/react-utilities/src/hooks/useMergedRefs.ts
 */
export function useMergedRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefObjectFunction<T> {
  const mergedCallback: RefObjectFunction<T> = useCallback(
    (value: T): void => {
      // Update the "current" prop hanging on the function.
      mergedCallback.current = value;

      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          ref.current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs]
  ) as RefObjectFunction<T>;

  return mergedCallback;
}
