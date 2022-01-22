const themeBtn = document.querySelector('.theme-btn');
const root = document.documentElement;


let isDarkTheme = true;

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
  // Change root colors
  if (isDarkTheme) {
    root.style.setProperty('--color-bg', '#ffffff');
    root.style.setProperty('--color-text', '#1c1c1c');
    isDarkTheme = !isDarkTheme;
  } else {
    root.style.setProperty('--color-bg', '#000000');
    root.style.setProperty('--color-text', '#ffffff');
    isDarkTheme = !isDarkTheme;
  }

  classNames.forEach(elem => {
    document.querySelectorAll(elem).forEach(el => el.classList.toggle('light-theme'))
  })
}