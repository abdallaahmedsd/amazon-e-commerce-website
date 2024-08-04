import * as cartModule from '../data/cart.js';
import { products } from '../data/products.js';
import { formmatCurrency } from "./utils/money.js";

main();

function main() {
  generateAndShowCartItems();
  removeFromCart();
  updateOrderItem();
  saveOrderItem();
  calcOrderItemsQuantity();
}

function generateAndShowCartItems() {
  let cartSummaryHTML = '';
  cartModule.cart.forEach(item => {
    let {productId} = item;

    let product = getProductById(productId);

    if(!product)
      throw Error(`There's no product with Id = ${productId}`);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formmatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${product.id}>
                Update
              </span>
              <input class="quantity-input js-quantity-input" type="number" min="1" max="1000" />
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${product.id}>
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${product.id}>
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${product.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${product.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${product.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  });
}

function getProductById(productId) {
  return products.find(product => product.id === productId);
}

function removeFromCart() {
  let deleteLinks = document.querySelectorAll('.js-delete-quantity-link');

  deleteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      let {productId} = e.target.dataset;

      if(cartModule.removeFromCart(productId)) {
        let container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.remove();
        calcOrderItemsQuantity();
      }

    });
  });
}

function updateOrderItem() {
  let deleteLinks = document.querySelectorAll('.js-update-quantity-link');

  deleteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      let {productId} = e.target.dataset;

      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');

      let oldQuantity = document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`).textContent;
      let quantityInput = document.querySelector(`.js-cart-item-container-${productId} .js-quantity-input`);
      quantityInput.value = oldQuantity;
    });
  });
}

function saveOrderItem() {
  let deleteLinks = document.querySelectorAll('.js-save-quantity-link');

  deleteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      let {productId} = e.target.dataset;

      let quantityInput = document.querySelector(`.js-cart-item-container-${productId} .js-quantity-input`);
      let newQuantity = Number(quantityInput.value);
      cartModule.updateQuantity(productId, newQuantity);
      document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`).innerHTML = newQuantity;

      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      calcOrderItemsQuantity();
    });
  });
}

function calcOrderItemsQuantity() {
  document.querySelector('.js-order-summary-quantity').textContent = `${cartModule.getNumberOfCartItems()} items`;
}