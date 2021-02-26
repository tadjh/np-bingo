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
export type Status =
  | 'init'
  | 'ready'
  | 'standby'
  | 'start'
  | 'validate'
  | 'failure'
  | 'end';
