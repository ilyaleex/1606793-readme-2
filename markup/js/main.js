'use strict';

'use script';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    },

    getScrollbarWidth: function () {
      return window.innerWidth - document.documentElement.clientWidth;
    }
  }
})();
'use script';

(function () {
  var activeModal = document.querySelector('.modal--active');
  var modal = document.querySelector('.modal');
  var modalAdding = document.querySelector('.modal--adding');
  var addingPostSubmit = document.querySelector('.adding-post__submit');
  var scrollbarWidth = window.util.getScrollbarWidth() + 'px';
  var pageMainSection = document.querySelector('.page__main-section');
  var footerWrapper = document.querySelector('.footer__wrapper');

  var showModal = function (openButton, modal) {
    var closeButton = modal.querySelector('.modal__close-button');

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closeModal);
    };

    var closeModal = function (evt) {
      modal.classList.remove('modal--active');
      activeModal = false;
      document.removeEventListener('keydown', onPopupEscPress);
      document.documentElement.style.overflowY = 'auto';
      pageMainSection.style.paddingRight = '0';
      footerWrapper.style.paddingRight = '0';
    }

    var openModal = function (evt) {
      if (activeModal) {
        activeModal.classList.remove('modal--active');
      }

      modal.classList.add('modal--active');
      activeModal = modal;
      document.documentElement.style.overflowY = 'hidden';
      pageMainSection.style.paddingRight = scrollbarWidth;
      footerWrapper.style.paddingRight = scrollbarWidth;
      closeButton.focus();

      closeButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        closeModal();
      });

      modal.addEventListener('click', function (evt) {
        if (evt.target === modal) {
          closeModal();
        }
      })

      document.addEventListener('keydown', onPopupEscPress);
    }

    openButton.addEventListener('click', function (evt) {
      openModal();
    });
  }

  // if (modal) {
  //   showModal(addingPostSubmit, modalAdding);
  // }
})();
(function () {
  var dropzone = document.querySelector('dropzone');
  var registrationFileZone = document.querySelector('.registration__file-zone');
  var addingPostPhotoFileZone = document.querySelector('.adding-post__file-zone--photo');
  var addingPostVideoFileZone = document.querySelector('.adding-post__file-zone--video');

  var inputsFile = document.querySelectorAll('input[type="file"]');

  if (inputsFile) {
    var addClickListener = function (inputFile) {
      inputFile.addEventListener('click', function (evt) {
        evt.preventDefault();
      });
    }

    for (var i = 0; i < inputsFile.length; i++) {
      addClickListener(inputsFile[i]);
    }
  }

  Dropzone.autoDiscover = false;

  if (registrationFileZone) {
    var regDropzone = new Dropzone('.registration__file-zone', {
      url: '#',
      maxFiles: 1,
      init: function() {
        this.on("addedfile", function() {
          if (this.files[1]!=null){
            this.removeFile(this.files[0]);
          }
        });
      },
      clickable: '.form__input-file-button',
      maxFilesize: null,
      maxThumbnailFilesize: 50,
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: '.dropzone-previews',
      acceptedFiles: 'image/*',
      parallelUploads: 1,
      autoProcessQueue: false,
      previewTemplate: '<div class="dz-preview dz-file-preview"><div class="registration__image-wrapper form__file-wrapper"><img class="form__image" src="" alt="" data-dz-thumbnail></div><div class="registration__file-data form__file-data"><span class="registration__file-name form__file-name dz-filename" data-dz-name></span><button class="registration__delete-button form__delete-button button" type="button" data-dz-remove><span>Удалить</span><svg class="registration__delete-icon form__delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12"><path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/></svg></button></div></div>'
    });
  }

  if (addingPostPhotoFileZone) {
    var addingPhotoDropzone = new Dropzone('.adding-post__file-zone--photo', {
      url: '#',
      maxFiles: 1,
      init: function() {
        this.on("addedfile", function() {
          if (this.files[1]!=null){
            this.removeFile(this.files[0]);
          }
        });
      },
      clickable: '.form__input-file-button--photo',
      maxFilesize: null,
      maxThumbnailFilesize: 50,
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: '.adding-post__file--photo',
      acceptedFiles: 'image/*',
      parallelUploads: 1,
      autoProcessQueue: false,
      previewTemplate: '<div class="dz-preview dz-file-preview"><div class="adding-post__image-wrapper form__file-wrapper"> <img class="form__image" src="" alt="" data-dz-thumbnail> </div> <div class="adding-post__file-data form__file-data"> <span class="adding-post__file-name form__file-name dz-filename" data-dz-name></span> <button class="adding-post__delete-button form__delete-button button" type="button" data-dz-remove> <span>Удалить</span> <svg class="adding-post__delete-icon form__delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12"><path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/></svg> </button> </div></div>'
    });
  }

  if (addingPostVideoFileZone) {
    var addingVideoDropzone = new Dropzone('.adding-post__file-zone--video', {
      url: '#',
      maxFiles: 1,
      init: function() {
        this.on("addedfile", function() {
          if (this.files[1]!=null){
            this.removeFile(this.files[0]);
          }
        });
      },
      clickable: '.form__input-file-button--video',
      maxFilesize: null,
      maxThumbnailFilesize: 50,
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: '.adding-post__file--video',
      acceptedFiles: 'image/*',
      parallelUploads: 1,
      autoProcessQueue: false,
      previewTemplate: '<div class="dz-preview dz-file-preview"><div class="adding-post__video-wrapper form__file-wrapper form__file-wrapper--video"> <img class="form__image" src="" alt="" data-dz-thumbnail> </div> <div class="adding-post__file-data form__file-data"> <span class="adding-post__file-name form__file-name dz-filename" data-dz-name></span> <button class="adding-post__delete-button form__delete-button button" type="button" data-dz-remove> <span>Удалить</span> <svg class="adding-post__delete-icon form__delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12"><path d="M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z"/></svg> </button> </div></div>'
    });
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy89IHRlbXBsYXRlcy91dGlsLmpzXG4vLz0gdGVtcGxhdGVzL21vZGFsLmpzXG4vLz0gdGVtcGxhdGVzL2Ryb3B6b25lLXNldHRpbmdzLmpzXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
