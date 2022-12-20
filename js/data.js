// Author: Connor Tolderlund
// email: connor_tolderlund@student.uml.edu

const piece_bag = {
  A: {
    value: 1,
    amount: 9,
  },
  B: {
    value: 3,
    amount: 2,
  },
  C: {
    value: 3,
    amount: 2,
  },
  D: {
    value: 2,
    amount: 4,
  },
  E: {
    value: 1,
    amount: 12,
  },
  F: {
    value: 4,
    amount: 2,
  },
  G: {
    value: 2,
    amount: 3,
  },
  H: {
    value: 4,
    amount: 2,
  },
  I: {
    value: 1,
    amount: 9,
  },
  J: {
    value: 8,
    amount: 1,
  },
  K: {
    value: 5,
    amount: 1,
  },
  L: {
    value: 1,
    amount: 4,
  },
  M: {
    value: 3,
    amount: 2,
  },
  N: {
    value: 1,
    amount: 5,
  },
  O: {
    value: 1,
    amount: 8,
  },
  P: {
    value: 3,
    amount: 2,
  },
  Q: {
    value: 10,
    amount: 1,
  },
  R: {
    value: 1,
    amount: 6,
  },
  S: {
    value: 1,
    amount: 4,
  },
  T: {
    value: 1,
    amount: 6,
  },
  U: {
    value: 1,
    amount: 4,
  },
  V: {
    value: 4,
    amount: 2,
  },
  W: {
    value: 4,
    amount: 2,
  },
  X: {
    value: 8,
    amount: 1,
  },
  Y: {
    value: 4,
    amount: 2,
  },
  Z: {
    value: 10,
    amount: 1,
  },
  BLANK: {
    value: 0,
    amount: 2,
  },
};

// this is nice to have for letter generation
const pieces_sorted_by_freq = {
  E: 12,
  A: 9,
  I: 9,
  O: 8,
  N: 6,
  R: 6,
  T: 6,
  D: 4,
  L: 4,
  S: 4,
  U: 4,
  G: 3,
  B: 2,
  C: 2,
  F: 2,
  H: 2,
  M: 2,
  P: 2,
  V: 2,
  W: 2,
  Y: 2,
  BLANK: 2,
  J: 1,
  K: 1,
  Q: 1,
  X: 1,
  Z: 1,
};

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
