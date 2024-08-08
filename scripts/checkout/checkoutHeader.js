import { getNumberOfCartItems } from '../../data/cart.js';

export function renderCheckoutHeader() {
  document.querySelector('.js-order-summary-quantity').textContent = `${getNumberOfCartItems()} items`;
}
