export type TRule<T> = (v: T) => true | string;

export type TOption<T> = {
  value: T;
  label: string;
};
