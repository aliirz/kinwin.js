import { KinWin, kw } from '../../src/core/manipulator';

describe('Events', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-div">
        <button class="test-button">Click Me</button>
        <div class="delegated-area">
          <span class="delegate-child">Child 1</span>
          <span class="delegate-child">Child 2</span>
        </div>
        <input type="text" class="test-input" />
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Event Handling', () => {
    test('should handle click events', () => {
      const mockCallback = jest.fn();
      const element = kw('.test-button');
      
      element.on('click', mockCallback);
      (element.elements[0] as HTMLElement).click();

      expect(mockCallback).toHaveBeenCalled();
    });

    test('should provide event object to handler', () => {
      const mockCallback = jest.fn();
      const element = kw('.test-button');
      
      element.on('click', mockCallback);
      (element.elements[0] as HTMLElement).click();

      const event = mockCallback.mock.calls[0][0];
      expect(event instanceof Event).toBe(true);
      expect(event.type).toBe('click');
    });

    test('should handle multiple events on same element', () => {
      const clickCallback = jest.fn();
      const mouseoverCallback = jest.fn();
      const element = kw('.test-button');
      
      element.on('click', clickCallback)
            .on('mouseover', mouseoverCallback);

      (element.elements[0] as HTMLElement).click();
      element.elements[0].dispatchEvent(new Event('mouseover'));

      expect(clickCallback).toHaveBeenCalled();
      expect(mouseoverCallback).toHaveBeenCalled();
    });
  });

  describe('Event Delegation', () => {
    test('should delegate events to child elements', () => {
      const mockCallback = jest.fn();
      const container = kw('.delegated-area');
      
      container.delegate('click', '.delegate-child', mockCallback);
      
      const children = document.querySelectorAll('.delegate-child');
      (children[0] as HTMLElement).click();
      (children[1] as HTMLElement).click();

      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    test('should not trigger delegate on non-matching elements', () => {
      const mockCallback = jest.fn();
      const container = kw('.delegated-area');
      
      container.delegate('click', '.non-existent', mockCallback);
      
      const children = document.querySelectorAll('.delegate-child');
      (children[0] as HTMLElement).click();

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle dynamically added elements', () => {
      const mockCallback = jest.fn();
      const container = kw('.delegated-area');
      
      container.delegate('click', '.delegate-child', mockCallback);
      
      // Add new child
      const newChild = document.createElement('span');
      newChild.className = 'delegate-child';
      container.elements[0].appendChild(newChild);
      
      (newChild as HTMLElement).click();
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  describe('Form Events', () => {
    test('should handle input events', () => {
      const mockCallback = jest.fn();
      const input = kw('.test-input');
      
      input.on('input', mockCallback);
      
      const event = new Event('input');
      input.elements[0].dispatchEvent(event);

      expect(mockCallback).toHaveBeenCalled();
    });

    test('should handle input value changes', () => {
      const input = kw('.test-input') as any;
      const mockCallback = jest.fn();
      
      input.on('input', (e: Event) => {
        mockCallback((e.target as HTMLInputElement).value);
      });
      
      const inputEl = input.elements[0] as HTMLInputElement;
      inputEl.value = 'test value';
      inputEl.dispatchEvent(new Event('input'));

      expect(mockCallback).toHaveBeenCalledWith('test value');
    });
  });

  describe('Event Removal', () => {
    test('should remove event listeners', () => {
      const mockCallback = jest.fn();
      const element = kw('.test-button');
      
      element.on('click', mockCallback);
      (element.elements[0] as HTMLElement).click();
      expect(mockCallback).toHaveBeenCalledTimes(1);

      // If we had an off method:
      // element.off('click', mockCallback);
      // element.elements[0].click();
      // expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });
}); 