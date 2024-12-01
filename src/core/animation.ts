import { KinWin as BaseKinWin } from './manipulator';

export class Animation {
    static readonly TRANSITIONS = {
        fade: {
            in: { opacity: 1 },
            out: { opacity: 0 }
        },
        slide: {
            in: { transform: 'translateX(0)' },
            out: { transform: 'translateX(-100%)' }
        }
    };

    static animate(element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions): Animation {
        return element.animate(keyframes, {
            fill: 'forwards',  // Keep the final state
            ...options
        });
    }
}

// Extend the base class
declare module './manipulator' {
    interface KinWin {
        fadeIn(duration?: number): Promise<this>;
        fadeOut(duration?: number): Promise<this>;
        slideIn(duration?: number): Promise<this>;
    }
}

// Implement the methods
BaseKinWin.prototype.fadeIn = async function(duration = 300) {
    this.elements.forEach(el => {
        (el as HTMLElement).style.opacity = '0';
    });
    
    const promises = this.elements.map(el => 
        el.animate([
            Animation.TRANSITIONS.fade.out,
            Animation.TRANSITIONS.fade.in
        ], { duration, fill: 'forwards' }).finished
    );
    await Promise.all(promises);
    return this;
};

BaseKinWin.prototype.fadeOut = async function(duration = 300) {
    this.elements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
    });
    
    const promises = this.elements.map(el => 
        el.animate([
            Animation.TRANSITIONS.fade.in,
            Animation.TRANSITIONS.fade.out
        ], { duration, fill: 'forwards' }).finished
    );
    await Promise.all(promises);
    return this;
};

BaseKinWin.prototype.slideIn = async function(duration = 300) {
    this.elements.forEach(el => {
        (el as HTMLElement).style.transform = 'translateX(-100%)';
    });
    
    const promises = this.elements.map(el => 
        el.animate([
            Animation.TRANSITIONS.slide.out,
            Animation.TRANSITIONS.slide.in
        ], { duration, fill: 'forwards' }).finished
    );
    await Promise.all(promises);
    return this;
}; 