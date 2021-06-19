import {createOffers} from './create-ten-offers.js';

const templateCard = document.querySelector('#card').content;
const templatePopup = templateCard.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const HousingRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarOffers = createOffers();

//Функция перевода типа жилища с английского на русский язык
const  getTypeHousingRussian= (housingType) => HousingRussian[housingType];

//Функция добавления/удаления класса hidden на поле карточки
const  setOfferFieldVisibility = (field, visible) => {
  if (visible) {
    field.classList.remove('hidden');
    return;
  }
  field.classList.add('hidden');
};

//Функция добавления текстового содержимого/разметки для элемента
const  setOfferFieldContent = (field, content, isHtml) => {
  if (isHtml) {
    field.innerHTML = content;
    return;
  }
  field.textContent = content;
};

//CОЗДАНИЕ КАРТОЧЕК ПОХОЖИХ ОБЪЯВЛЕНИЙ

const popups = similarOffers.map((similarOffer) => {

  const popup = templatePopup.cloneNode(true);

  //Заголовок
  const title = popup.querySelector('.popup__title');
  setOfferFieldVisibility(title, similarOffer.offer.title);
  setOfferFieldContent(title, similarOffer.offer.title, false);

  //Адрес
  const address = popup.querySelector('.popup__text--address');
  setOfferFieldVisibility(address, similarOffer.offer.address);
  setOfferFieldContent(address, similarOffer.offer.address, false);

  //Цена
  const price = popup.querySelector('.popup__text--price');
  setOfferFieldVisibility(price,similarOffer.offer.price);
  setOfferFieldContent(price, `${similarOffer.offer.price} <span>₽/ночь</span>`, true);

  //Тип жилища
  const type = popup.querySelector('.popup__type');
  setOfferFieldVisibility(type, similarOffer.offer.type);
  setOfferFieldContent(type, getTypeHousingRussian(similarOffer.offer.type), false);

  //Количество комнат и гостей
  const capacity = popup.querySelector('.popup__text--capacity');
  setOfferFieldVisibility(capacity, (similarOffer.offer.rooms && similarOffer.offer.guests));
  setOfferFieldContent(capacity, `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`, false);

  //Часы заезда и выезда
  const time = popup.querySelector('.popup__text--time');
  setOfferFieldVisibility(time, (similarOffer.offer.checkin && similarOffer.offer.checkout));
  setOfferFieldContent(time, `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`, false);

  //Описание номера
  const description = popup.querySelector('.popup__description');
  setOfferFieldVisibility(description, similarOffer.offer.description);
  setOfferFieldContent(description, similarOffer.offer.description, false);

  //Аватарка
  const avatar = popup.querySelector('.popup__avatar');
  setOfferFieldVisibility(avatar,similarOffer.author.avatar);
  avatar.src = similarOffer.author.avatar;

  //Фото
  const photosList = popup.querySelector('.popup__photos');
  const photosPopup  = similarOffer.offer.photos;
  const templatePhotosItem = popup.querySelector('.popup__photo');

  setOfferFieldVisibility(photosList, photosPopup.length);
  photosList.innerHTML = '';
  photosPopup.forEach ((photoPopup) =>  {
    const photoItem = templatePhotosItem.cloneNode(true);
    photoItem.src = photoPopup;
    photosList.appendChild(photoItem);
  });

  //Преимущества, удобства
  const featuresList = popup.querySelector('.popup__features');
  const featuresPopup = similarOffer.offer.features;

  setOfferFieldVisibility(featuresList, featuresPopup.length);
  featuresList.innerHTML = '';
  featuresPopup.forEach ((featurePopup) =>  {
    const featuresItem  = document.createElement('li');
    featuresItem.classList.add('popup__feature');
    featuresItem.classList.add(`popup__feature--${featurePopup}`);
    featuresList.appendChild(featuresItem);
  });

  return popup;
});

//ОТРИСОВКА ПЕРВОГО ОБЪЯВЛЕНИЯ В БЛОКЕ С КАРТОЙ

mapCanvas.appendChild(popups[0]);

