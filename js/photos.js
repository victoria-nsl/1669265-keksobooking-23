const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formAd = document.querySelector('.ad-form');
const fileChooserAvatar = formAd.querySelector('.ad-form-header__input');
const previewAvatar = formAd.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = formAd.querySelector('.ad-form__input');
const previewPhotoContainer = formAd.querySelector('.ad-form__photo');

const uploadPhoto = (fileChooser,preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

fileChooserAvatar.addEventListener('change', () => {
  uploadPhoto(fileChooserAvatar,previewAvatar);
});

const previewPhoto = document.createElement('img');
previewPhoto.style.width = '70px';
previewPhoto.style.height = '70px';
previewPhoto.style.padding = '5px';

fileChooserPhoto.addEventListener('change', () => {
  previewPhotoContainer.appendChild(previewPhoto);
  uploadPhoto(fileChooserPhoto,previewPhoto);
});
