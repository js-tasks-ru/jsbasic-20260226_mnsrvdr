export function initCarousel() {
  const root = document.querySelector('.carousel');

  if (!root) return;

  const nextBtn = root.querySelector('.carousel__arrow_right');
  const prevBtn = root.querySelector('.carousel__arrow_left');
  const inner = root.querySelector('.carousel__inner');

  const slides = root.querySelectorAll('.carousel__slide');

  let position = 0;
  const slideWidth = inner.offsetWidth;

  const maxPosition = (slides.length - 1) * slideWidth;

  function update() {
    inner.style.transform = `translateX(-${position}px)`;

    prevBtn.style.display = position === 0 ? 'none' : '';
    nextBtn.style.display = position >= maxPosition ? 'none' : '';
  }

  nextBtn.addEventListener('click', () => {
    position += slideWidth;
    update();
  });

  prevBtn.addEventListener('click', () => {
    position -= slideWidth;
    update();
  });

  update();
}
