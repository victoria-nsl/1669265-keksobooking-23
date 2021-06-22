const formAd = document.querySelector('.ad-form');
const headerFormAd = document.querySelector('.ad-form-header');
const elementsFormAd = document.querySelectorAll('.ad-form__element');
const buttonSubmitFormAd = document.querySelector('.ad-form__submit');
const buttonResetFormAd = document.querySelector('.ad-form__reset');
const formMap = document.querySelector('.map__filters');
const listFeaturesMap = document.querySelector('.map__features');
const filtersMap = document.querySelectorAll('.map__filter');

//ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АКТИВНОГО/НЕАКТИВНОГО СОСТОЯНИЯ
const  toggleInActiveStatePage  = (isInActive) => {
  if (isInActive) {
    formAd.classList.add('ad-form--disabled');
    formMap.classList.add('map__filters--disabled');
  }  else {
    formAd.classList.remove('ad-form--disabled');
    formMap.classList.remove('map__filters--disabled');
  }
  headerFormAd.disabled = isInActive;
  elementsFormAd.forEach((elementFormAd) => {elementFormAd.disabled = isInActive;});
  buttonSubmitFormAd.disabled = isInActive;
  buttonResetFormAd.disabled = isInActive;
  listFeaturesMap.disabled = isInActive;
  filtersMap.forEach((filterMap) => {filterMap.disabled = isInActive;});
};

toggleInActiveStatePage(false);

//ВАЛИДАЦИЯ ФОРМЫ
const titleAd = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const roomNumber = document.querySelector('#room_number');
const capacityRoom = document.querySelector('#capacity');
const capacityRoomOptions = capacityRoom.querySelectorAll('option');
const capacityRoomOptionNoGuests = capacityRoom.querySelector('[value="0"]');
const ROOM_NO_GUESTS = 100;

const timeIn = document.querySelector('#timein');
const timeInOptions = timeIn.querySelectorAll('option');
const timeOut= document.querySelector('#timeout');
const timeOutOptions = timeOut.querySelectorAll('option');

const typeHousing = document.querySelector('#type');
const MinPriceHousing = {
  bungalow: 0,
  flat: 1000,
  house: 3000,
  hotel: 5000,
  palace:10000,
};

const priceAd = document.querySelector('#price');
const MAX_PRICE = 1000000;

//Заголовок объявления
titleAd.addEventListener('input', () => {
  const valueLength = titleAd.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAd.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAd.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleAd.setCustomValidity('');
  }
  titleAd.reportValidity();
});

//Количество комнат и количество мест
roomNumber.addEventListener('change', (evt) => {
  const selectedRoom = evt.target.value;
  (capacityRoomOptions).forEach((capacityRoomOption) => {
    if (selectedRoom < ROOM_NO_GUESTS)  {
      capacityRoomOption.disabled = capacityRoomOption.value > selectedRoom;
      capacityRoomOptionNoGuests.disabled = true;
    } else {
      capacityRoomOption.disabled = true;
      capacityRoomOptionNoGuests.disabled = false;
    }
  });
});

//Время заезда, Время выезда
const getControlTime = (timeSelected,timeControl, timeControlOptions) => {
  timeControlOptions.forEach((timeControlOption) => {
    if (timeControlOption.value === timeSelected) {
      timeControl.value = timeControlOption.value;
    }
  });
};

timeIn.addEventListener('change', (evt) => {
  getControlTime(evt.target.value, timeOut, timeOutOptions);
});

timeOut.addEventListener('change', (evt) => {
  getControlTime(evt.target.value, timeIn, timeInOptions);
});

// Тип жилья
typeHousing.addEventListener('change', (evt) => {
  const selectedtypeHousing = evt.target.value;
  priceAd.min = MinPriceHousing[selectedtypeHousing];
  priceAd.placeholder = MinPriceHousing[selectedtypeHousing];
});


//Цена за ночь
priceAd.addEventListener('input', () => {
  if (priceAd.value > MAX_PRICE) {
    priceAd.setCustomValidity('Цена не может быть больше 1 000 000');
  } else if (priceAd.value < priceAd.min ){
    priceAd.setCustomValidity(`Цена не может быть меньше ${priceAd.min}`);
  } else {
    priceAd.setCustomValidity('');
  }
  priceAd.reportValidity();
});

