import i18Obj from './support/translate.js';


/*==== Lang To Local Storage ============================================================*/

let storedLang = 'en';

function setLocalStorageLang() {
  localStorage.setItem('lang', storedLang)
}
window.addEventListener('beforeunload', setLocalStorageLang);

function getLocalStorageLang() {
  if (localStorage.getItem('lang')) {
    // Change Language
    storedLang = localStorage.getItem('lang');
    translateToLang(storedLang);

    // Style selected button
    let langButtons = document.querySelectorAll('.lang');
    langButtons.forEach(lan => {
      lan.classList.remove('lang-selected');
      if (lan.textContent == storedLang) {
        lan.classList.add('lang-selected')
      }
    })
  }
}
window.addEventListener('load', getLocalStorageLang);


/*==== Lang Switch with Buttons ============================================================*/

let langSwitch = document.querySelector('.language-switch');

langSwitch.addEventListener('click', (e) => {
  const target = e.target;

  // Change Language
  if (!target.tagName == 'SPAN') return;
  let lang = target.textContent;
  if (lang == 'en / ru') return;
  translateToLang(lang);
  storedLang = lang;

  // Style selected button
  langSwitch.querySelectorAll('.lang').forEach(lan => {
    lan.classList.remove('lang-selected');
  })
  target.classList.add('lang-selected')
})

function translateToLang(lang) {
  const nodesForTranslation = document.querySelectorAll('[data-i18]');
  nodesForTranslation.forEach(node => {
    node.textContent = i18Obj[lang][node.dataset.i18]
  })
}