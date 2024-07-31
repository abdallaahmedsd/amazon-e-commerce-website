import { products } from "../data/products.js";
import { cart } from "../data/cart.js";


let mainProductsGrid = document.querySelector('.js-prodcuts-grid');

let productsHTML = "";

// generate the HTML code from the products objects
products.forEach(product => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
});

// put the data into the page 
mainProductsGrid.innerHTML = productsHTML;

// get the add to cart button
let addToCartButtons = document.querySelectorAll('.js-add-to-cart');

// add a product to cart
addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    let {productId} = btn.dataset;

    let matchingItem;
    
    cart.forEach((item) => {
      if(productId === item.productId)
        matchingItem = item;
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

    // get the cart quantity
    let cartQuantity = 0;
    cart.forEach(item => cartQuantity += item.quantity);
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;

    // show and hide the added to cart toolTit
    let addedToCartToolTip = document.querySelector(`.js-added-to-cart-${productId}`);
    showHideAddedToCart(addedToCartToolTip);

  });
});

let setTimeoutId;
function showHideAddedToCart(addedToCartToolTip) {

  if(setTimeoutId)
    clearTimeout(setTimeoutId);
  
  addedToCartToolTip.classList.add('show');

  setTimeoutId = setTimeout(() => {
    addedToCartToolTip.classList.remove('show');
  }, 2000);
}