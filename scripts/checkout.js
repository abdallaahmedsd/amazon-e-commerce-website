import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch  } from '../data/products.js';

LoadPage();

async function LoadPage() {
  try {
    await loadProductsFetch();

  } catch (error) {
    console.log('Unexpected error: Please try again later.');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
