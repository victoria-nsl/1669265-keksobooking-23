import {toggleInActiveStatePage} from './form.js';
import {similarOffers, popups} from './popup.js';


const addressAd = document.querySelector('#address');
const LAT_CENTER_TOKIO = 35.68950;
const LNG_CENTER_TOKIO = 139.69171;

//Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    toggleInActiveStatePage(false);
    addressAd.value = `${LAT_CENTER_TOKIO}, ${LNG_CENTER_TOKIO}`;
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

for (let i= 0; i < similarOffers.length; i++) {
  const lat = similarOffers[i].location.lat;
  const lng = similarOffers[i].location.lng;

  const iconUsual = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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

  markerUsual.addTo(map).bindPopup(popups[i], {keepInView: true});
}
