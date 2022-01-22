const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', toggleMenu)

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  setTimeout(() => {
    navList.classList.toggle('open')
  }, 1)
}

navList.addEventListener('click', closeMenu)

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    nav.classList.remove('open')
    navList.classList.remove('open')
    hamburger.classList.remove('open')
  }
}