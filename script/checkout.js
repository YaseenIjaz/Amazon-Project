import { cart } from '../data/cart-class.js';
import { products,getProduct } from '../data/products.js';
import { deliveryOptions,calculateDeliveryDate,getDeliveryOption } from '../data/deliveryOptions.js';
import { Orders,addOrder } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';





function updateCart() {
    const cartQuantity = cart.calculateCart();

    const cartItemsElement = document.querySelector('.js-cart-items');
    if (cartQuantity === 0) {
        cartItemsElement.innerHTML = `0 items`;
    } else {
        cartItemsElement.innerHTML = `${cartQuantity} items`;
    }
}


updateCart()

function renderOrderSummary(){
    let checkOutHTML ='';

cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    
    const dateString = calculateDeliveryDate(deliveryOption);

    checkOutHTML +=
    `
        <div class="items-orderd 
        js-items-orderd-${matchingProduct.id}">
            <div class="order-delivery-date">
                Delivery date: <span class="deliverty-date">${dateString}</span> 
            </div>
            <div class="ordered-detail-grid">
                <div class="ordered-image-container">
                    <img src="${matchingProduct.image}" alt="socks">
                </div>
                
                <div class="ordered-details">
                    <div class="product-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-price">₹${matchingProduct.price}</div>
                    </div>
                    <div class="quantity-modification">
                        <div>
                            Quantity: <span class="quantity js-quantity-${matchingProduct.id}">${Number(cartItem.quantity)}</span>
                        </div>
                        <div class="modification">
                            <div class="update
                            link-primary
                            js-update-button"
                            data-update-id=${matchingProduct.id}>
                                Update
                            </div>

                            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                            <span class="save-quantity link-primary" data-save-id =${matchingProduct.id}>Save</span>

                            <div class="delete link-primary js-delete-button"
                            data-delete-id=${matchingProduct.id}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="delivery-options">
                    <div class="delivery-heading">Choose a delivery option:</div>
                    
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                        
                    </div>
                </div>
            </div>

        </div>
    `
});

document.querySelector('.js-orders-grid').innerHTML = checkOutHTML;


document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click',() =>{ 
        const productId = button.dataset.deleteId;
        cart.removeItem(productId);
        renderOrderSummary()
        updateCart();
        renderPaymentSummary();
    }); 
})

document.querySelectorAll('.js-update-button').forEach((button) => {
    button.addEventListener('click',() => {
        const productId = button.dataset.updateId;
        
        
        const container = document.querySelector(`.js-items-orderd-${productId}`);
        container.classList.add('is-editing-quantity');

        const quantity = Number(document.querySelector(`.js-quantity-${productId}`).textContent);   
        document.querySelector(`.js-quantity-input-${productId}`).value = quantity; 
    });
});

document.querySelectorAll('.save-quantity').forEach((button) => {
    button.addEventListener('click',() => {
        const productId = button.dataset.saveId;

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);

        if(newQuantity < 0 || newQuantity > 1000){
            alert('Not a valid quantity');
            return;
        }else if(newQuantity === 0){
            cart.removeItem(productId);
            renderOrderSummary()
            
        }else{
            cart.updateQuantity(productId,newQuantity);

            document.querySelector(`.js-quantity-${productId}`).innerHTML = newQuantity;
            
        }
        updateCart();
        const container = document.querySelector(`.js-items-orderd-${productId}`);
        container.classList.remove('is-editing-quantity');
        renderPaymentSummary()    
    });
});


