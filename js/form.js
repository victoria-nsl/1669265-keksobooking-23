const formAd = document.querySelector('.ad-form');
const headerFormAd = document.querySelector('.ad-form-header');
const elementsFormAd = document.querySelectorAll('.ad-form__element');
const buttonSubmitFormAd = document.querySelector('.ad-form__submit');
const buttonResetFormAd = document.querySelector('.ad-form__reset');
const formMap = document.querySelector('.map__filters');
const listFeaturesMap = document.querySelector('.map__features');
const filtersMap = document.querySelectorAll('.map__filter');

//ФУНКЦИЯ ПЕРЕКЛЮЧИЕНИЯ АКТИВНОГО/НЕАКТИВНОГО СОСТОЯНИЯ
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

toggleInActiveStatePage(true);


