export class StepSlider {
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

    this.stepsContainer.children[this.value].classList.add('slider__step-active');

    this.updateUI(this.value);

    this.elem.addEventListener('click', (event) => {
      this.onClick(event);
    });
  }

  onClick(event) {
    const rect = this.elem.getBoundingClientRect();

    let left = event.clientX - rect.left;

    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;

    let approximateValue = leftRelative * segments;

    let value = Math.round(approximateValue);

    this.value = value;

    this.updateUI(value);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  updateUI(value) {
    let segments = this.steps - 1;

    let valuePercents = value / segments * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.valueElem.textContent = value;

    this.stepsContainer.querySelector('.slider__step-active')?.classList.remove('slider__step-active');

    this.stepsContainer.children[value].classList.add('slider__step-active');
  }
}