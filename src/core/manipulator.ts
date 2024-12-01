import { Selector } from './selector';
import { Animation } from './animation';
import { Http } from './http';

/**
 * Main KinWin class for DOM manipulation
 * @class KinWin
 */
export class KinWin {
  /** Array of selected DOM elements */
  public elements: Element[];
  /** Whether the selection contains a single element */
  private isSingle: boolean;

  /**
   * Creates a new KinWin instance
   * @param selectorOrElements - CSS selector string or Element(s)
   */
  constructor(selectorOrElements: string | Element | Element[]) {
    if (typeof selectorOrElements === 'string') {
      const { elements, single } = Selector.select(selectorOrElements);
      this.elements = elements;
      this.isSingle = single;
    } else {
      this.elements = Array.isArray(selectorOrElements) 
        ? selectorOrElements 
        : [selectorOrElements];
      this.isSingle = !Array.isArray(selectorOrElements);
    }
  }

  /**
   * Gets or sets element attributes
   * @param name - Attribute name or object of attributes
   * @param value - Optional value to set
   * @returns Current attribute value or chainable instance
   * @example
   * ```ts
   * kw('#myId').attr('title')              // get title
   * kw('#myId').attr('title', 'New')       // set title
   * kw('#myId').attr({ title: 'New' })     // set multiple
   * ```
   */
  attr(name: string): string | null;
  attr(name: string, value: string): this;
  attr(name: Record<string, string>): this;
  attr(name: string | Record<string, string>, value?: string): string | null | this {
    if (typeof name === 'string' && value === undefined) {
      return this.elements[0]?.getAttribute(name) ?? null;
    }

    this.elements.forEach(element => {
      if (typeof name === 'string') {
        element.setAttribute(name, value!);
      } else {
        Object.entries(name).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });
      }
    });

    return this;
  }

  // Modern HTML manipulation
  html(): string;
  html(content: string): this;
  html(content?: string): string | this {
    if (content === undefined) {
      return this.elements[0]?.innerHTML ?? '';
    }

    this.elements.forEach(element => {
      element.innerHTML = content;
    });

    return this;
  }

  // Modern class manipulation
  addClass(className: string): this {
    this.elements.forEach(element => {
      element.classList.add(className);
    });
    return this;
  }

  removeClass(className: string): this {
    this.elements.forEach(element => {
      element.classList.remove(className);
    });
    return this;
  }

  // Modern event handling
  on<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void
  ): this {
    this.elements.forEach(element => {
      element.addEventListener(event, handler as EventListener);
    });
    return this;
  }

  // Find children
  children(): KinWin {
    const elements = this.elements.flatMap(el => Array.from(el.children));
    return new KinWin(elements);
  }

  // Find parent
  parent(): KinWin {
    const elements = this.elements
      .map(el => el.parentElement)
      .filter((el): el is HTMLElement => el !== null)
      .filter(Boolean);
    return new KinWin(elements);
  }

  // Find siblings
  siblings(): KinWin {
    const elements = this.elements.flatMap(el => 
      Array.from(el.parentElement?.children || [])
        .filter(sibling => sibling !== el)
    ).filter(Boolean);
    return new KinWin(elements);
  }

  // Find closest ancestor matching selector
  closest(selector: string): KinWin {
    const elements = this.elements
      .map(el => el.closest(selector))
      .filter((el): el is HTMLElement => el !== null);
    return new KinWin(elements);
  }

  toggleClass(className: string): this {
    this.elements.forEach(el => el.classList.toggle(className));
    return this;
  }

  hasClass(className: string): boolean {
    return this.elements.some(el => el.classList.contains(className));
  }

  /**
   * Hides the selected elements
   * @returns this for chaining
   * @example
   * ```ts
   * kw('#myElement').hide();
   * ```
   */
  hide(): this {
    this.elements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    return this;
  }

  /**
   * Shows the selected elements
   * @returns this for chaining
   * @example
   * ```ts
   * kw('#myElement').show();
   * ```
   */
  show(): this {
    this.elements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
    return this;
  }

  delegate(eventType: string, selector: string, handler: (event: Event) => void): this {
    this.elements.forEach(el => {
      el.addEventListener(eventType, (e) => {
        const target = e.target as Element;
        if (target.matches(selector)) {
          handler(e);
        }
      });
    });
    return this;
  }
}

// Factory function
export const kw = (selector: string | Element | Element[]): KinWin => new KinWin(selector); 