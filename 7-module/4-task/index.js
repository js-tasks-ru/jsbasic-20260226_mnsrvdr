export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.valueElem = this.elem.querySelector('.slider__value');
    this.stepsContainer = this.elem.querySelector('.slider__steps');

    this.segments = this.steps - 1;

    this.stepsContainer.children[this.value].classList.add('slider__step-active');

    this.updateUI(this.value);

    this.thumb.ondragstart = () => false;

    this.elem.addEventListener('click', (event) => {
      this.onClick(event);
    });

    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();

      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    });
  }

  onPointerMove = (event) => {
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    let leftPercents = leftRelative * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    this.valueElem.textContent = value;

    this.stepsContainer.querySelector('.slider__step-active')?.classList.remove('slider__step-active');
    this.stepsContainer.children[value].classList.add('slider__step-active');
  };

  onPointerUp = (event) => {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    this.value = value;

    this.updateUI(value);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  };

  onClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    let value = Math.round(leftRelative * this.segments);

    this.value = value;

    this.updateUI(value);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  updateUI(value) {
    let valuePercents = value / this.segments * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.valueElem.textContent = value;

    this.stepsContainer.querySelector('.slider__step-active')?.classList.remove('slider__step-active');
    this.stepsContainer.children[value].classList.add('slider__step-active');
  }
}
