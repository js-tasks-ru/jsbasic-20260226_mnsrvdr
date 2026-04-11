import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const cartItem = this.cartItems.find(
      item => item.product.id === product.id
    );

    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push({
        product,
        count: 1
      });
    }

    this.onProductUpdate(
      this.cartItems.find(item => item.product.id === product.id)
    );
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(
      item => item.product.id === productId
    );

    if (!cartItem) return;

    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems = this.cartItems.filter(
        item => item.product.id !== productId
      );

      if (this.isEmpty()) {
        this.onProductUpdate(null);
        return;
      }

      this.onProductUpdate(null);
      return;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return;

    if (this.isEmpty()) {
      if (this.modal) {
        this.modal.close();
      }
      return;
    }

    if (!cartItem) {
      return;
    }

    const productId = cartItem.product.id;

    const productCount = this.modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );

    const productPrice = this.modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`
    );

    const infoPrice = this.modalBody.querySelector(
      `.cart-buttons__info-price`
    );

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML =
      `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>

        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>

          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>

              <span class="cart-counter__count">${count}</span>

              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>

            <div class="cart-product__price">
              €${(product.price * count).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    `);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>

        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" required class="cart-form__input" value="Santa Claus">
          <input name="email" type="email" required class="cart-form__input" value="john@gmail.com">
          <input name="tel" type="tel" required class="cart-form__input" value="+1234567">
        </div>

        <div class="cart-form__group">
          <input name="address" type="text" required class="cart-form__input" value="North, Lapland, Snow Home">
        </div>

        <div class="cart-buttons">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">
              €${this.getTotalPrice().toFixed(2)}
            </span>
          </div>

          <button type="submit" class="cart-buttons__button btn-group__button button">
            order
          </button>
        </div>
      </form>
    `);
  }

  renderModal() {
    this.modal = new Modal();

    const body = createElement(`<div></div>`);

    this.cartItems.forEach(item => {
      body.append(
        this.renderProduct(item.product, item.count)
      );
    });

    body.append(this.renderOrderForm());

    this.modal.setTitle('Your order');
    this.modal.setBody(body);

    this.modal.open();

    this.modalBody = body;

    this.addModalListeners();
  }

  addModalListeners() {
    this.modalBody.addEventListener('click', (event) => {
      const button = event.target.closest('.cart-counter__button');
      if (!button) return;

      const productElem = button.closest('[data-product-id]');
      const productId = productElem.dataset.productId;

      if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }

      if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      }
    });

    const form = this.modalBody.querySelector('.cart-form');
    form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  async onSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('[type="submit"]');
    submitButton.classList.add('is-loading');

    const formData = new FormData(event.target);

    try {
      await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });

      this.cartItems = [];

      this.modal.setTitle('Success!');

      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `));

      this.cartIcon.update(this);

    } finally {
      submitButton.classList.remove('is-loading');
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
} 