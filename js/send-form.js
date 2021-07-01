import {sendData} from './api.js';
import {formAd, priceAd,buttonResetFormAd} from './form.js';
import {resetDataMap} from './map.js';


//ВОССТАНОВЛЕНИЕ ПЕРВОНАЧАЛЬНЫХ ДАННЫХ ФОРМЫ И КАРТЫ
const restoreData = () => {
  formAd.reset();
  priceAd.placeholder = '1000';
  resetDataMap();
};

//ВОССТАНОВЛЕНИЕ ПЕРВОНАЧАЛЬНЫХ ДАННЫХ ПРИ НАЖАТИИ НА КНОПКУ ОЧИСТИТЬ
buttonResetFormAd.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreData();
});


//ПОКАЗ СООБЩЕНИЙ ОБ УСПЕШНОЙ/НЕУСПЕШНОЙ ОТПРАВКЕ ФОРМЫ
const templateSuccess = document.querySelector('#success').content;
const templatePopupSuccess = templateSuccess.querySelector('.success');
const templateError = document.querySelector('#error').content;
const templatePopupError = templateError.querySelector('.error');

const popupSuccess = templatePopupSuccess.cloneNode(true);
document.body.append(popupSuccess);
popupSuccess.classList.add('hidden');

const popupError = templatePopupError.cloneNode(true);
document.body.append(popupError);
popupError.classList.add('hidden');
const errorButton = popupError.querySelector('.error__button');

const isEscEvent = (evt) =>  evt.key === 'Escape' || evt.key === 'Esc';

//Показ сообщения об Успехе
const onPopupEscKeydownSuccess = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModalSuccess();
  }
};

const onPopupClickSuccess = (evt) => {
  evt.preventDefault();
  closeUserModalSuccess();
};

function closeUserModalSuccess() {
  popupSuccess.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownSuccess);
  document.removeEventListener('click', onPopupClickSuccess);
  restoreData();
}

const getPopupSuccess = () => {
  popupSuccess.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydownSuccess);
  document.addEventListener('click', onPopupClickSuccess);
};

//Показ сообщения об Ошибке
const onPopupClickError = (evt) => {
  evt.preventDefault();
  closeUserModalError();
};

const onPopupEscKeydownError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModalError();
  }
};

function closeUserModalError() {
  popupError.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownError);
  document.removeEventListener('click', onPopupClickError);
  errorButton.removeEventListener('click', onPopupClickError);
}

const getPopupError = () => {
  popupError.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydownError);
  document.addEventListener('click', onPopupClickError);
  errorButton.addEventListener('click', onPopupClickError);
};

//ОТПРАВКА ФОРМЫ
formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    getPopupSuccess,
    getPopupError,
    new FormData(evt.target),
  );
});

