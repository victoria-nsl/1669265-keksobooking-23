//Функция, возвращающая случайное целое число из переданного диапазона включительно. Для решения задачи были использованы примеры с сайта: https://learn.javascript.ru/number

const getRandomNumber = (minNumber, maxNumber) => (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ?  Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber)) :'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';

getRandomNumber(1,10);


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomNonintegerNumber = (minNumber, maxNumber, numberDecimals) => (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ? (minNumber + Math.random() * (maxNumber - minNumber)).toFixed(numberDecimals) : 'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';

getRandomNonintegerNumber(5.1545,10.25,2);

//Функция перемешивания элементов в массиве, пример с сайта https://learn.javascript.ru/task/shuffle

const mixArray = (array) => {
  for (let counterFirst = array.length - 1; counterFirst > 0; counterFirst--) {
    const counterSecond = Math.floor(Math.random() * (counterFirst + 1));
    [array[counterFirst], array[counterSecond]] = [array[counterSecond], array[counterFirst]];
  }
  return array;
};

//Функция получения перемешанного массива случайной длины

const getRandomLengthMixedArray = (croppedArray) => {
  const randomNumber = getRandomNumber(0,croppedArray.length-1);
  const newMixArray = mixArray(croppedArray);
  return newMixArray.slice(0, randomNumber);
};

//Функция по поиску случайного элемента в переданном массиве

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Cоздание массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.

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

let numberAvatars = new Array(10).fill(null).map((value,index) => index + 1);
numberAvatars = mixArray(numberAvatars);

new Array(10).fill(null).map((value, index) => createOfferRentRealty(numberAvatars[index]));
