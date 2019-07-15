import {
  histToProb,
  aiPick,
  handToChoice, handThatBeats,
  rounds
} from './rps';

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

describe('AI', () => {
  const sampleDist = (fn) => {
    const hist = [0, 0, 0];
    for (let i = 0; i < 1000; ++i) {
      hist[handToChoice(fn())]++;
    }
    return histToProb(hist);
  }
  test('AI picks randomly with no user info', () => {
    let probs = sampleDist(() => aiPick([0, 0, 0]));
    probs.forEach(p => expect(p).toBeCloseTo(1/3, 1));
  });
  test('AI only picks paper for a user that has only picked rock', () => {
    let probs = sampleDist(() => aiPick([1, 0, 0]));
    expect(probs).toEqual([0, 1, 0]);
  });
  test('AI only picks scissors for a user that has only picked paper', () => {
    let probs = sampleDist(() => aiPick([0, 1, 0]));
    expect(probs).toEqual([0, 0, 1]);
  });
  test('AI only picks rock for a user that has only picked scissors', () => {
    let probs = sampleDist(() => aiPick([0, 0, 1]));
    expect(probs).toEqual([1, 0, 0]);
  });
});
