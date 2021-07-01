import {toggleInActiveStatePage} from './form.js';
import {similarOffers, popups} from './popup.js';

const addressAd = document.querySelector('#address');
const LAT_CENTER_TOKIO = 35.68950;
const LNG_CENTER_TOKIO = 139.69171;
const ICON_SIZE_MAIN = [52, 52];
const ICON_ANCOR_MAIN = [26, 52];
const ICON_SIZE_USIAL = [40, 40];
const ICON_ANCOR_USIAL = [20, 40];

//Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    toggleInActiveStatePage(false);
    addressAd.value = `${LAT_CENTER_TOKIO}, ${LNG_CENTER_TOKIO}`;
  })
  .setView({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }, 12);

//Создание слоя
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Специальная, «главная», метка
const iconMain = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: ICON_SIZE_MAIN,
  iconAnchor: ICON_ANCOR_MAIN,
});

const markerMain = L.marker(
  {
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  },

  {
    draggable: true,
    icon: iconMain,
  },
);

markerMain.addTo(map);

markerMain.on('moveend', (evt) => {
  addressAd.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


//Обычная метка

similarOffers.forEach((similarOffer, index) => {
  const lat = similarOffer.location.lat;
  const lng = similarOffer.location.lng;

  const iconUsual = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: ICON_SIZE_USIAL,
    iconAnchor: ICON_ANCOR_USIAL,
  });

  const markerUsual = L.marker(
    {
      lat,
      lng,
    },

    {
      icon: iconUsual,
    },
  );

  markerUsual.addTo(map).bindPopup(popups[index], {keepInView: true});
});


//Восстановление первоначальных данных карты
const resetDataMap= () => {
  map.setView({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }, 12);

  markerMain.setLatLng({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  });

  addressAd.value = `${LAT_CENTER_TOKIO}, ${LNG_CENTER_TOKIO}`;
};

export {resetDataMap};
