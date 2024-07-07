import { assertStrictEquals, assertNotStrictEquals } from "@std/assert";
import { renderHook } from "@testing-library/preact";
import { createRef, type RefObject } from "preact";
import { useRef } from "preact/hooks";
import "../mock_document.ts";
import { useMergedRefs } from "./useMergedRefs.ts";

Deno.test("always returns the same ref (refs should be immutable)", () => {
  const refFunc = () => null;
  const { result, rerender } = renderHook(() => useMergedRefs(refFunc));
  const firstRefValue = result.current;

  rerender();
  assertStrictEquals(firstRefValue, result.current);
});

Deno.test("always mutates the ref when 1 or more merged refs mutate", () => {
  const { result, rerender } = renderHook(() =>
    useMergedRefs<boolean>(() => ({}))
  );
  const firstRefValue = result.current;

  rerender();

  assertNotStrictEquals(result.current, firstRefValue);
});

Deno.test("updates all provided refs", () => {
  const refObject: RefObject<boolean> = createRef<boolean>();
  let refValue: boolean | null = null;

  const { result } = renderHook(() =>
    useMergedRefs<boolean>(refObject, (val) => (refValue = val))
  );
  result.current(true);

  assertStrictEquals(refObject.current, true);
  assertStrictEquals(refValue, true);
});

Deno.test("updates the current property", () => {
  const { result } = renderHook(() =>
    useMergedRefs(useRef<string>(""), useRef<string>(""))
  );
  result.current("123");

  assertStrictEquals(result.current.current, "123");
});

Deno.test("reuses the same ref callback if refs remain stable", () => {
  const refObject: RefObject<boolean> = createRef<boolean>();
  const refValueFunc = (_val: boolean | null) => {};
  const { result, rerender } = renderHook(() =>
    useMergedRefs<boolean>(refObject, refValueFunc)
  );
  const firstRefCallback = result.current;

  rerender();

  assertStrictEquals(result.current, firstRefCallback);
});

Deno.test("handles changing ref callbacks", () => {
  const refObject: RefObject<boolean> = createRef<boolean>();
  let firstRefValue: boolean | null = null;
  let refValueFunc = (val: boolean | null) => (firstRefValue = val);
  const { result, rerender } = renderHook(() =>
    useMergedRefs<boolean>(refObject, refValueFunc)
  );
  result.current(true);

  let secondRefValue: boolean | null = null;
  refValueFunc = (val: boolean | null) => (secondRefValue = val);
  rerender();
  result.current(true);

  assertStrictEquals(firstRefValue, true);
  assertStrictEquals(secondRefValue, true);
});
