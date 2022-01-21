/*= Image Caching ==========================================*/

preloadImages();

function preloadImages() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];

  seasons.forEach(season => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/portfolio/${season}/${i}.jpg`;
    }
  });
}

/*= Switching Images in Portfolio =============================*/

const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-img');


portfolioBtns.addEventListener('click', changeImages);

function changeImages(event) {
  if (!event.target.classList.contains('button')) return;

  // change src in HTML
  const season = event.target.dataset.season;
  portfolioImages.forEach((img, i) => img.src = `./assets/img/portfolio/${season}/${i + 1}.jpg`);


  // change button style
  portfolioBtns.querySelectorAll('.button').forEach(b => {
    b.classList.remove('button-gold');
    b.classList.add('button-transparent');
  });
  event.target.classList.remove('button-transparent');
  event.target.classList.add('button-gold');
}
