import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from "../../data/orders.js";
import { formatCurrency } from '../utils/money.js';
import { getProductById } from '../../data/products.js';
import { getNumberOfCartItems } from '../../data/cart.js'

function renderOrderSummary() {

  let ordersHTML = ''
  orders.forEach(order => {
    ordersHTML += `
    <div class="order-container">
      ${generateOrderHeaderHTML(order)}
      <div class="order-details-grid">
        ${generateOrderDetailsHTML(order)}
      </div>
    </div>
    `
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  getCartQuantity();
}

function generateOrderHeaderHTML(order) {
  const orderHeader = `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div> ${formatDate(order.orderTime)} </div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>   
  `;

  return orderHeader;
}

function generateOrderDetailsHTML(order) {
  let orderDetailsHTML = '';

  order.products.forEach(orderItem => {
    const product = getProductById(orderItem.productId);
    orderDetailsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${formatDate(orderItem.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
          Quantity: ${orderItem.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${orderItem.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return orderDetailsHTML;
}

function formatDate(date) {
  const getDate = dayjs(date);
  const dateString = getDate.format('dddd D');

  return dateString;
}

function getCartQuantity() {
  document.querySelector('.js-cart-quantity').innerHTML = getNumberOfCartItems();
}

renderOrderSummary();