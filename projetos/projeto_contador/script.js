// Elementos da página
const startButton = document.getElementById('start');
const backButton = document.getElementById('back');
const mainScreen = document.getElementById('main');
const menuScreen = document.getElementById('menu');
const timerScreen = document.getElementById('timer');
const optionsContainer = document.getElementById('options');
const eggImage = document.getElementById('egg-image');

let timerInterval = null;

// Dados dos tipos de ovos
const eggTypes = {
    'button-1': { minutes: 3, image: 'soft.png' },
    'button-2': { minutes: 5, image: 'medium.png' },
    'button-3': { minutes: 7, image: 'hard.png' },
    'button-4': { minutes: 10, image: 'extra-hard.png' }
};

// Navega para a tela de menu
startButton.addEventListener("click", () => {
    mainScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
});

// Delegação de evento para os botões de opção
optionsContainer.addEventListener('click', (event) => {
    const button = event.target;
    // Verifica se o clique foi realmente em um botão
    if (button.tagName === 'BUTTON') {
        const eggData = eggTypes[button.id];
        if (eggData) {
            eggImage.src = `src/imagens/${eggData.image}`;
            menuScreen.classList.add('hidden');
            timerScreen.classList.remove('hidden');
            backButton.classList.remove('hidden');
            startTimer(eggData.minutes);
        }
    }
});

// Volta para a tela de menu
backButton.addEventListener("click", () => {
    // Para o timer
    clearInterval(timerInterval);
    
    // Reseta a tela
    timerScreen.innerHTML = "00:00";
    timerScreen.classList.add('hidden');
    backButton.classList.add('hidden');
    eggImage.src = "src/imagens/inicio.png";

    // Mostra o menu novamente
    menuScreen.classList.remove('hidden');
});

// Função que inicia o contador
function startTimer(minutes) {
    let totalSeconds = minutes * 60;

    // Limpa qualquer timer anterior para evitar bugs
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerScreen.innerHTML = "Egg Cooked! 🍳";
            return;
        }

        totalSeconds--;

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        
        timerScreen.innerHTML = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    }, 1000);
}