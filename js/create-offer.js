import {getRandomNumber, getRandomNonintegerNumber, getRandomLengthMixedArray, getRandomArrayElement} from './util.js';

const TITLES = ['Лучшее предложение', 'Выгодное предложение', 'Уникальное жилье', 'Спецпредложение'];
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg]'];
const DESCRIPTIONS = ['Помещение для большой компании', 'Помещение для семей с детьми', 'Помещение для двоих', 'Помещение для одиноких туристов'];

const createOfferRentRealty = (userNumber) => {

  const latitude = getRandomNonintegerNumber(35.65000,35.70000,5);
  const longitude = getRandomNonintegerNumber(139.70000,139.80000,5);
  const getAvatarValue = () => userNumber < 10 ? `img/avatars/user${0}${userNumber}.png`: `img/avatars/user${userNumber}.png`;

  return {
    author: {
      avatar: getAvatarValue(),
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomNumber(100,1000),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomNumber(1,4),
      guests: getRandomNumber(1,10),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomLengthMixedArray(FEATURES),
      description:getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomLengthMixedArray(PHOTOS),
    },

    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

export {createOfferRentRealty};
