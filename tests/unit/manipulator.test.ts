import { KinWin, kw } from '../../src/core/manipulator';

describe('KinWin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-div" class="initial-class">
        <span>Initial Content</span>
        <div class="child">Child 1</div>
        <div class="child">Child 2</div>
      </div>
      <div class="sibling">Sibling</div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Constructor', () => {
    test('should accept string selector', () => {
      const element = kw('#test-div');
      expect(element['elements']).toHaveLength(1);
      expect(element['isSingle']).toBe(true);
    });

    test('should accept Element', () => {
      const div = document.getElementById('test-div');
      const element = new KinWin(div!);
      expect(element['elements']).toHaveLength(1);
    });

    test('should accept Element[]', () => {
      const divs = document.querySelectorAll('div');
      const element = new KinWin(Array.from(divs));
      expect(element['elements'].length).toBeGreaterThan(0);
    });
  });

  describe('DOM Manipulation', () => {
    test('should get/set HTML content', () => {
      const element = kw('#test-div');
      const initialHtml = `
        <span>Initial Content</span>
        <div class="child">Child 1</div>
        <div class="child">Child 2</div>
      `.trim();
      expect(element.html().trim()).toBe(initialHtml);
      
      element.html('New Content');
      expect(element.html()).toBe('New Content');
    });

    test('should get/set attributes', () => {
      const element = kw('#test-div');
      element.attr('title', 'Test Title');
      expect(element.attr('title')).toBe('Test Title');
    });

    test('should set multiple attributes', () => {
      const element = kw('#test-div');
      element.attr({
        'data-test': 'test',
        'aria-label': 'label'
      });
      expect(element.attr('data-test')).toBe('test');
      expect(element.attr('aria-label')).toBe('label');
    });
  });

  describe('Class Manipulation', () => {
    test('should add/remove classes', () => {
      const element = kw('#test-div');
      element.addClass('new-class');
      expect(element.hasClass('new-class')).toBe(true);
      
      element.removeClass('new-class');
      expect(element.hasClass('new-class')).toBe(false);
    });

    test('should toggle classes', () => {
      const element = kw('#test-div');
      element.toggleClass('toggle-class');
      expect(element.hasClass('toggle-class')).toBe(true);
      
      element.toggleClass('toggle-class');
      expect(element.hasClass('toggle-class')).toBe(false);
    });
  });

  describe('Visibility', () => {
    test('should hide/show elements', () => {
      const element = kw('#test-div');
      element.hide();
      expect((element['elements'][0] as HTMLElement).style.display).toBe('none');
      
      element.show();
      expect((element['elements'][0] as HTMLElement).style.display).toBe('');
    });
  });

  describe('Traversal', () => {
    test('should find children', () => {
      const element = kw('#test-div');
      const children = element.children();
      expect(children['elements']).toHaveLength(3);
    });

    test('should find parent', () => {
      const child = kw('.child');
      const parent = child.parent();
      expect(parent['elements'][0].id).toBe('test-div');
    });
  });
}); 