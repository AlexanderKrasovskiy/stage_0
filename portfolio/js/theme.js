const themeBtn = document.querySelector('.theme-btn');
const root = document.documentElement;

let theme = 'dark';

/*==== Theme Switch with Button ============================================================*/

const classNames = [
  '.header-logo',
  '.header-container',
  '.lang',
  '.theme-btn',
  '.hero-container',
  '.section-title',
  '.button-transparent',
  '.button-gold',
  '.hero-btn',
  '.hero-btn',
  '.price-dollars',
  '.price-btn',
  '.price-btn',
  '.contacts-container',
  '.contacts-form input',
  '.contacts-form textarea',
  '.footer-inst',
  '.footer-fb',
  '.footer-twitter',
  '.footer-pinterest',
  '.nav-link'
];


themeBtn.addEventListener('click', changeTheme);

function changeTheme(e) {

  if (theme == 'dark') {
    root.style.setProperty('--color-bg', '#ffffff');
    root.style.setProperty('--color-text', '#1c1c1c');

    classNames.forEach(elem => {
      document.querySelectorAll(elem).forEach(el => el.classList.add('light-theme'))
    })

    theme = 'light';

  } else {
    root.style.setProperty('--color-bg', '#000000');
    root.style.setProperty('--color-text', '#ffffff');

    classNames.forEach(elem => {
      document.querySelectorAll(elem).forEach(el => el.classList.remove('light-theme'))
    })

    theme = 'dark';
  }
}


/*==== Theme To Local Storage ============================================================*/

function setLocalStorageTheme() {
  localStorage.setItem('theme', theme)
}
window.addEventListener('beforeunload', setLocalStorageTheme);

function getLocalStorageTheme() {
  if (localStorage.getItem('theme') == 'dark') {
    theme = 'light';
    changeTheme();
  } else if (localStorage.getItem('theme') == 'light') {
    theme = 'dark';
    changeTheme();
  }
}
window.addEventListener('load', getLocalStorageTheme);