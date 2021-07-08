const formAd = document.querySelector('.ad-form');
const headerFormAd = formAd.querySelector('.ad-form-header');
const elementsFormAd = formAd.querySelectorAll('.ad-form__element');
const formMap = document.querySelector('.map__filters');
const listFeaturesMap = formMap.querySelector('.map__features');
const filtersMap = formMap.querySelectorAll('.map__filter');

//ФУНКЦИИ ПЕРЕКЛЮЧЕНИЯ АКТИВНОГО/НЕАКТИВНОГО СОСТОЯНИЯ
const  toggleDisabledStatePage  = (isInActive) => {
  if (isInActive) {
    formAd.classList.add('ad-form--disabled');
  }  else {
    formAd.classList.remove('ad-form--disabled');
  }
  headerFormAd.disabled = isInActive;
  elementsFormAd.forEach((elementFormAd) => {elementFormAd.disabled = isInActive;});
};

const  toggleDisabledMapFilters  = (isInActive) => {
  if (isInActive) {
    formMap.classList.add('map__filters--disabled');
  }  else {
    formMap.classList.remove('map__filters--disabled');
  }
  listFeaturesMap.disabled = isInActive;
  filtersMap.forEach((filterMap) => {filterMap.disabled = isInActive;});
};

export {toggleDisabledStatePage, toggleDisabledMapFilters, formAd, formMap, listFeaturesMap};
