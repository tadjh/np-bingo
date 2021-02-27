export type Ball = {
  key: number;
  value: number;
  name: string;
  remainder: number;
};
export type Card = number[];
export type Pool = number[][];
export type Results = {
  [key: string]: number[] | boolean;
};
export type Winner = {
  methods: string[];
  data: Results;
};
export enum Gamestate {
  INIT,
  READY,
  STANDBY,
  START,
  VALIDATE,
  FAILURE,
  END,
}

export type Rules = string[];
