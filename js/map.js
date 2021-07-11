import {toggleDisabledStatePage, toggleDisabledMapFilters} from './status-page.js';
import {createPopups} from './popup.js';
import {offersPromise} from './api.js';

const LAT_CENTER_TOKIO = 35.68950;
const LNG_CENTER_TOKIO = 139.69171;
const SIZES_ICON_MAIN = [52, 52];
const COORDINATES_TIP_ICON_MAIN = [26, 52];
const SIZES_ICON_USUAL = [40, 40];
const COORDINATES_TIP_ICON_USUAL = [20, 40];
const NUMBER_MARKER_MAP = 10;

const addressAd = document.querySelector('#address');

const createAddress = (latitude,longitude) => `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

toggleDisabledStatePage(true);
toggleDisabledMapFilters(true);

const map = L.map('map-canvas')
  .on('load', () => {
    toggleDisabledStatePage(false);
    addressAd.value = createAddress(LAT_CENTER_TOKIO, LNG_CENTER_TOKIO);
  })
  .setView({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const iconMain = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize:  SIZES_ICON_MAIN,
  iconAnchor: COORDINATES_TIP_ICON_MAIN,
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
  addressAd.value = createAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

const markerUsualGroup = L.layerGroup().addTo(map);

const setMarkerUsualOnMap = (offers) => {
  if (!offers) {
    return;
  }
  markerUsualGroup.clearLayers();
  const offersMap = offers.slice(0, NUMBER_MARKER_MAP);
  const popups = createPopups(offersMap);
  offersMap.forEach((similarOffer, index) => {
    const lat = similarOffer.location.lat;
    const lng = similarOffer.location.lng;
    const iconUsual = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: SIZES_ICON_USUAL,
      iconAnchor: COORDINATES_TIP_ICON_USUAL,
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
    markerUsual.addTo(markerUsualGroup).bindPopup(popups[index], {keepInView: true});
  });
};

(async () => {
  const similarOffers = await offersPromise;
  setMarkerUsualOnMap(similarOffers);
  toggleDisabledMapFilters(false);
}) ();

const resetDataMap= () => {
  map.setView({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }, 12);

  markerMain.setLatLng({
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  });

  addressAd.value = createAddress(LAT_CENTER_TOKIO, LNG_CENTER_TOKIO);
  (async () => {
    const similarOffers = await offersPromise;
    setMarkerUsualOnMap(similarOffers);
  }) ();
};

export {resetDataMap, setMarkerUsualOnMap};
