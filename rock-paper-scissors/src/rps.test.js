import { handToChoice, handThatBeats } from './rps';

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
