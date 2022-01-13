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

console.log(`PART 1
=======================================
1. [+10] Верстка валидная
2. [+20] Верстка семантическая
3. [+48] Вёрстка соответствует макету
4. [+12] Требования к CSS
5. [+20] Интерактивность, реализуемая через css

ИТОГО: [110 / 100]



PART 2
=======================================
1. [+48] Вёрстка соответствует макету. Ширина экрана 768px
2. [+15] Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки
3. [+20] На ширине экрана 768рх и меньше реализовано адаптивное меню
        [2 / 4] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку

ИТОГО: [83 / 75]
`)