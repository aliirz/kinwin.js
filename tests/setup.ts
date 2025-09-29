export {};  // Makes this a module

declare global {
  namespace jest {
    interface Global {
      fetch: jest.Mock;
    }
  }
} 