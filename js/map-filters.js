import {offersPromise} from './api.js';
import {setMarkerUsualOnMap} from './map.js';
import {formMap, listFeaturesMap} from './status-page.js';
import {debounce} from './util.js';

const typeHousingFilter = formMap.querySelector('#housing-type');
const priceHousingFilter = formMap.querySelector('#housing-price');
const roomsHousingFilter = formMap.querySelector('#housing-rooms');
const guestsHousingFilter = formMap.querySelector('#housing-guests');
const featuresHousingFilters = listFeaturesMap.querySelectorAll('.map__checkbox');

const RERENDER_DELAY = 500;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const ValuesTypeHousingFilter = {
  ANY: 'any',
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};

const ValuesPriceFilter = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH:'high',
};

const ValuesRoomsFilter = {
  ANY: 'any',
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const ValuesGuestsFilter = {
  ANY: 'any',
  ONE: 1,
  TWO: 2,
  NOT_GIEST: 0,
};

const  createFilteredOffers = () => {
  (async () => {
    const similarOffers = await offersPromise;

    const typeFilter = typeHousingFilter.value;
    const priceFilter = priceHousingFilter.value;
    const roomsFilter = roomsHousingFilter.value;
    const guestsFilter = guestsHousingFilter.value;

    const getSelectedFeatures = () => {
      const selectedFeatures = [];
      featuresHousingFilters.forEach((feature) => {
        if (feature.checked) {
          selectedFeatures.push(feature.value);
        }
      });
      return selectedFeatures;
    };

    const featuresFilter = getSelectedFeatures();

    const filteredOffers = similarOffers.filter((similarOffer) => {

      const isTypeMatch = (checkedObject,valueFulter) => {
        if (valueFulter !== ValuesTypeHousingFilter.ANY) {
          return checkedObject.offer.type === valueFulter;
        }
        return true;
      };

      const isPriceMatch = (checkedObject,valueFulter) => {
        if ((valueFulter ===  ValuesPriceFilter.ANY) ||
        (valueFulter ===  ValuesPriceFilter.MIDDLE && checkedObject.offer.price >= LOW_PRICE
        && checkedObject.offer.price <= HIGH_PRICE) ||
        (valueFulter ===  ValuesPriceFilter.LOW && checkedObject.offer.price < LOW_PRICE) ||
        (valueFulter ===  ValuesPriceFilter.HIGH && checkedObject.offer.price > HIGH_PRICE)) {
          return true;
        }
        return false;
      };

      const isRoomsMatch = (checkedObject,valueFulter) => {
        if (valueFulter !== ValuesRoomsFilter.ANY) {
          return checkedObject.offer.rooms === +valueFulter;
        }
        return true;
      };

      const isGuestsMatch = (checkedObject,valueFulter) => {
        if (valueFulter !==  ValuesGuestsFilter.ANY) {
          return checkedObject.offer.guests === +valueFulter;
        }
        return true;
      };

      const isFeaturesMatch = (checkedObject,valuesFulter) => {
        if (checkedObject.offer.features) {
          return valuesFulter.every((valueFulter) => checkedObject.offer.features.includes(valueFulter));
        }
        return false;
      };

      return isTypeMatch(similarOffer,typeFilter) && isPriceMatch(similarOffer, priceFilter) &&
      isRoomsMatch(similarOffer, roomsFilter) && isGuestsMatch(similarOffer, guestsFilter)  &&
      isFeaturesMatch(similarOffer, featuresFilter);
    });
    debounce(setMarkerUsualOnMap(filteredOffers),RERENDER_DELAY);
  })();
};

formMap.addEventListener('change', () => {
  createFilteredOffers();
});
