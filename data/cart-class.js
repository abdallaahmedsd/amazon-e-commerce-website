class Cart {
  cartItems;
  localStorageKey;
  
  constructor (localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if(!this.cartItems) {
      this.cartItems = [
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
  }

  addToCart(productId) {

    let matchingItem = this.getCartItemById(productId);

    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantitySelector.value);

    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const index = this.cartItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      saveToStorage();
      return true;
    }

    return false;
  }

  getNumberOfCartItems() {
    let cartQuantity = 0;
    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity);
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    const index = this.cartItems.findIndex(item => item.productId === productId);
    
    if (index !== -1) {
      this.cartItems[index].quantity = newQuantity;
      saveToStorage();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let cartItem = this.getCartItemById(productId);
    cartItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  getCartItemById(productId) {
    return this.cartItems.find(product => product.productId === productId);
  }

}
  
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart)
