export function shuffleArray(array) {
  let n = array.length - 1;

  for(let i = n; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}