import {createOffers} from './create-ten-offers.js';

const templateCard = document.querySelector('#card').content;
const templatePopup = templateCard.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const similarOffers = createOffers();

//Функция, которая переводит название жилья с английского языка на русский

const getTypeHousingRussian = (housingType) => {
  switch(housingType) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
  }
};

//Функция, добавляющая необходимое количество фотографий в карточку похожих объявлений

const getPopupPhotos = (photos) => {
  let popupPhotos = '';
  for (let counter = 0; counter < photos.length; counter++) {
    popupPhotos = `${popupPhotos} <img src ="${photos[counter]}" width="45" height="40" alt="Фотография жилья">`;
  }
  return popupPhotos;
};

//Создание карточек похожих объявлений

const popups = similarOffers.map((similarOffer) => {

  const popup = templatePopup.cloneNode(true);

  popup.querySelector('.popup__title').textContent = similarOffer.offer.title;
  popup.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  popup.querySelector('.popup__text--price').innerHTML = `${similarOffer.offer.price} <span>₽/ночь</span>`;
  popup.querySelector('.popup__type').textContent = getTypeHousingRussian(similarOffer.offer.type);
  popup.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  popup.querySelector('.popup__description').textContent = similarOffer.offer.description;
  popup.querySelector('.popup__photos').innerHTML =getPopupPhotos(similarOffer.offer.photos);
  popup.querySelector('.popup__avatar').src = similarOffer.author.avatar;

  const featuresPopup = similarOffer.offer.features;
  const featuresList = popup.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');

  for (let i = 0; i < featuresItems.length; i++) {
    featuresItems[i].remove();
  }
  for (let j = 0; j < featuresPopup.length; j++) {
    const featuresItem  = document.createElement('li');
    featuresItem.classList.add('popup__feature');
    featuresItem.classList.add(`popup__feature--${featuresPopup[j]}`);
    featuresList.appendChild(featuresItem);
  }

  //Cкрытие блока в объявлении, если не хватает данных для заполнения
  for (let count = 2; count < popup.childNodes.length; count++) {
    if (!popup.childNodes[count].textContent) {
      popup.childNodes[count].hidden=true;
    }
  }

  return popup;
});

//Отрисовка первого объявления в блок карты

mapCanvas.appendChild(popups[0]);

