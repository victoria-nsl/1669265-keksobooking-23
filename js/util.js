//Функция, возвращающая случайное целое число из переданного диапазона включительно. Для решения задачи были использованы примеры с сайта: https://learn.javascript.ru/number

const getRandomNumber = (minNumber, maxNumber) => (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ?  Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber)) :'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomNonintegerNumber = (minNumber, maxNumber, numberDecimals) => (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ? (minNumber + Math.random() * (maxNumber - minNumber)).toFixed(numberDecimals) : 'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';

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

export {getRandomNumber, getRandomNonintegerNumber, mixArray, getRandomLengthMixedArray, getRandomArrayElement};
