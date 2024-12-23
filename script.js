const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const timerElement = document.getElementById('timer');
const circleContainer = document.getElementById('circleContainer');
let interval;
let currentCircle = 1;
const timeLimit = 120; // 2 minutes in seconds
let timeRemaining = timeLimit;

startButton.addEventListener('click', startGame);

function startGame() {
    const speed = parseInt(document.getElementById('speedInput').value);
    document.getElementById('container').style.display = 'none';
    gameContainer.style.display = 'block';
    startTimer();
    displayCircles(currentCircle);
    interval = setInterval(() => {
        currentCircle++;
        if (currentCircle > 5) currentCircle = 1;
        displayCircles(currentCircle);
    }, speed);
}

function startTimer() {
    document.getElementById('timer').classList.remove('hidden');
    let timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.innerText = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            alert('Tiempo agotado');
            clearInterval(interval);
            resetGame();
        }
    }, 1000);
}

function displayCircles(circleNumber) {
    circleContainer.innerHTML = ''; // Limpiar contenedor

    let sizes = [50, 100, 150, 200, 250]; // Tamaño de los círculos
    if (window.innerHeight <= 600) {
        sizes = [37.5, 50, 65, 85, 100]; // Reducir alturas en dispositivos móviles
    }if (window.innerWidth <= 400) {
        sizes = [37.5, 50, 65, 85, 100]; // Reducir alturas en dispositivos móviles
    }
    // Crear círculo
    const circle = document.createElement('div');
    circle.classList.add('circulo'); // Agregar la clase 'circulo'
    circle.style.width = sizes[circleNumber - 1] + 'px';
    circle.style.height = sizes[circleNumber - 1] + 'px';

    // Crear números para los lados del círculo
    for (let i = 0; i < 4; i++) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerText = circleNumber;
        number.style.position = 'absolute';
        switch (i) {
            case 0: // Arriba
                number.style.top = '-30px';
                break;
            case 1: // Abajo
                number.style.bottom = '-30px';
                break;
            case 2: // Izquierda
                number.style.left = '-30px';
                break;
            case 3: // Derecha
                number.style.right = '-30px';
                break;
        }
        circle.appendChild(number);
    }

    // Añadir el círculo al contenedor
    circleContainer.appendChild(circle);
}

function resetGame() {
    document.getElementById('container').style.display = 'block';
    gameContainer.style.display = 'none';
    timeRemaining = timeLimit;
    timerElement.innerText = 'Tiempo restante: 02:00';
    clearInterval(interval);
    currentCircle = 1;
}
