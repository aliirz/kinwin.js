import { KinWin, kw } from '../../src/core/manipulator';

describe('KinWin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-div" class="initial-class">
        <span>Initial Content</span>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('attr()', () => {
    test('should get attribute value', () => {
      const element = kw('#test-div');
      expect(element.attr('class')).toBe('initial-class');
    });

    test('should set single attribute', () => {
      const element = kw('#test-div');
      element.attr('title', 'Test Title');
      expect(document.getElementById('test-div')?.getAttribute('title'))
        .toBe('Test Title');
    });

    test('should set multiple attributes', () => {
      const element = kw('#test-div');
      element.attr({
        'data-test': 'test',
        'title': 'Test Title'
      });
      
      const div = document.getElementById('test-div');
      expect(div?.getAttribute('data-test')).toBe('test');
      expect(div?.getAttribute('title')).toBe('Test Title');
    });
  });

  describe('html()', () => {
    test('should get HTML content', () => {
      const element = kw('#test-div');
      const content = element.html();
      expect(content.trim()).toBe('<span>Initial Content</span>');
    });

    test('should set HTML content', () => {
      const element = kw('#test-div');
      element.html('<p>New Content</p>');
      expect(document.getElementById('test-div')?.innerHTML.trim())
        .toBe('<p>New Content</p>');
    });
  });

  describe('Class manipulation', () => {
    test('should add class', () => {
      const element = kw('#test-div');
      element.addClass('new-class');
      expect(document.getElementById('test-div')?.classList.contains('new-class'))
        .toBe(true);
    });

    test('should remove class', () => {
      const element = kw('#test-div');
      element.removeClass('initial-class');
      expect(document.getElementById('test-div')?.classList.contains('initial-class'))
        .toBe(false);
    });
  });

  describe('Event handling', () => {
    test('should handle events', () => {
      const element = kw('#test-div');
      const mockCallback = jest.fn();
      
      element.on('click', mockCallback);
      document.getElementById('test-div')?.click();
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });
}); 