import * as cartModule from '../../data/cart.js';
import { getProductById } from '../../data/products.js';
import { formatCurrency } from "../utils/money.js";
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOptionById } from '../../data/deliveryOptions.js';


function main() {
  generateAndShowCartItems();
  removeFromCart();
  updateOrderItem();
  saveOrderItem();
  calcOrderItemsQuantity();
  updateDeliveryOption();
}

export function renderOrderSummary() {
  main();
}

function generateAndShowCartItems() {
  let cartSummaryHTML = '';
  cartModule.cart.forEach(cartItem => {
    let {productId, deliveryOptionId} = cartItem;

    let product = getProductById(productId);

    if(!product)
      throw Error(`There's no product with Id = ${productId}`);

    let deliveryOption = getDeliveryOptionById(deliveryOptionId);

    if(!deliveryOption)
      throw Error(`There's no delivery option with Id = ${deliveryOptionId}`);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date">
          Delivery date: ${calcFormatDate(deliveryOption.deliveryDays)}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
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
            ${generateDeliveryOptionsHTML(cartItem)}
          </div>
        </div>
      </div>
    `
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  });
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

function generateDeliveryOptionsHTML(cartItem) {
  let html = '';

  deliveryOptions.forEach(deliveryOption => {

    const dateString = calcFormatDate(deliveryOption.deliveryDays);

    const priceString = deliveryOption.priceCents === 0
                          ? 'FREE'
                          : `${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${cartItem.productId}"
        data-delivery-option-id="${deliveryOption.id}">
        <input ${isChecked ? 'checked' : ''} type="radio"
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            $${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}

function calcFormatDate(daysToAdd) {
  const today = dayjs();
  const deliveryDate = today.add(daysToAdd, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}

function updateDeliveryOption() {
  const options = document.querySelectorAll('.js-delivery-option');

  options.forEach(Option => {
    Option.addEventListener('click', (e) => {
      const {productId, deliveryOptionId} = Option.dataset;
      cartModule.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}