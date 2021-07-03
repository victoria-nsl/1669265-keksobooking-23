import {sendData} from './api.js';
import {formAd, formMap,buttonResetFormAd} from './status-page.js';
import {priceAd, MinPriceHousing,  roomNumberSelected, capacityRoomOptions, capacityRoomOptionNoGuests} from './form-validation.js';
import {resetDataMap} from './map.js';

const templateSuccess = document.querySelector('#success').content;
const templatePopupSuccess = templateSuccess.querySelector('.success');
const templateError = document.querySelector('#error').content;
const templatePopupError = templateError.querySelector('.error');

//ВОССТАНОВЛЕНИЕ ПЕРВОНАЧАЛЬНЫХ ДАННЫХ ФОРМЫ И КАРТЫ
const restoreData = () => {
  formAd.reset();
  priceAd.placeholder = MinPriceHousing.FLAT;
  priceAd.min = MinPriceHousing.FLAT;
  capacityRoomOptions.forEach((capacityRoomOption) => {
    capacityRoomOption.disabled = capacityRoomOption.value > roomNumberSelected.value;
    capacityRoomOptionNoGuests.disabled = true;
  });
  resetDataMap();
  formMap.reset();
};

//ВОССТАНОВЛЕНИЕ ПЕРВОНАЧАЛЬНЫХ ДАННЫХ ПРИ НАЖАТИИ НА КНОПКУ ОЧИСТИТЬ
buttonResetFormAd.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreData();
});

//ПОКАЗ СООБЩЕНИЙ ОБ УСПЕШНОЙ/НЕУСПЕШНОЙ ОТПРАВКЕ ФОРМЫ
const popupSuccess = templatePopupSuccess.cloneNode(true);
const popupError = templatePopupError.cloneNode(true);
const errorButton = popupError.querySelector('.error__button');

const isEscEvent = (evt) =>  evt.key === 'Escape' || evt.key === 'Esc';

const closePopup = () => {
  if (document.body.contains(popupSuccess)) {
    document.body.removeChild(popupSuccess);
    restoreData();
    return;
  }
  document.body.removeChild(popupError);
};

const onPopupClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const getPopupSuccess = () => {
  document.body.appendChild(popupSuccess);
  popupSuccess.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const getPopupError = () => {
  document.body.appendChild(popupError);
  document.addEventListener('keydown', onPopupEscKeydown);
  popupError.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', onPopupClick);
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

