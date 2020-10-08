function AnimationFrame(update: (delta: number) => void) {
  const requestAnimationFrame = window.requestAnimationFrame;
  const performance = window.performance;
  let playing = false;
  let time = 0;
  function ticker(timestamp) {
    if (playing) {
      update(timestamp - time);
      time = timestamp;
      requestAnimationFrame(ticker);
    }
  }
  return {
    play() {
      playing = true;
      time = performance.now();
      requestAnimationFrame(ticker);
    },
    stop() {
      playing = false;
    },
  };
}
export default AnimationFrame;
