const scoreboard = document.getElementById("scoreboard");
const nameSelector = document.getElementById("nameSelector");
const app = document.getElementById("app");
const youName = document.getElementById("youName");

let playerName = '';
let sushiCount = {};

const sushiNames = {
    "bass": "Нигири с окунем",
    "salmon": "Нигири с лососем",
    "shrimp-nigiri": "Нигири с креветкой",
    "eel-nigiri": "Нигири с угрём",
    "tuna-nigiri": "Нигири с тунцом",
    "cucu": "Ролл с огурцом",
    "salmon-maki": "Маки с лососем",
    "tuna-maki": "Маки с тунцом",
    "phila": "Филадельфия",
    "cali": "Калифорния",
    "las-vegas": "Лас-Вегас",
    "ninja": "Ниндзя",
    "sashimi": "Сашими",
    "spring": "Спринг-ролл",
    "gyoza": "Гёдза",
    "octo": "Осьминог",
    "shrimp": "Креветка",
    "ice": "Мороженое",
    "matcha": "Матча-десерт",
    "vanilla": "Ванильный десерт",
    "cheese": "Чизкейк"
};

function loadScore() {
    const saved = localStorage.getItem("sushi_" + playerName);
    sushiCount = saved ? JSON.parse(saved) : {};
    updateScoreboard();
}

function saveScore() {
    localStorage.setItem("sushi_" + playerName, JSON.stringify(sushiCount));
}

function setPlayer() {
    const select = document.getElementById("playerName");
    playerName = select.value;

    nameSelector.style.display = "none";
    app.style.display = "block";
    scoreboard.style.display = "block";

    youName.textContent = playerName;

    loadScore();
}

function addSushi(type) {
    if (!sushiCount[type]) {
        sushiCount[type] = 0;
    }
    sushiCount[type]++;
    saveScore();
    updateScoreboard();
}

function updateScoreboard() {
    const sorted = Object.entries(sushiCount)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    scoreboard.innerHTML = `<h3>Счёт ${playerName}:</h3>`;
    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";

    sorted.forEach(([type, count]) => {
        const displayName = sushiNames[type] || type;
        const item = document.createElement("li");
        item.textContent = `${displayName}: ${count}`;
        list.appendChild(item);
    });

    if (sorted.length === 0) {
        scoreboard.innerHTML += "<p>Пока ничего не съедено 🙃</p>";
    } else {
        scoreboard.appendChild(list);
    }
}

function resetScore() {
    if (confirm("Вы уверены, что хотите сбросить счёт?")) {
        sushiCount = {};
        saveScore();
        updateScoreboard();
    }
}