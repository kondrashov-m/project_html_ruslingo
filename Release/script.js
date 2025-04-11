// Список слов для изучения (русское слово: английский перевод)
const vocabulary = {
    'Привет': 'Hello',
    'Спасибо': 'Thank you',
    'Пожалуйста': 'Please/You\'re welcome',
    'До свидания': 'Goodbye',
    'Да': 'Yes',
    'Нет': 'No',
    'Извините': 'Sorry/Excuse me',
    'Как дела?': 'How are you?',
    'Хорошо': 'Good',
    'Плохо': 'Bad',
    'Я не понимаю': 'I don\'t understand',
    'Помогите': 'Help',
    'Сколько это стоит?': 'How much is this?',
    'Где находится туалет?': 'Where is the bathroom?',
    'Меню, пожалуйста': 'Menu, please',
    'Я люблю тебя': 'I love you',
    'Доброе утро': 'Good morning',
    'Добрый вечер': 'Good evening',
    'Спокойной ночи': 'Good night',
    'Поздравляю': 'Congratulations'
};

// Инициализация вкладок
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Удаление активного класса у всех вкладок
        tabs.forEach(t => t.classList.remove('active'));
        // Скрытие всех содержимых вкладок
        tabContents.forEach(content => content.style.display = 'none');
        // Добавление активного класса текущей вкладки
        tab.classList.add('active');
        // Отображение соответствующего содержимого
        document.getElementById(tab.dataset.tab).style.display = 'block';
    });
});

// Заполнение таблицы словаря
const vocabTable = document.getElementById('vocabulary-table');
for (const [rus, eng] of Object.entries(vocabulary)) {
    const row = document.createElement('tr');
    const rusCell = document.createElement('td');
    rusCell.textContent = rus;
    const engCell = document.createElement('td');
    engCell.textContent = eng;
    row.appendChild(rusCell);
    row.appendChild(engCell);
    vocabTable.appendChild(row);
}

// Логика викторины
let quizScore = 0;
let quizTotal = 0;
let currentQuizWord = '';
const quizWordElement = document.getElementById('quiz-word');
const quizAnswerInput = document.getElementById('quiz-answer');
const quizSubmitBtn = document.getElementById('quiz-submit');
const quizResult = document.getElementById('quiz-result');
const quizScoreElement = document.getElementById('quiz-score');

function newQuizQuestion() {
    const words = Object.keys(vocabulary);
    currentQuizWord = words[Math.floor(Math.random() * words.length)];
    quizWordElement.textContent = currentQuizWord;
}

quizSubmitBtn.addEventListener('click', () => {
    const userAnswer = quizAnswerInput.value.trim().toLowerCase();
    const correctAnswer = vocabulary[currentQuizWord].toLowerCase();
    quizTotal += 1;
    if (userAnswer === correctAnswer) {
        quizScore += 1;
        quizResult.textContent = "Правильно! 👍";
        quizResult.style.color = 'lightgreen';
    } else {
        quizResult.textContent = `Неправильно! Правильный ответ: ${vocabulary[currentQuizWord]}`;
        quizResult.style.color = 'tomato';
    }
    quizScoreElement.textContent = `Правильных ответов: ${quizScore} из ${quizTotal}`;
    quizAnswerInput.value = '';
    newQuizQuestion();
});

// Запуск новой викторины при загрузке страницы
window.onload = newQuizQuestion;

// Логика карточек
const flashcardFront = document.getElementById('flashcard-front');
const flashcardBack = document.getElementById('flashcard-back');
const showTranslationBtn = document.getElementById('show-translation');
const nextCardBtn = document.getElementById('next-card');
const flashcard = document.getElementById('flashcard');

let flashcards = Object.entries(vocabulary);
flashcards = shuffleArray(flashcards);
let currentFlashcard = [];

function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showNextFlashcard() {
    if (flashcards.length === 0) {
        flashcardFront.textContent = "Карточки закончились!";
        flashcardBack.textContent = "";
        showTranslationBtn.disabled = true;
        return;
    }
    currentFlashcard = flashcards.pop();
    flashcardFront.textContent = currentFlashcard[0];
    flashcardBack.textContent = currentFlashcard[1];
    flashcard.classList.remove('flip');
}

showNextFlashcard();

showTranslationBtn.addEventListener('click', () => {
    flashcard.classList.add('flip');
});

nextCardBtn.addEventListener('click', () => {
    showNextFlashcard();
});

// Анимация переворота карточки при добавлении класса 'flip'
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
});

// Логика всплывающего окна (Pop-up)
const popupOverlay = document.getElementById('popup-overlay');
const closePopupBtn = document.getElementById('close-popup');
const closePopupBtn2 = document.getElementById('close-popup-btn');

// Функция для открытия попапа
function openPopup() {
    popupOverlay.classList.add('active');
}

// Функция для закрытия попапа
function closePopup() {
    popupOverlay.classList.remove('active');
}

// Открыть попап при загрузке страницы
window.addEventListener('load', openPopup);

// Закрыть попап при клике на кнопку закрытия
closePopupBtn.addEventListener('click', closePopup);
closePopupBtn2.addEventListener('click', closePopup);

// Закрыть попап при клике вне области контента
window.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});