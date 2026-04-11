import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

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

    for (const product of filteredProducts) {
      const productCard = new ProductCard(product);
      this.innerElem.append(productCard.elem);
    }
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      const f = this.filters;

      if (f.noNuts && product.nuts === true) {
        return false;
      }

      if (f.vegeterianOnly && product.vegeterian !== true) {
        return false;
      }

      if (
        typeof f.maxSpiciness === 'number' &&
        product.spiciness > f.maxSpiciness
      ) {
        return false;
      }

      if (f.category && f.category !== '') {
        if (product.category !== f.category) {
          return false;
        }
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