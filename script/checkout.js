import { cart } from '../data/cart-class.js';
import { products } from '../data/products.js';
import { deliveryOptions,calculateDeliveryDate } from '../data/deliveryOptions.js';
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
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
        
        
        
    });
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if(deliveryOptionId === option.id){
           deliveryOption = option;
        }
    })
    
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

function renderPaymentSummary(){
    let cost = 0 ;
    let shipping = 0;

    cart.cartItems.forEach((cartItem) =>{
        const productId =cartItem.productId;

        let matchingProduct;
        products.forEach((product) =>{
            if(product.id === productId){
                matchingProduct = product;
            }
        });
        cost += matchingProduct.price * cartItem.quantity;

        let deliveryOption;
        deliveryOptions.forEach((option) =>{
            if(cartItem.deliveryOptionId === option.id){
                deliveryOption = option;
            }
        });
        shipping += deliveryOption.price;
        
    })
    
    
    
    
    let costBeforeTax = (cost)+(shipping);

    let tax = (((costBeforeTax*100)*0.1)/100).toFixed(2);
    let total = (costBeforeTax + Number(tax)).toFixed(2);
    let paymentSummaryHTML ='';

    paymentSummaryHTML += 
        `
        <div class="summary-title">Order Summary</div>
        <div class="summary-items-amount">
            <div>Items (${cart.calculateCart()}):</div>
            <div class="items-total">₹${cost}</div>
        </div>
        <div class="summary-shipping-amount">
            <div >Shipping & Handling:</div>
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

            <button type="button" class="place-order js-place-order">Place your order</button>
        </div>
        `
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html';
    });
}



renderOrderSummary();
renderPaymentSummary();
