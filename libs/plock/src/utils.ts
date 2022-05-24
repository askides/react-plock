/**
 * Thanks to Chakra UI
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/main/packages/utils/src/dom.ts
 */
export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const isBrowser: boolean = canUseDOM();
