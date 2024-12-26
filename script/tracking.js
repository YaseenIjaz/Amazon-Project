import {getOrder} from '../data/orders.js';
import {getProduct, products} from '../data/products.js';
import { updateCart } from '../data/cart-class.js';
import { loggedInUser } from '../data/userDetails.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

updateCart();
function loadPage() {


  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);


  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDelivery);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${
        dayjs(productDetails.estimatedDelivery).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  console.log('Order Time:', orderTime.format());
console.log('Delivery Time:', deliveryTime.format());
console.log('Today:', today.format());
console.log('Percent Progress:', percentProgress);
console.log(dayjs(productDetails.estimatedDelivery).format('MMMM D'));

}


const searchButton = document.querySelector('.js-search-button');
const searchBar = document.querySelector('.js-search-bar');

function expandSearchBar() {
  searchBar.style.width = '100px';
}


function collapseSearchBar() {

  setTimeout(() => {
    if (!searchButton.matches(':focus') && !searchBar.matches(':focus')) {
      searchBar.style.width = '0px';
    }
  }, 100);
}

searchButton.addEventListener('focus', expandSearchBar);
searchBar.addEventListener('focus', expandSearchBar);

searchButton.addEventListener('blur', collapseSearchBar);
searchBar.addEventListener('blur', collapseSearchBar);

document.querySelector('.js-user-name').innerHTML = `<span class="hello">Hello,</span> <span class="name">${(loggedInUser.name.split(" ")[0])}</span>`;

document.querySelector('.js-search-button').addEventListener('click', () => {
  const searchTerm = document.querySelector('.js-search-bar').value.trim();
  if (searchTerm) {
      window.location.href = `home.html?search=${encodeURIComponent(searchTerm)}`;
  }
});

document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      const searchTerm = document.querySelector('.js-search-bar').value.trim();
      if (searchTerm) {
          window.location.href = `home.html?search=${encodeURIComponent(searchTerm)}`;
      }
  }
});

loadPage();
