const ALERT_SHOW_TIME = 5000;

//Функция показа окна  сообщения
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left ='20%';
  alertContainer.style.top = '30%';
  alertContainer.style.right = '20%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//Функция перемешивания элементов в массиве, пример с сайта https://learn.javascript.ru/task/shuffle
const mixArray = (array) => {
  for (let counterFirst = array.length - 1; counterFirst > 0; counterFirst--) {
    const counterSecond = Math.floor(Math.random() * (counterFirst + 1));
    [array[counterFirst], array[counterSecond]] = [array[counterSecond], array[counterFirst]];
  }
  return array;
};

// Функция для устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Функция проверки клавиши Esc
const isEscEvent = (evt) =>  evt.key === 'Escape' || evt.key === 'Esc';

export {showAlert, mixArray, debounce, isEscEvent};
