//ВАЛИДАЦИЯ ФОРМЫ
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const ROOM_NOT_GUESTS = 100;
const MAX_PRICE = 1000000;

const MinPriceHousing = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 3000,
  HOTEL: 5000,
  PALACE:10000,
};

const formAd = document.querySelector('.ad-form');
const titleAd = formAd.querySelector('#title');
const typeHousing = formAd.querySelector('#type');
const priceAd = formAd.querySelector('#price');
const timeIn = formAd.querySelector('#timein');
const timeOut= formAd.querySelector('#timeout');
const roomNumber = formAd.querySelector('#room_number');
const capacityRoom = formAd.querySelector('#capacity');
const capacityRoomOptions = capacityRoom.querySelectorAll('option');
const capacityRoomOptionNotGuests = capacityRoom.querySelector('[value="0"]');
const capacityRoomOptionOneGuest = capacityRoom.querySelector('[value="1"]');

titleAd.addEventListener('input', () => {
  const valueLength = titleAd.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAd.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAd.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleAd.setCustomValidity('');
  }
  titleAd.reportValidity();
});

const setOptionAttributes = (attribute, isDisabled, isSelected) => {
  attribute.disabled =  isDisabled;
  attribute.selected =  isSelected;
};

roomNumber.addEventListener('change', (evt) => {
  const selectedRoom = evt.target.value;
  capacityRoomOptions.forEach((capacityRoomOption) => {
    if (selectedRoom < ROOM_NOT_GUESTS)  {
      setOptionAttributes(capacityRoomOption, capacityRoomOption.value > selectedRoom, capacityRoomOption.value === selectedRoom);
      setOptionAttributes(capacityRoomOptionNotGuests, true, false);
      return;
    }
    setOptionAttributes(capacityRoomOption, true, false);
    setOptionAttributes(capacityRoomOptionNotGuests, false, true);
  });
});

capacityRoomOptions.forEach((capacityRoomOption) => {
  capacityRoomOption.disabled = capacityRoomOption.value !== capacityRoomOptionOneGuest.value;
});

const setControlTime = (timeFirst,timeSecond) => {
  timeSecond.value = timeFirst.value;
};

timeIn.addEventListener('change', (evt) => {
  setControlTime(evt.target, timeOut);
});

timeOut.addEventListener('change', (evt) => {
  setControlTime(evt.target, timeIn);
});

typeHousing.addEventListener('change', (evt) => {
  const typeHousingSelected = evt.target.value;
  priceAd.min = MinPriceHousing[typeHousingSelected.toUpperCase()];
  priceAd.placeholder = MinPriceHousing[typeHousingSelected.toUpperCase()];
});

priceAd.addEventListener('input', () => {
  if (+priceAd.value > MAX_PRICE) {
    priceAd.setCustomValidity('Цена не может быть больше 1 000 000');
  } else if (+priceAd.value < +priceAd.min ){
    priceAd.setCustomValidity(`Цена не может быть меньше ${priceAd.min}`);
  } else {
    priceAd.setCustomValidity('');
  }
  priceAd.reportValidity();
});
