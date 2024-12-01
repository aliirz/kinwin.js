import { Selector } from './selector';

export class KinWin {
  private elements: Element[];
  private isSingle: boolean;

  constructor(selector: string) {
    const { elements, single } = Selector.select(selector);
    this.elements = elements;
    this.isSingle = single;
  }

  // Modern attribute handling with type safety
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
}

// Factory function
export const kw = (selector: string): KinWin => new KinWin(selector); 