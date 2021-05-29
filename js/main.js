//Функция, возвращающая случайное целое число из переданного диапазона включительно. Для решения задачи были использованы примеры с сайта: https://learn.javascript.ru/number

const getRandomNumber = function (minNumber, maxNumber) {
  return (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ?  Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber)) :'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';
};

getRandomNumber(1,10);


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomNonintegerNumber = function (minNumber, maxNumber, numberDecimals) {
  return (maxNumber > minNumber && minNumber >= 0 && maxNumber > 0) ? (minNumber + Math.random() * (maxNumber - minNumber)).toFixed(numberDecimals) : 'Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль';
};

getRandomNonintegerNumber(5.1545,10.25,2);
