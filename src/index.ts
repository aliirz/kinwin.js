/**
 * KinWin - Modern TypeScript DOM Manipulation Library
 * @packageDocumentation
 * 
 * @example Basic Usage
 * ```ts
 * import { kw } from 'kinwin';
 * 
 * // Select and manipulate
 * kw('#myId')
 *   .addClass('active')
 *   .attr('title', 'Active Element')
 *   .html('New Content');
 * 
 * // Event handling
 * kw('.button').on('click', (e) => {
 *   console.log('Clicked!', e);
 * });
 * ```
 */

import { KinWin, kw } from './core/manipulator';
import { Selector } from './core/selector';
import { Http } from './core/http';
import type { SelectorResult } from './core/selector';
import './core/forms';  
import './core/animation'; 

// Expose kw to window
declare global {
    interface Window {
        kw: typeof kw;
        Http: typeof Http;
    }
}

window.kw = kw;
window.Http = Http;

// Re-export for module usage
export { KinWin, kw, Selector, Http };
export type { SelectorResult }; 