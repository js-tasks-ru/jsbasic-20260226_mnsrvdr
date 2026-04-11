export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }

  addProduct(product) {
    if (!product) return;

    const cartItem = this.cartItems.find(
      item => item.product.id === product.id
    );

    if (cartItem) {
      cartItem.count += 1;
    } else {
      const newCartItem = {
        product,
        count: 1
      };

      this.cartItems.push(newCartItem);
    }

    this.onProductUpdate(cartItem || this.cartItems.find(
      item => item.product.id === product.id
    ));
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
}

