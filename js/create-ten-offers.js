import {mixArray} from './util.js';
import {createOfferRentRealty} from './create-offer.js';

// Cоздание массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.
const numberOffer = 10;

let numberAvatars = new Array(numberOffer).fill(null).map((value,index) => index + 1);
numberAvatars = mixArray(numberAvatars);

const createOffers = () => new Array(numberOffer).fill(null).map((value, index) => createOfferRentRealty(numberAvatars[index]));

export {createOffers};
