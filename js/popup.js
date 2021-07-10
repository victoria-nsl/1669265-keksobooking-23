const HousingRussian = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const templateCard = document.querySelector('#card').content;
const templatePopup = templateCard.querySelector('.popup');

const  translateTypeHousingRussian= (housingType) => HousingRussian[housingType.toUpperCase()];

const  setOfferFieldVisibility = (field, visible) => {
  if (visible) {
    field.classList.remove('hidden');
    return;
  }
  field.classList.add('hidden');
};

const  setOfferFieldContent = (field, content, isHtml) => {
  if (isHtml) {
    field.innerHTML = content;
    return;
  }
  field.textContent = content;
};

const createPopups = (similarOffers) =>
  similarOffers.map((similarOffer) => {
    const popup = templatePopup.cloneNode(true);

    const title = popup.querySelector('.popup__title');
    setOfferFieldVisibility(title, similarOffer.offer.title);
    setOfferFieldContent(title, similarOffer.offer.title, false);

    const address = popup.querySelector('.popup__text--address');
    setOfferFieldVisibility(address, similarOffer.offer.address);
    setOfferFieldContent(address, similarOffer.offer.address, false);

    const price = popup.querySelector('.popup__text--price');
    setOfferFieldVisibility(price,similarOffer.offer.price);
    setOfferFieldContent(price, `${similarOffer.offer.price} <span>₽/ночь</span>`, true);

    const type = popup.querySelector('.popup__type');
    setOfferFieldVisibility(type, similarOffer.offer.type);
    setOfferFieldContent(type, translateTypeHousingRussian(similarOffer.offer.type), false);

    const capacity = popup.querySelector('.popup__text--capacity');
    setOfferFieldVisibility(capacity, (similarOffer.offer.rooms && similarOffer.offer.guests));
    setOfferFieldContent(capacity, `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`, false);

    const time = popup.querySelector('.popup__text--time');
    setOfferFieldVisibility(time, (similarOffer.offer.checkin && similarOffer.offer.checkout));
    setOfferFieldContent(time, `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`, false);

    const description = popup.querySelector('.popup__description');
    setOfferFieldVisibility(description, similarOffer.offer.description);
    setOfferFieldContent(description, similarOffer.offer.description, false);

    const avatar = popup.querySelector('.popup__avatar');
    setOfferFieldVisibility(avatar,similarOffer.author.avatar);
    avatar.src = similarOffer.author.avatar;

    const photosList = popup.querySelector('.popup__photos');
    const templatePhotosItem = popup.querySelector('.popup__photo');
    if (similarOffer.offer.photos && similarOffer.offer.photos.length) {
      const photosPopup  = similarOffer.offer.photos;
      setOfferFieldVisibility(photosList, photosPopup.length);
      photosList.innerHTML = '';
      photosPopup.forEach ((photoPopup) =>  {
        const photoItem = templatePhotosItem.cloneNode(true);
        photoItem.src = photoPopup;
        photosList.appendChild(photoItem);
      });
    } else {
      photosList.classList.add('hidden');
    }

    const featuresList = popup.querySelector('.popup__features');
    if (similarOffer.offer.features && similarOffer.offer.features.length) {
      const featuresPopup = similarOffer.offer.features;
      setOfferFieldVisibility(featuresList, featuresPopup.length);
      featuresList.innerHTML = '';
      featuresPopup.forEach ((featurePopup) =>  {
        const featuresItem  = document.createElement('li');
        featuresItem.classList.add('popup__feature');
        featuresItem.classList.add(`popup__feature--${featurePopup}`);
        featuresList.appendChild(featuresItem);
      });
    } else {
      featuresList.classList.add('hidden');
    }
    return popup;
  });

export {createPopups};
