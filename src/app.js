import Tesseract from 'tesseract.js';
import { Log } from './Log';
import defaultImage from './helloworld.jpg';

// Переменная для хранения выбранного файла
let file;
const lang = {value: 'eng',text: 'English',}

// Селект для выбора языков
// Инпут для загрузки файлов и активация drag-n-drop зоны
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

// Установка изображения по умолчанию
file = preview.src = defaultImage;

// Кнопка Начать обработку
const start = document.getElementById('start');

// Лог
const log = Log(document.getElementById('log'));

// Функция распознавания текста
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

// Начать обработку по клику на кнопку
start.addEventListener('click', () => {
  // Заблокировать кнопку
  start.disabled = true;

  recognize(file, 'eng')
  .then((data) => {
      // По окончании обработки вывести результат
      log.clear();
      log.setResult(data);
    })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
      // Разблокировать кнопку
      start.disabled = false;
    });
});
