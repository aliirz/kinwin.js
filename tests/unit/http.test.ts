import { Http } from '../../src/core/http';
import { KinWin } from '../../src/core/manipulator';

describe('Http', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET requests', () => {
    test('should make GET request with default headers', async () => {
      const mockData = { id: 1, title: 'Test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockData)
      });

      const result = await Http.get<typeof mockData>('/api/test');
      
      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(result).toEqual(mockData);
    });

    test('should make GET request with custom headers', async () => {
      const mockData = { id: 1, title: 'Test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockData)
      });

      await Http.get('/api/test', {
        headers: {
          'Authorization': 'Bearer token123'
        }
      });
      
      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        }
      });
    });

    test('should handle query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({})
      });

      await Http.get('/api/test', {
        params: {
          page: '1',
          limit: '10'
        }
      });
      
      expect(global.fetch).toHaveBeenCalledWith('/api/test?page=1&limit=10', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  });

  describe('POST requests', () => {
    test('should make POST request with correct headers and body', async () => {
      const requestData = { name: 'Test' };
      const responseData = { id: 1, ...requestData };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(responseData)
      });

      const result = await Http.post<typeof responseData>('/api/test', requestData);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      expect(result).toEqual(responseData);
    });

    test('should handle custom headers in POST request', async () => {
      const requestData = { name: 'Test' };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({})
      });

      await Http.post('/api/test', requestData, {
        headers: {
          'Authorization': 'Bearer token123'
        }
      });
      
      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        },
        body: JSON.stringify(requestData)
      });
    });
  });

  describe('KinWin load method', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test"></div>';
    });

    test('should load HTML content from URL', async () => {
      const htmlContent = '<p>Loaded content</p>';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(htmlContent)
      });

      const element = new KinWin('#test');
      await element.load('/api/content');

      expect(document.getElementById('test')?.innerHTML).toBe(htmlContent);
    });

    test('should handle load errors', async () => {
      const errorMessage = 'Failed to load';
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      const element = new KinWin('#test');
      await expect(element.load('/api/content')).rejects.toThrow(errorMessage);
    });
  });
}); 