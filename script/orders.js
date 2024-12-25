import { getProduct,products } from '../data/products.js';
import { cart,updateCart } from '../data/cart-class.js';
import { orders } from '../data/orders.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { loggedInUser } from '../data/userDetails.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import '../data/orders.js'

updateCart();
console.log(loggedInUser);



function loadPage() {
  

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order">
        <div class="order-head">
            <div class="order-heading-left">
                <div class="order-date">
                    <div class="orders-heading">Order Placed:</div>
                    <div>${orderTimeString}</div>
                </div>
                <div class="order-amount">
                    <div class="orders-heading">Total:</div>
                    <div>₹${order.totalPrice}</div>
                </div>
                
            </div>

            <div class="order-heading-right">
                <div class="orders-heading">Order ID:</div>
                <div>${order.id}</div>
            </div>

        </div>
        
        
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      
      productsListHTML += `
         <div class="order-image">
                <img src="${product.image}">
            </div>

            <div class="delivery-details">
                <div class="product-name">
                    Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="deliverty-date">
                    Arriving on: ${
                      dayjs(productDetails.estimatedDelivery).format('MMMM D')
                    }
                </div>
                <div class="quantity">Quantity: ${productDetails.quantity}</div>

                <button type="button" class="buy-again button-primary js-buy-again" data-product-id="${product.id}">
                    <img src="images/images/icons/buy-again.png" alt="buy again">
                    <span>Buy it again</span>
                </button>
            </div>

            <div class="tracking">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button type="button">
                    Track Package
                    </button>
                </a>
                
            </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      cart.addToCart(button.dataset.productId);
      updateCart();
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
};
loadPage()

function estimatedDeliveryTime(deliveryOptionId) {
    const deliveryDays = getDeliveryOption(deliveryOptionId).deliveryDays;
    return dayjs().add(deliveryDays, 'days').toISOString();
}


