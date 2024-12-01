import { KinWin as BaseKinWin } from './manipulator';

// Extend the base class
declare module './manipulator' {
    interface KinWin {
        delegate(eventType: string, selector: string, handler: (e: Event) => void): this;
    }
}

// Implement the method
BaseKinWin.prototype.delegate = function(eventType: string, selector: string, handler: (e: Event) => void) {
    this.elements.forEach(el => {
        el.addEventListener(eventType, (e) => {
            const target = e.target as Element;
            if (target.matches(selector)) {
                handler(e);
            }
        });
    });
    return this;
}; 