import {sendData} from './api.js';
import {resetDataMap} from './map.js';
import {isEscEvent} from './util.js';

const MinPriceHousing = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 3000,
  HOTEL: 5000,
  PALACE:10000,
};
const formAd = document.querySelector('.ad-form');
const previewAvatar = formAd.querySelector('.ad-form-header__preview img');
const priceAd = formAd.querySelector('#price');
const roomNumber = formAd.querySelector('#room_number');
const roomNumberSelected = roomNumber.querySelector('[selected]');
const capacityRoom = formAd.querySelector('#capacity');
const capacityRoomOptions = capacityRoom.querySelectorAll('option');
const capacityRoomOptionNotGuests = capacityRoom.querySelector('[value="0"]');
const previewPhotoContainer = formAd.querySelector('.ad-form__photo');
const buttonResetFormAd = formAd.querySelector('.ad-form__reset');

const formMap = document.querySelector('.map__filters');

const templateSuccess = document.querySelector('#success').content;
const templatePopupSuccess = templateSuccess.querySelector('.success');
const templateError = document.querySelector('#error').content;
const templatePopupError = templateError.querySelector('.error');

const restoreData = () => {
  formAd.reset();
  priceAd.placeholder = MinPriceHousing.FLAT;
  priceAd.min = MinPriceHousing.FLAT;
  capacityRoomOptions.forEach((capacityRoomOption) => {
    capacityRoomOption.disabled = capacityRoomOption.value > roomNumberSelected.value;
    capacityRoomOptionNotGuests.disabled = true;
  });
  resetDataMap();
  formMap.reset();
  previewAvatar.src = 'img/muffin-grey.svg';
  const previewPhoto = previewPhotoContainer.querySelector('img');
  if (previewPhotoContainer.contains(previewPhoto)) {
    previewPhotoContainer.removeChild(previewPhoto);
  }
};

buttonResetFormAd.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreData();
});

const popupSuccess = templatePopupSuccess.cloneNode(true);
const popupError = templatePopupError.cloneNode(true);
const errorButton = popupError.querySelector('.error__button');

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

const showPopupSuccess = () => {
  document.body.appendChild(popupSuccess);
  popupSuccess.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showPopupError = () => {
  document.body.appendChild(popupError);
  document.addEventListener('keydown', onPopupEscKeydown);
  popupError.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', onPopupClick);
};

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    showPopupSuccess,
    showPopupError,
    new FormData(evt.target),
  );
});

