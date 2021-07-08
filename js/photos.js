const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('.ad-form__input');
const previewPhotoContainer = document.querySelector('.ad-form__photo');

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

export {previewAvatar, previewPhotoContainer, previewPhoto};
