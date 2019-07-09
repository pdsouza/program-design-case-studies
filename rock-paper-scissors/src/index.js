import { playRound, prompt, aiPick } from './rps.js';

function println(s) {
  const log = document.getElementById('log');
  const p = document.createElement('p');
  p.innerHTML = s;
  log.appendChild(p);
}

let state = {
  score: { 'user': 0, 'ai': 0 },
  userHist: [0, 0, 0] // histogram of hands played by user
};

function play(hand) {
  const { nextState, result } = playRound(state, hand, aiPick(state.userHist));
  state = nextState;
  println(result);
  println(prompt(state));
}

document.getElementById('r').onclick = () => play('rock');
document.getElementById('p').onclick = () => play('paper');
document.getElementById('s').onclick = () => play('scissors');

// global export for debugging within the browser console
window.state = state;
