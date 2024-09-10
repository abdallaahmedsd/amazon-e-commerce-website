import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch  } from '../data/products.js';

LoadPage();

async function LoadPage() {
  await loadProductsFetch();

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
