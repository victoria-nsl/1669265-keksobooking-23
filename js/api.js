import {showAlert} from './util.js';

const ERROR_MESSAGE = 'Произошла ошибка запроса. Попробуйте ещё раз';
const ADDRESS_RECEIVING_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const ADDRESS_SENDING_DATA = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onFail) =>
  fetch(ADDRESS_RECEIVING_DATA)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .catch(() => onFail(ERROR_MESSAGE));

const offersPromise = getData(showAlert);

const sendData = (onSuccess, onFail, body) => {
  fetch(ADDRESS_SENDING_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {sendData, offersPromise};
