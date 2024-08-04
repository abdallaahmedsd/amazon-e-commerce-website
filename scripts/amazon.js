import { products } from "../data/products.js";
import * as cartModule from "../data/cart.js";
import { formmatCurrency } from "./utils/money.js";

main();

function main() {
  generateAndShowProducts();
  updateCartQuantity();

  // get the add to cart button
  let addToCartButtons = document.querySelectorAll('.js-add-to-cart');
  // add a product to cart
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      let {productId} = btn.dataset;

      cartModule.addToCart(productId);

      updateCartQuantity();

      // show and hide the added to cart toolTit
      showHideAddedToCart(productId);

    });
  });
}

// generate the HTML code from the products objects
function generateAndShowProducts() {
  let productsHTML = "";

  products.forEach(product => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formmatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
  });

  // put the data into the page 
  document.querySelector('.js-prodcuts-grid').innerHTML = productsHTML;
}

function updateCartQuantity() {
  document.querySelector('.js-cart-quantity').textContent = cartModule.getNumberOfCartItems();
}

function showHideAddedToCart(productId) {
  let addedToCartToolTip = document.querySelector(`.js-added-to-cart-${productId}`);

  addedToCartToolTip.classList.add('show');

  setTimeout(() => {
    addedToCartToolTip.classList.remove('show');
  }, 2000);
}
