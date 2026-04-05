function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const inner = carousel.querySelector('.carousel__inner');
  const arrowLeft = carousel.querySelector('.carousel__arrow_left');
  const arrowRight = carousel.querySelector('.carousel__arrow_right');

  let currentIndex = 0;
  const slidesCount = 4;

  const slideWidth = inner.offsetWidth;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', () => {
    currentIndex++;

    inner.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    arrowLeft.style.display = '';

    if (currentIndex === slidesCount - 1) {
      arrowRight.style.display = 'none';
    }
  });

  arrowLeft.addEventListener('click', () => {
    currentIndex--;

    inner.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    arrowRight.style.display = '';

    if (currentIndex === 0) {
      arrowLeft.style.display = 'none';
    }
  });
}

initCarousel();
