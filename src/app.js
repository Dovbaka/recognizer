import Tesseract from 'tesseract.js'; //Підключення бібліотеки
import { Log } from './Log';
import defaultImage from './helloworld.jpg';

const intro = introJs();

intro.setOptions({
  steps: [
    {
      intro: 'Пропонуємо пройти короткий інструктаж користування програмою'
    },
    {
      element: '#fileBtn',
      intro: 'Для того щоб обрати файл натисніть на цю кнопку'
    },
    {
      element: '#preview',
      intro: 'В даному полі ви побачите обране зображення'
    },
    {
      element: '#start',
      intro: 'Натисніть на цю кнопку для початку розпізнавання'
    },
    {
      element: '#log',
      intro: 'Після завершення розпізнавання, результат зявиться у цьому полі'
    },
    {
      intro: 'Приємного користування!'
    },
  ]
})

intro.start();

// Змінна для зберігання обраного файлу
let file;
const lang = {value: 'eng',text: 'English',}

// Інпут для завантаження файлів і активація drag-n-drop зони
const preview = document.getElementById('preview');
const input = document.getElementById('file');

function createPreview(loadedFile) {
  const reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
  };
  reader.readAsDataURL(loadedFile);
}

input.addEventListener('change', () => {
  file = input.files[0];
  createPreview(file);
});

// Установка зображення за замовчуванням
file = preview.src = defaultImage;

// Кнопка початку розпізнавання
const start = document.getElementById('start');

// Лог
const log = Log(document.getElementById('log'));

// Функція розпізнавання тексту
function recognize(file) {
  return Tesseract.recognize(file, 'eng', {
    logger: (data) => {
      console.log('Progress:', data);
    },
  }).then((data) => {
    console.log('Result:', data);
    return data.data.text;
  });
}

  // Почати обробку при натисканні на кнопку
start.addEventListener('click', () => {
  // Заблокувати кнопку
  start.disabled = true;

  recognize(file, 'eng')
  .then((data) => {
      // Після закінчення обробки вивести результат
      log.clear();
      log.setResult(data);
    })
  .catch((err) => {
    alert("Нажаль відбулась помилка розпізнавання");
  })
  .finally(() => {
      // Розблокувати кнопку
      start.disabled = false;
    });
});
