const formAd = document.querySelector('.ad-form');
const headerFormAd = formAd.querySelector('.ad-form-header');
const elementsFormAd = formAd.querySelectorAll('.ad-form__element');
const buttonSubmitFormAd = formAd.querySelector('.ad-form__submit');
const buttonResetFormAd = formAd.querySelector('.ad-form__reset');
const formMap = document.querySelector('.map__filters');
const listFeaturesMap = formMap.querySelector('.map__features');
const filtersMap = formMap.querySelectorAll('.map__filter');

//ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АКТИВНОГО/НЕАКТИВНОГО СОСТОЯНИЯ
const  toggleInActiveStatePage  = (isInActive) => {
  if (isInActive) {
    formAd.classList.add('ad-form--disabled');
    formMap.classList.add('map__filters--disabled');
  }  else {
    formAd.classList.remove('ad-form--disabled');
    formMap.classList.remove('map__filters--disabled');
  }
  headerFormAd.disabled = isInActive;
  elementsFormAd.forEach((elementFormAd) => {elementFormAd.disabled = isInActive;});
  buttonSubmitFormAd.disabled = isInActive;
  buttonResetFormAd.disabled = isInActive;
  listFeaturesMap.disabled = isInActive;
  filtersMap.forEach((filterMap) => {filterMap.disabled = isInActive;});
};

export {toggleInActiveStatePage, formAd, formMap, buttonResetFormAd, listFeaturesMap};
