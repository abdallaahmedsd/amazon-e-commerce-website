export const cart = []

export function addProductToCart(productId) {
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
}
