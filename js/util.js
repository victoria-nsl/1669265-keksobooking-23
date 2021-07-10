const ALERT_SHOW_TIME = 5000;
const KEY_ESCAPE= 'Escape';
const KEY_ESC = 'Esc';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscEvent = (evt) =>  evt.key ===  KEY_ESCAPE || evt.key === KEY_ESC;

export {showAlert, debounce, isEscEvent};
