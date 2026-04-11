export default function initCarousel() {
  const root = document.querySelector('.carousel');

  if (!root) return;

  const nextBtn = root.querySelector('.carousel__arrow_right');
  const prevBtn = root.querySelector('.carousel__arrow_left');
  const inner = root.querySelector('.carousel__inner');

  if (!inner) return;

  let position = 0;
  const slideWidth = inner.offsetWidth;

  nextBtn?.addEventListener('click', () => {
    position += slideWidth;

    inner.style.transform = `translateX(-${position}px)`;
  });

  prevBtn?.addEventListener('click', () => {
    position -= slideWidth;

    inner.style.transform = `translateX(-${position}px)`;
  });
}

initCarousel();
