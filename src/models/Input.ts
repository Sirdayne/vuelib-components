import { TRule } from "./Element";

export const inputTypes = ["text", "password"] as const;
export type TInputType = typeof inputTypes[number];

export const iconAppendHiddenCases = ["empty", "unfocused"] as const;
export type TIconAppendHiddenCase = typeof iconAppendHiddenCases[number];

export type TInputOption<T> = {
  value: T;
  label: string;
};

export type TInputRule = TRule<string>;
export type TCheckboxRule = TRule<boolean>;

export type TSelectValue = number | string | boolean | null;
export type TSelectOption = TInputOption<TSelectValue>;
