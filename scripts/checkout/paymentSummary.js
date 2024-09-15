import * as cartModule from '../../data/cart.js'; 
import { getDeliveryOptionById } from '../../data/deliveryOptions.js'; 
import { getProductById } from '../../data/products.js'; 
import { formatCurrency } from "../utils/money.js";
import { addOrder } from '../../data/orders.js';

function main() {
  const paymentDetails = getPaymentDetails();
  generatePaymentSummaryHTML(paymentDetails);
  placeOrder();
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
    totalPriceBeforeTax: formatCurrency(totalPriceBeforeTaxCents),
    tax: formatCurrency(taxCents), 
    totalPrice: formatCurrency(totalCents),
  }

  return paymentDetails;
}

function generatePaymentSummaryHTML(paymentDetails){
  let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartModule.getNumberOfCartItems()}):</div>
      <div class="payment-summary-money">$${paymentDetails.itemsPrice}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${paymentDetails.shippingPrice}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${paymentDetails.totalPriceBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${paymentDetails.tax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${paymentDetails.totalPrice}</div>
    </div>

    <button ${paymentDetails.totalPrice == 0 ? 'disabled' : ''} class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

function placeOrder() {
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cartModule.cart
          }),
        });

        const order = await response.json();
        addOrder(order);

        cartModule.clearCart();
      } catch (error) {
        console.log('Unexpected error: Please try again later.');
      }

      window.location.href = 'orders.html'
    });
}
