import { TOption, TRule } from "./Element";

export type TRadioValue = number | string | boolean | null;

export type TRadioOption = {
  hint?: string;
  disabled?: boolean;
} & TOption<TRadioValue>;

export type TRadioRule = TRule<TRadioValue>;
