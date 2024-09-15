export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(productId) {

  let matchingItem = getCartItemById(productId);

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

export function updateDeliveryOption(productId, deliveryOptionId) {
  let cartItem = getCartItemById(productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearCart() {
  cart = [];
  saveToStorage();
}

export function getCartItemById(productId) {
  return cart.find(product => product.productId === productId);
}