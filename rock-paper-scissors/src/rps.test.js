import { handToChoice, handThatBeats, rounds } from './rps';

describe('rules', () => {
  test('rock beats scissors', () => {
    expect(handThatBeats('scissors')).toBe('rock');
  });
  test('paper beats rock', () => {
    expect(handThatBeats('rock')).toBe('paper');
  });
  test('scissors beats paper', () => {
    expect(handThatBeats('paper')).toBe('scissors');
  });
});

test('rounds', () => {
  const state = {
    scores: { 'ai' : 4, 'user' : 2 },
    userHist: [2, 1, 4]
  };
  expect(rounds(state)).toEqual(7);
});
