import {offersPromise} from './api.js';
import {setMarkerUsualOnMap} from './map.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const ValuesPriceFilter = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH:'high',
};

const formMap = document.querySelector('.map__filters');
const typeHousingFilter = formMap.querySelector('#housing-type');
const priceHousingFilter = formMap.querySelector('#housing-price');
const roomsHousingFilter = formMap.querySelector('#housing-rooms');
const guestsHousingFilter = formMap.querySelector('#housing-guests');
const listFeaturesMap = formMap.querySelector('.map__features');
const featuresHousingFilters = listFeaturesMap.querySelectorAll('.map__checkbox');

const getSelectedFeatures = () => {
  const selectedFeatures = [];
  featuresHousingFilters.forEach((feature) => {
    if (feature.checked) {
      selectedFeatures.push(feature.value);
    }
  });
  return selectedFeatures;
};

const isValueMatch = (valueСheckedObject, valueFilter) => valueFilter !=='any' ?  valueСheckedObject === +valueFilter : true;

const isTypeMatch = (valueСheckedObject,valueFilter) => valueFilter !== 'any' ? valueСheckedObject === valueFilter : true;

const isFeaturesMatch = (valueСheckedObject,valuesFilter) => valueСheckedObject ? valuesFilter.every((valueFilter) => valueСheckedObject.includes(valueFilter)) : false;

const isPriceMatch = (valueСheckedObject,valueFilter) => {

  const isAnyFilter = valueFilter ===  ValuesPriceFilter.ANY;
  const isMiddleFilter = valueFilter ===  ValuesPriceFilter.MIDDLE && valueСheckedObject >= LOW_PRICE && valueСheckedObject <= HIGH_PRICE;
  const isLowFilter = valueFilter ===  ValuesPriceFilter.LOW && valueСheckedObject < LOW_PRICE;
  const isHighFilter =  valueFilter ===  ValuesPriceFilter.HIGH && valueСheckedObject > HIGH_PRICE;

  return isAnyFilter || isMiddleFilter || isLowFilter || isHighFilter;
};

const  createFilteredOffers = debounce(async () => {
  const similarOffers = await offersPromise;

  const typeFilter = typeHousingFilter.value;
  const priceFilter = priceHousingFilter.value;
  const roomsFilter = roomsHousingFilter.value;
  const guestsFilter = guestsHousingFilter.value;
  const featuresFilter = getSelectedFeatures();

  const filteredOffers = similarOffers.filter((similarOffer) =>  isTypeMatch(similarOffer.offer.type, typeFilter)
  && isPriceMatch(similarOffer.offer.price, priceFilter) && isValueMatch(similarOffer.offer.rooms, roomsFilter) &&
  isValueMatch(similarOffer.offer.guests, guestsFilter) && isFeaturesMatch(similarOffer.offer.features, featuresFilter));

  setMarkerUsualOnMap(filteredOffers);

}, RERENDER_DELAY);


formMap.addEventListener('change', () => {
  createFilteredOffers();
});
