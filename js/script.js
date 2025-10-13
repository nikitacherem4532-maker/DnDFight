// Получаем элементы
const rollBtn = document.getElementById("roll-btn");
const playerDiceContainer = document.getElementById("player-dice");
const enemyDiceContainer = document.getElementById("enemy-dice");
const playerScoreEl = document.getElementById("player-score");
const enemyScoreEl = document.getElementById("enemy-score");
const resultText = document.getElementById("result-text");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const resetBtn = document.getElementById("reset-btn");

// Загружаем счётчик из localStorage
let wins = parseInt(localStorage.getItem("wins")) || 0;
let losses = parseInt(localStorage.getItem("losses")) || 0;

// Отображаем счётчики
winsEl.textContent = wins;
lossesEl.textContent = losses;

// Функция броска кубов
function rollDice(numDice = 3) {
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    return rolls;
}

// Функция отображения кубов
function displayDice(container, rolls) {
    container.innerHTML = "";
    rolls.forEach(value => {
        const die = document.createElement("div");
        die.classList.add("die");
        die.textContent = value;
        container.appendChild(die);
    });
}

// Основная логика боя
rollBtn.addEventListener("click", () => {
    rollBtn.disabled = true;
    resultText.textContent = "🎲 Кубы летят...";
    playerDiceContainer.innerHTML = "";
    enemyDiceContainer.innerHTML = "";

    setTimeout(() => {
        const playerRolls = rollDice();
        const enemyRolls = rollDice();

        displayDice(playerDiceContainer, playerRolls);
        displayDice(enemyDiceContainer, enemyRolls);

        const playerTotal = playerRolls.reduce((a, b) => a + b, 0);
        const enemyTotal = enemyRolls.reduce((a, b) => a + b, 0);

        playerScoreEl.textContent = playerTotal;
        enemyScoreEl.textContent = enemyTotal;

        if (playerTotal > enemyTotal) {
            resultText.textContent = "🏆 Победа! Ты сокрушил монстра!";
            resultText.style.color = "#ffd700";
            wins++;
        } else if (playerTotal < enemyTotal) {
            resultText.textContent = "💀 Поражение... Монстр оказался сильнее.";
            resultText.style.color = "#ff4a4a";
            losses++;
        } else {
            resultText.textContent = "🤝 Ничья!";
            resultText.style.color = "#e0b94a";
        }

        // Сохраняем счётчики
        localStorage.setItem("wins", wins);
        localStorage.setItem("losses", losses);

        // Обновляем отображение
        winsEl.textContent = wins;
        lossesEl.textContent = losses;

        rollBtn.disabled = false;
    }, 1000);
});

// Кнопка сброса
resetBtn.addEventListener("click", () => {
    wins = 0;
    losses = 0;
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    resultText.textContent = "Счётчики сброшены!";
    resultText.style.color = "#e0b94a";
});