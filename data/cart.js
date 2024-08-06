import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ]
}

export function addToCart(productId) {
  let matchingItem;
    
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId)
      matchingItem = cartItem;
  });

  let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  let quantity = Number(quantitySelector.value);

  if(matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    cart.splice(index, 1);
    saveToStorage();
    return true;
  }

  return false;
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getNumberOfCartItems() {
  let cartQuantity = 0;
  cart.forEach(cartItem => cartQuantity += cartItem.quantity);
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    cart[index].quantity = newQuantity;
    saveToStorage();
  }
}