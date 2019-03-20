'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
    'margin',
    'call',
    'yokohama'
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 30.5 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder= '';
    for(let i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  };

  function showResult() {
     const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
     const score_second = score === 0 ? 0 : score / (timeLimit / 1000);
     alert(`正しく打ったキーの数：${score}回\nミスタイプ：${miss}回\n正答率：${accuracy.toFixed(2)}%\n平均キータイプ数：${score_second.toFixed(2)}回/秒`);
  };

  function updateTimer() {
     const timeLeft = startTime + timeLimit - Date.now();
     timerLabel.textContent = (timeLeft / 1000).toFixed(2);

     const timeoutId = setTimeout(() => {
      updateTimer();
     }, 100);

     if(timeLeft < 0){
       isPlaying = false;
       clearTimeout(timeoutId);
       timerLabel.textContent = '0.00';
       setTimeout(() => {
          showResult();
       }, 100);

       timerLabel.textContent = '0.00';
       target.textContent = 'もう一度する時はクリック';
     }
  };

  window.addEventListener('click', () => {
    if(isPlaying === true){
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    updateTarget();
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keyup', e => {
    if(isPlaying !== true){
      return;
    }

    console.log(e.key);
    if(e.key == word[loc]){
      console.log('score');
      loc++;

      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      score++;
      scoreLabel.textContent = score;
      updateTarget();
    }else{
      console.log('miss');
      miss++;
      missLabel.textContent = miss;
    }
  });

}