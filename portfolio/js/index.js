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

console.log(`
1. [+10] Верстка валидная
2. [+20] Верстка семантическая
        [+2] <header>, <main>, <footer>
        [+2] <section> x 6
        [+2] <h1> x 1
        [+2] <h2> x 5
        [+2] <nav> x 1
        [+2] ul>li>a x 2
        [+2] <button> x 10
        [+2] <input> x 2
        [+2] <textarea> x 1
        [+2] placeholder x 3
3. [+48] Вёрстка соответствует макету
        [+6] <header>
        [+6] hero
        [+6] skills
        [+6] portfolio
        [+6] video
        [+6] price
        [+6] contacts
        [+6] <footer>
4. [+12] Требования к CSS
        [+2] flex / grid для построения сетки
        [+2] при уменьшении масштаба страницы браузера вёрстка размещается по центру
        [+2] фоновый цвет тянется на всю ширину страницы
        [+2] иконки добавлены в формате .SVG
        [+2] изображения добавлены в формате .JPG
        [+2] favicon
5. [+20] Интерактивность, реализуемая через css +20
        [+5] плавная прокрутка по якорям
        [+5] ссылки в футере ведут на гитхаб автора проекта и на страницу курса
        [+5] интерактивность
        [+5] плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы
        
ИТОГО: [100 / 100]
`)