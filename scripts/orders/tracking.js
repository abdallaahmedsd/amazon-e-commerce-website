import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getNumberOfCartItems } from '../../data/cart.js';
import { getProductById } from '../../data/products.js';
import { getOrderById } from '../../data/orders.js';

main();

function main() {
  getCartQuantity();
  renderOrderTracking();
}

function getCartQuantity() {
  document.querySelector('.js-cart-quantity').innerHTML = getNumberOfCartItems();
}

function renderOrderTracking() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrderById(orderId);

  const orderItem = order.products.find(orderItem => orderItem.productId === productId);

  const product = getProductById(productId);

  const orderHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatDate(orderItem.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${orderItem.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = orderHTML;
}

function formatDate(date) {
  const getDate = dayjs(date);
  const dateString = getDate.format('dddd, MMMM D');

  return dateString;
}