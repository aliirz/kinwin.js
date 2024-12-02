import { KinWin as BaseKinWin } from './manipulator';

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
}

interface PostOptions extends RequestOptions {
  contentType?: string;
}

/**
 * HTTP utility class for making API requests
 */
export class Http {
  private static readonly DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  };

  private static createUrl(url: string, params?: Record<string, string>): string {
    if (!params) return url;
    const searchParams = new URLSearchParams(params);
    return `${url}?${searchParams.toString()}`;
  }

  /**
   * Makes a GET request
   * @template T Response data type
   */
  static async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const finalUrl = this.createUrl(url, options.params);
    const response = await fetch(finalUrl, {
      headers: {
        ...this.DEFAULT_HEADERS,
        ...options.headers,
      },
    });
    return response.json();
  }

  /**
   * Makes a POST request
   * @template T Response data type
   */
  static async post<T>(url: string, data: unknown, options: PostOptions = {}): Promise<T> {
    const finalUrl = this.createUrl(url, options.params);
    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        ...this.DEFAULT_HEADERS,
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// Extend KinWin with load method
declare module './manipulator' {
  interface KinWin {
    load(url: string): Promise<this>;
  }
}

// Add load method to KinWin
BaseKinWin.prototype.load = async function (url: string) {
  const html = await Http.get<string>(url);
  this.html(html);
  return this;
};