function deliveryOptionsHTML(matchingProduct,cartItem){
    let deliveryHTML = '';

    deliveryOptions.forEach((deliveryOption) =>{

        const dateString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.price === 0 
                                ?'Free'
                                : `₹${deliveryOption.price} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        deliveryHTML +=
            `
            <div class="delivery-option js-delivery-option"
            data-product-id=${matchingProduct.id}
            data-delivery-option-id=${deliveryOption.id}>
                <input type="radio" class='delivery-option-input' name="delivery-date-${matchingProduct.id}" ${isChecked ?'checked' :''}>
                <div class='delivery-details'>
                    <div class="deliverty-date-options">
                        ${dateString}
                    </div>
                    <div class="delivery-amount">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `
    });
    return deliveryHTML;
}

document.querySelectorAll('.js-delivery-option').forEach((inputElement) =>{
    inputElement.addEventListener('click',() => {
        const productId = inputElement.dataset.productId;
        const deliveryOptionId = inputElement.dataset.deliveryOptionId;
        
        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    })
})
};

function renderPaymentSummary() {
    let cost = 0;
    let shipping = 0;
  
    cart.cartItems.forEach((cartItem) => {
      const productId = cartItem.productId;
  
      const matchingProduct = getProduct(productId);
  
      cost += matchingProduct.price * cartItem.quantity;
  
      let deliveryOption;
      deliveryOptions.forEach((option) => {
        if (cartItem.deliveryOptionId === option.id) {
          deliveryOption = option;
        }
      });
      shipping += deliveryOption.price;
    });
  
    let costBeforeTax = cost + shipping;
    let tax = (((costBeforeTax * 100) * 0.1) / 100).toFixed(2);
    let total = (costBeforeTax + Number(tax)).toFixed(2);
  
    let paymentSummaryHTML = `
        <div class="summary-title">Order Summary</div>
        <div class="summary-items-amount">
            <div>Items (${cart.calculateCart()}):</div>
            <div class="items-total">₹${cost}</div>
        </div>
        <div class="summary-shipping-amount">
            <div>Shipping & Handling:</div>
            <div class="shipping-total">₹${shipping}</div>
        </div>
        <div class="summary-total-before-tax">
            <div>Total before tax:</div>
            <div class="total-before-tax">₹${costBeforeTax}</div>
        </div>
        <div class="summary-tax">
            <div>Estimated tax (10%):</div>
            <div class="tax">₹${tax}</div>
        </div>
        <div class="summary-total">
            <div class="total-title">Order Total:</div>
            <div class="total">₹${total}</div>
        </div>
        <div class="payment-mode">
            <div>
                Pay on delivery
                <input type="radio" name="paymentMethod" id="payment-method-cash">
            </div>
            <div>
                Online Payment
                <input type="radio" name="paymentMethod" id="payment-method-card">
            </div>
        </div>
        <div id="gpay-button" class="gpay-button-container" style="display: none;"></div>
        <button type="button" class="place-order button-primary js-place-order" disabled>Place your order</button>
    `;
  
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const placeOrderButton = document.querySelector('.js-place-order');
    const gpayButtonContainer = document.querySelector('#gpay-button');
    let gpayInitialized = false;
  
    // Listen to changes in payment methods
    paymentMethods.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (radio.id === 'payment-method-cash') {
          // Pay on delivery selected
          placeOrderButton.disabled = false;
          placeOrderButton.style.display = 'block';
          
          gpayButtonContainer.style.display = 'none';
        } else if (radio.id === 'payment-method-card') {
          // Card payment selected
          placeOrderButton.style.display = 'none';
          gpayButtonContainer.style.display = 'block';
  
          if (!gpayInitialized) {
            initializeGooglePay(total);
            gpayInitialized = true;
          }
        }
      });
    });
  
    // Place order event
    placeOrderButton.addEventListener('click', () => {
      const order = new Orders(`${total}`);
      addOrder(order);
      cart.cartItems = [];
      cart.saveToStorage();
      window.location.href = 'orders.html';
    });
  }
  
  function initializeGooglePay(total) {
    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: "TEST", // Test environment
    });
  
    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "MASTERCARD"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example", // Test gateway
              gatewayMerchantId: "exampleMerchantId", // Mock merchant ID
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "exampleMerchantId",
        merchantName: "Example Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: total,
        currencyCode: "INR",
        countryCode: "US",
      },
    };
  
    // Check if Google Pay is ready to pay
    paymentsClient
      .isReadyToPay({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: paymentRequest.allowedPaymentMethods,
      })
      .then((response) => {
        if (response.result) {
          const gpayButton = paymentsClient.createButton({
            onClick: () => {
              paymentsClient
                .loadPaymentData(paymentRequest)
                .then((paymentData) => {
                  console.log("Payment Successful:", paymentData);
                })
                .catch((err) => {
                  console.error("Payment Failed:", err);
                });
            },
          });
          document.getElementById('gpay-button').appendChild(gpayButton);
        } else {
          console.error("Google Pay is not ready to pay.");
        }
      })
      .catch((err) => {
        console.error("Error checking readiness:", err);
      });
  }
  




renderOrderSummary();
renderPaymentSummary();


