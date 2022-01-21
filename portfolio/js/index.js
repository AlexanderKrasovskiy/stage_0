import i18Obj from './support/translate.js';


let langSwitch = document.querySelector('.language-switch');

langSwitch.addEventListener('click', (e) => {
  const target = e.target;

  // Change Language
  if (!target.tagName == 'SPAN') return;
  let lang = target.textContent; // innerText textContent
  if (lang == 'en / ru') return;
  translateToLang(lang);

  // Style selected language
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