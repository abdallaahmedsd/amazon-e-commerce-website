import { shuffleArray } from "../scripts/utils/shuffle.js";
import { formatCurrency } from '../scripts/utils/money.js'

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.instructionsLink}" target="_blank"> Instructions </a>
      <a href="${this.warrantyLink}" target="_blank"> Warranty </a>
    `;
  }
}

export let  products = [];

await loadProductsFetch();

export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products').then(response => {
    return response.json(); 
  }).then((data) => {
    products = data.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.keywords.includes('appliances')) {
        productDetails.instructionsLink = 'images/appliance-instructions.png';
        productDetails.warrantyLink = 'images/appliance-warranty.png';
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    shuffleArray(products);
  }).catch((error) => {
    console.log('Unexpected error: Please try again later');
  });

  return promise;
}

export function getProductById(productId) {
  return products.find(product => product.id === productId);
}
