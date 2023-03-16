export type TweenValue =
  | number
  | {
      [key: string]: TweenValue;
    }
  | TweenValue[];

export type TweenTo =
  | number
  | {
      [key: string]: TweenTo;
    }
  | TweenTo[];

export type EasingFunction = (amount: number) => number;
