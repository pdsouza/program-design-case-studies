// -- stat --------------------------------------------------------------------

function histToProb(hist) {
  const events = hist.reduce((acc, freq) => acc + freq);
  return hist.map(x => events > 0 ? x / events : 1 / hist.length)
}

function weightedRandSample(hist) {
  // A weighted random sample can be implemented by
  // checking which prob interval a sample ~ U(0, 1) falls within:
  //
  // 0                            1
  // |---|------|-- ... ----------|
  //     ^      ^                 ^
  //     p[0]   p[0] + p[1]       p[0] + ... + p[n]
  const p = histToProb(hist);
  let sample = -1;
  for (let rand = Math.random(); rand >= 0; rand -= p[++sample]);
  return sample;
}

// -- pure --------------------------------------------------------------------

const hands = ['rock', 'paper', 'scissors'];
const handToChoice = (hand) => hands.findIndex(h => h === hand);
const handThatBeats = (h) => hands[(handToChoice(h) + 1) % 3];
const beats = (h1, h2) => handThatBeats(h2) === h1;

function judge(userHand, aiHand) {
  let winner;
  let txt = `Your ${userHand} draws the AI's ${aiHand}!`;
  if (beats(userHand, aiHand)) {
    winner = 'user';
    txt = `Your ${userHand} beats the AI's ${aiHand} — you win!`;
  } else if (beats(aiHand, userHand)) {
    winner = 'ai';
    txt = `The AI's ${aiHand} beats your ${userHand} — you lose!`;
  }
  return { winner, toString: () => txt };
}

function playRound(state, userHand, aiHand) {
  const nextState = {...state};

  const result = judge(userHand, aiHand);
  if (result.winner) nextState.score[result.winner]++;
  nextState.userHist[handToChoice(userHand)]++;

  return { nextState, result };
}

const aiPick = hist => handThatBeats(hands[weightedRandSample(hist)]);
const rounds = (state) => state.userHist.reduce((acc, freq) => acc + freq);
const prompt = (state) => `Round ${rounds(state) + 1}: rock, paper, scissors?`;

export {
  histToProb,
  handToChoice,
  handThatBeats,
  judge,
  aiPick,
  playRound,
  prompt,
  rounds
}
