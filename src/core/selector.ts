type SelectorType = '#' | '.' | '@' | '=' | '';

export interface SelectorResult {
  elements: Element[];
  single: boolean;
}

export class Selector {
  private static readonly SELECTOR_TYPES: Record<SelectorType, string> = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '': 'querySelectorAll'
  };

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
      const collection = (document as any)[method](value);
      elements = Array.from(collection);
    }

    return { elements, single };
  }
} 