import * as cartModule from '../../data/cart.js'; 
import { getDeliveryOptionById } from '../../data/deliveryOptions.js'; 
import { getProductById } from '../../data/products.js'; 
import { formatCurrency } from "../utils/money.js";

function main() {
  const paymentDetails = getPaymentDetails();
  generatePaymentSummaryHTML(paymentDetails);
}

export function renderPaymentSummary() {
  main();
}

function getPaymentDetails() {
  let productsPriceCents = 0;
  let shippingPriceCents = 0;

  cartModule.cart.forEach(cartItem => {
    const {productId} = cartItem;
    
    const product = getProductById(productId);
    if(!product)
      throw Error(`There's no product with Id = ${productId}`);
    
    productsPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;

  });

  const totalPriceBeforeTaxCents = productsPriceCents + shippingPriceCents;
  const taxCents = totalPriceBeforeTaxCents * 0.1;
  const totalCents = totalPriceBeforeTaxCents + taxCents;


  const paymentDetails = {
    itemsPrice: formatCurrency(productsPriceCents),
    shippingPrice: formatCurrency(shippingPriceCents),
    totalPriceBeofreTax: formatCurrency(totalPriceBeforeTaxCents),
    tax: formatCurrency(taxCents), 
    totalPrice: formatCurrency(totalCents),
  }

  return paymentDetails;
}

function generatePaymentSummaryHTML(paymentDetails) {

  let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartModule.cart.length}):</div>
      <div class="payment-summary-money">$${paymentDetails.itemsPrice}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${paymentDetails.shippingPrice}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${paymentDetails.totalPriceBeofreTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${paymentDetails.tax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${paymentDetails.totalPrice}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
