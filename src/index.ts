import { KinWin, kw } from './core/manipulator';
import { Selector } from './core/selector';
import type { SelectorResult } from './core/selector';

// Expose kw to window
declare global {
    interface Window {
        kw: typeof kw;
    }
}

window.kw = kw;

// Re-export for module usage
export { KinWin, kw, Selector };
export type { SelectorResult }; 