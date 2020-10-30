declare module "tween-animate" {
    import EventEmitter from 'eventemitter3';

    type EasingFunction = (amount: number) => number;

    /**
     * The Ease class provides a collection of easing functions for use with tween.js.
     */
    const Easing: {
        Linear: {
            None: (amount: number) => number;
        };
        Quadratic: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Cubic: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Quartic: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Quintic: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Sinusoidal: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Exponential: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Circular: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Elastic: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Back: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
        Bounce: {
            In: (amount: number) => number;
            Out: (amount: number) => number;
            InOut: (amount: number) => number;
        };
    };

    const utils: {
        /**
         * 实现的一个filter， 直接改变源数组，(怕filter生成新数组影响原数组回收,或带来回收成本)
         * 也不知道到底有没有什么好处，先这样= =
         * @param {array} arr
         * @param {function} func
         */
        filter(arr: any, func: any): any;
        clone(obj: any, cloner: any): {};
        isDef(v: any): boolean;
        cached(fn: any): (str: any) => any;
    };

    type AnimateConfig = {
        freshFrame?: number;
        easing?: (number: any) => number;
        isAssign?: boolean;
        stopWhenLeave?: boolean;
        list?: Array<any>;
        formattor?: () => any;
    };
    type AnimateInstanceConfig = {
        isAssign: boolean;
    };

    /**
     * parse from and to
     * @example
          parseFromTo(
            { x: [1, 2, 3], y: 1 },
            { x: [1, 2, 6], y: 3 },
            { isAssign: false },
          );
     * @param a - from
     * @param b - status - range 0 - 1
     * @render ƒ anonymous(a,b) {
                var a={};var a_x=a["x"]=[];a_x["2"]=3+b*3;a["y"]=1+b*2;return a;
                }

     */
    type TweenFrom = {
        [key: string]: any;
    } | number;
    type TweenTo = {
        [key: string]: (v: TweenFrom) => TweenTo | TweenTo | number;
    } | number | ((v: TweenFrom) => TweenTo);
    type updateFunc = (status: number) => any;
    function parseFromTo(from: TweenFrom, rawTo: TweenTo, config: AnimateConfig): updateFunc;

    type ON = (id: string, func: (ins: any) => void) => void;
    const Transform: {
        $register(id: string, func: (on: ON, ...args: any) => void): void;
        $apply(id: string, ins: EventEmitter, ...args: any[]): void;
    };

    class AnimateInstance extends EventEmitter {
        isReversed: boolean;
        isPlaying: boolean;
        isCompleted: boolean;
        private time;
        private fullTime;
        private animateConfig;
        private parsed;
        constructor(from: any, to: any, time: any, animate: any);
        _trigger(): void;

        /** 动画开始 */
        start(isReversed?: boolean): void;

        /** 动画完成 */
        complete(): void;

        /** 动画每次开始 */
        begin(): void;

        /** 动画每次结束 */
        end(): void;
        play(): void;
        stop(): void;
        update(elpased: any): void;
        transform(id: any, ...args: any[]): WrapperInstance;
        destroy(): void;
    }

    class WrapperInstance extends EventEmitter {
        isPlaying: boolean;
        isCompleted: boolean;
        private isReversed;
        private animateInstance;
        constructor(ins: AnimateInstance | WrapperInstance);
        _trigger(): void;
        transform(id: any, ...args: any[]): WrapperInstance;

        /** 动画开始 */
        start(isReversed?: boolean): void;

        /** 动画完成 */
        complete(): void;

        /** 动画每次开始 */
        begin(): void;

        /** 动画每次结束 */
        end(): void;
        play(): void;
        stop(): void;
        destroy(): void;
    }

    const List: any[];
    const funcList: any[];
    function update(elpased: any, list?: any[]): void;

    class AnimateClass extends EventEmitter {
        config: AnimateConfig;
        to: any;
        constructor(to: any, config?: AnimateConfig);

        /**
         * @param {function} el - 生成具体的动画实例
         */
        apply(el: any, time: any): AnimateInstance;

        /**
         *
         */
        clone(): AnimateClass;
        transform(id: any, ...args: any[]): AnimateWrapper;
    }

    class AnimateWrapper extends EventEmitter {
        private animate;
        constructor(animate: AnimateClass | AnimateWrapper);
        apply(el: any, time: any): any;
        clone(): AnimateWrapper;
        transform(id: any, ...args: any[]): AnimateWrapper;
    }

    interface Animate {
        (to: any, config?: AnimateConfig): AnimateClass;
        config: (config: AnimateConfig) => void;
        play: () => void;
        stop: () => void;
    }

    const Animate: Animate;

    function AnimationFrame(update: (delta: number) => void): {
        play(): void;
        stop(): void;
    };

    const Tween: {
        Animate: Animate;
        update: typeof update;
        Transform: {
            $register(id: string, func: (on: (id: string, func: (ins: any) => void) => void, ...args: any) => void): void;
            $apply(id: string, ins: import("eventemitter3")<string | symbol, any>, ...args: any[]): void;
        };
        Easing: {
            Linear: {
                None: (amount: number) => number;
            };
            Quadratic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Cubic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Quartic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Quintic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Sinusoidal: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Exponential: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Circular: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Elastic: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Back: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
            Bounce: {
                In: (amount: number) => number;
                Out: (amount: number) => number;
                InOut: (amount: number) => number;
            };
        };
    };

    export = Tween;
}
