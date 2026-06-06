const languageSelect = document.getElementById('languageSelect');
const generateButton = document.getElementById('generateButton');
const playButton = document.getElementById('playButton');
const listenWhileTyping = document.getElementById('listenWhileTyping');
const sourceText = document.getElementById('sourceText');
const typingInput = document.getElementById('typingInput');
const resetButton = document.getElementById('resetButton');
const wpmValue = document.getElementById('wpmValue');
const accuracyValue = document.getElementById('accuracyValue');
const elapsedValue = document.getElementById('elapsedValue');
const mistakesValue = document.getElementById('mistakesValue');

const texts = {
  'en-US': [
    'The quick brown fox jumps over the lazy dog and practices word flow with confident rhythm.',
    'Every new line helps the stenotypist improve speed, accuracy, and consistent focus.',
    'Practice typing while listening to the passage so the fingers learn the cadence and pace.',
  ],
  'es-ES': [
    'El rápido zorro marrón salta sobre el perro perezoso y practica el ritmo de escritura.',
    'Cada línea nueva ayuda al taquígrafo a mejorar la velocidad y la precisión diariamente.',
    'Practica mecanografiar mientras escuchas el texto para aprender la cadencia y el enfoque.',
  ],
  'fr-FR': [
    'Le rapide renard brun saute par-dessus le chien paresseux et affine son rythme d’écriture.',
    'Chaque nouvelle phrase aide le sténographe à renforcer la vitesse et la précision.',
    'Pratiquez la dactylographie en écoutant le texte pour apprendre la cadence du discours.',
  ],
  'de-DE': [
    'Der schnelle braune Fuchs springt über den faulen Hund und übt den Schreibfluss.',
    'Jede neue Zeile hilft dem Stenotypisten, Geschwindigkeit und Genauigkeit zu verbessern.',
    'Übe das Tippen, während du den Text hörst, um den Rhythmus und die Konzentration zu verbessern.',
  ],
};

let timer = null;
let startTime = null;
let totalKeystrokes = 0;
let mistakes = 0;
let completed = false;

function randomPracticeText(language) {
  const list = texts[language] || texts['en-US'];
  return list[Math.floor(Math.random() * list.length)];
}

function formatTime(start, end) {
  const delta = Math.max(0, Math.floor((end - start) / 1000));
  const minutes = String(Math.floor(delta / 60)).padStart(2, '0');
  const seconds = String(delta % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateMetrics() {
  const typed = typingInput.value;
  const source = sourceText.value;
  const correctChars = [...typed].reduce((count, char, index) => {
    return count + (char === source[index] ? 1 : 0);
  }, 0);

  const totalTyped = typed.length;
  const accuracy = totalTyped === 0 ? 100 : Math.max(0, Math.round((correctChars / totalTyped) * 100));
  accuracyValue.textContent = `${accuracy}%`;

  const seconds = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 1000)) : 0;
  const wordsTyped = correctChars / 5;
  const wpm = seconds === 0 ? 0 : Math.max(0, Math.round(wordsTyped * 60 / seconds));
  wpmValue.textContent = wpm;

  mistakesValue.textContent = mistakes;
  elapsedValue.textContent = formatTime(startTime || Date.now(), Date.now());
}

function handleTypingInput() {
  if (completed) {
    return;
  }

  if (!startTime && typingInput.value.length > 0) {
    startTime = Date.now();
    timer = window.setInterval(updateMetrics, 500);
  }

  const typed = typingInput.value;
  const source = sourceText.value;
  totalKeystrokes = typed.length;
  mistakes = [...typed].reduce((count, char, index) => {
    return count + (char !== source[index] ? 1 : 0);
  }, 0);

  updateMetrics();

  if (listenWhileTyping.checked) {
    startAutoSpeak(source, languageSelect.value);
  }

  if (typed === source && source.length > 0) {
    completed = true;
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
    updateMetrics();
    typingInput.blur();
  }
}

function handleGenerate() {
  sourceText.value = randomPracticeText(languageSelect.value);
  typingInput.value = '';
  completed = false;
  startTime = null;
  mistakes = 0;
  totalKeystrokes = 0;
  updateMetrics();
}

function handleReset() {
  sourceText.value = '';
  typingInput.value = '';
  completed = false;
  startTime = null;
  mistakes = 0;
  totalKeystrokes = 0;
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
  wpmValue.textContent = '0';
  accuracyValue.textContent = '100%';
  elapsedValue.textContent = '00:00';
  mistakesValue.textContent = '0';
}

function speakText(text, language, options = {}) {
  if (!('speechSynthesis' in window) || !text.trim()) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  window.speechSynthesis.speak(utterance);
}

function startAutoSpeak(text, language) {
  if (!('speechSynthesis' in window) || !text.trim()) {
    return;
  }

  const speech = window.speechSynthesis;
  if (speech.speaking || speech.pending) {
    return;
  }

  speakText(text, language, { rate: 1.0, pitch: 1.0 });
}

function handlePlay() {
  const text = sourceText.value.trim();
  if (!text) {
    sourceText.focus();
    return;
  }
  speakText(text, languageSelect.value);
}

function blockPaste(event) {
  event.preventDefault();
}

generateButton.addEventListener('click', handleGenerate);
playButton.addEventListener('click', handlePlay);
typingInput.addEventListener('input', handleTypingInput);
resetButton.addEventListener('click', handleReset);
sourceText.addEventListener('paste', blockPaste);
typingInput.addEventListener('paste', blockPaste);
sourceText.addEventListener('drop', (event) => event.preventDefault());
typingInput.addEventListener('drop', (event) => event.preventDefault());

languageSelect.addEventListener('change', () => {
  if (!sourceText.value.trim()) {
    sourceText.value = randomPracticeText(languageSelect.value);
  }
});

handleReset();
