export const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
      quantity
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
