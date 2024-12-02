type SelectorType = '#' | '.' | '@' | '=' | '';

/**
 * Interface for selector results
 * @interface SelectorResult
 */
export interface SelectorResult {
  /** Array of matched elements */
  elements: Element[];
  /** Whether the selector matched a single element */
  single: boolean;
}

/**
 * Selector utility class
 * @class Selector
 */
export class Selector {
  private static readonly SELECTOR_TYPES: Record<SelectorType, string> = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '': 'querySelectorAll',
  };

  /**
   * Selects elements from the DOM
   * @param selector - CSS selector with optional prefix (#, ., @, =)
   * @returns Object containing matched elements and single flag
   * @example
   * ```ts
   * Selector.select('#myId')    // by ID
   * Selector.select('.myClass') // by class
   * Selector.select('@myName')  // by name
   * Selector.select('=div')     // by tag
   * ```
   */
  static select(selector: string): SelectorResult {
    const type = selector[0] as SelectorType;
    const value = selector.slice(1);
    const method = this.SELECTOR_TYPES[type] || this.SELECTOR_TYPES[''];

    let elements: Element[];
    const single = type === '#';

    if (method === 'getElementById') {
      const element = document[method](value) as HTMLElement;
      elements = element ? [element] : [];
    } else {
      type DocumentMethod = (selector: string) => HTMLCollection | NodeList | Element | null;
      const collection = (document as Document & Record<string, DocumentMethod>)[method](value);
      if (collection) {
        elements = Array.from(collection as HTMLCollection | NodeList).filter(
          (node): node is Element => node instanceof Element
        );
      } else {
        elements = [];
      }
    }

    return { elements, single };
  }
}
