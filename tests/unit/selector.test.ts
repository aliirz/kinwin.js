import { Selector } from '../../src/core/selector';

describe('Selector', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-id">ID Element</div>
      <div class="test-class">Class Element 1</div>
      <div class="test-class">Class Element 2</div>
      <input name="test-name" value="Name Element" />
      <span>Tag Element 1</span>
      <span>Tag Element 2</span>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('ID Selector (#)', () => {
    test('should find element by ID', () => {
      const { elements, single } = Selector.select('#test-id');
      expect(elements).toHaveLength(1);
      expect(elements[0].textContent).toBe('ID Element');
      expect(single).toBe(true);
    });

    test('should return empty array for non-existent ID', () => {
      const { elements, single } = Selector.select('#non-existent');
      expect(elements).toHaveLength(0);
      expect(single).toBe(true);
    });
  });

  describe('Class Selector (.)', () => {
    test('should find elements by class name', () => {
      const { elements, single } = Selector.select('.test-class');
      expect(elements).toHaveLength(2);
      expect(single).toBe(false);
    });

    test('should return empty array for non-existent class', () => {
      const { elements, single } = Selector.select('.non-existent');
      expect(elements).toHaveLength(0);
      expect(single).toBe(false);
    });
  });

  describe('Name Selector (@)', () => {
    test('should find elements by name attribute', () => {
      const { elements, single } = Selector.select('@test-name');
      expect(elements).toHaveLength(1);
      expect((elements[0] as HTMLInputElement).value).toBe('Name Element');
      expect(single).toBe(false);
    });
  });

  describe('Tag Selector (=)', () => {
    test('should find elements by tag name', () => {
      const { elements, single } = Selector.select('=span');
      expect(elements).toHaveLength(2);
      expect(single).toBe(false);
    });
  });
}); 