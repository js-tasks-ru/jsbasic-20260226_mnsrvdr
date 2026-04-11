export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
    this.renderProducts();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.innerElem = this.elem.querySelector('.products-grid__inner');
  }

  renderProducts() {
    this.innerElem.innerHTML = '';

    const filteredProducts = this.getFilteredProducts();

    for (let product of filteredProducts) {
      const productCard = new ProductCard(product);
      this.innerElem.append(productCard.elem);
    }
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      // noNuts
      if (this.filters.noNuts) {
        if (product.nuts === true) return false;
      }

      // vegeterianOnly
      if (this.filters.vegeterianOnly) {
        if (!product.vegeterian) return false;
      }

      // maxSpiciness
      if (
        typeof this.filters.maxSpiciness === 'number' &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        return false;
      }

      // category
      if (this.filters.category) {
        if (product.category !== this.filters.category) return false;
      }

      return true;
    });
  }

  updateFilter(filters) {
    this.filters = {
      ...this.filters,
      ...filters
    };

    this.renderProducts();
  }
}