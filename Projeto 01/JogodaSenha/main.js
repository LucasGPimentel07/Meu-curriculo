let attempts = 0; let bulls = 0; let cows = 0;
let secretNumber = generateSecretNumber();
console.log(secretNumber);

let roundStats = {
  round: 1,
  wins: 0,
  loses: 0
}

function checkGuess() {
  let guess = document.getElementById("guessInput").value;
  let secretString = secretNumber.join('');
  bulls = 0; cows = 0;

  const checkGuessLength = new Set(guess);

  if (guess.length !== checkGuessLength.size || guess.length !== 4) {
    document.getElementById("logsArea").value += `${guess} Inválido, insira um número composto por exatamente 4 dígitos diferentes.\n`;
    return null;
  }

  attempts += 1;

  for (let i = 0; i < 4; i += 1) {
    if (secretString[i] === guess[i]) {
      bulls += 1;
    } else if (secretString.includes(guess[i])) {
      cows += 1;
    }
  }

  if (bulls === 4) {
    document.getElementById("logsArea").value += `${secretString} | Parabéns você ganhou em ${attempts} tentativas.\n`;
    roundStats.wins += 1;
    return playAgain();
  } else if (attempts === 10) {
    document.getElementById("logsArea").value += `${secretString} | Você Perdeu!\n`;
    roundStats.loses += 1;
    return playAgain();
  }

  document.getElementById("logsArea").value += `${guess} - ${bulls}B ${cows}C, tentativas: ${attempts}\n`;
}

function playAgain() {
  roundStats.round += 1;
  printGameStats();
  attempts = 0; bulls = 0; cows = 0;
  secretNumber = generateSecretNumber();
}

function printGameStats() {
  const gameStats = document.getElementById("gameStats");
  gameStats.innerHTML = `R: ${roundStats.round} | V: ${roundStats.wins} | D: ${roundStats.loses}`;
}

function generateSecretNumber() {
  const numbers = Array.from({ length: 9}, (v, k) => k + 1);
  let currentIndex = numbers.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]];
  }

  return numbers.slice(0, 4);
}

function clearLogs() {
  document.getElementById("logsArea").value = "";
}

function printRules() {
  alert("Digite um número composto de 4 dígitos diferentes na caixa ao lado de ‘Adivinhar’. O computador compara-o com o código secreto e dá-lhe duas pistas: os números 'touros' (B) e vacas (C). O que isso significa? Um 'touros' é um dígito que está presente em ambos os códigos na mesma posição. Uma 'vaca' é um dígito que está presente em ambos os códigos, mas em uma posição diferente. Por exemplo, se a senha for 7512 e você tentar 5392, a resposta será '1B 1C' (1 touro 1 vaca).")
}