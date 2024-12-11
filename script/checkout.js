import {cart,removeItem,saveToStorage,calculateCart,updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions,getDeliveryDate } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function updateCart() {
    const cartQuantity = calculateCart();

    const cartItemsElement = document.querySelector('.js-cart-items');
    if (cartQuantity === 0) {
        cartItemsElement.innerHTML = `0 items`;
    } else {
        cartItemsElement.innerHTML = `${cartQuantity} items`;
    }
}

updateCart()
let checkOutHTML ='';

cart.forEach((cartItem) => {
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
    const dateString = getDeliveryDate(deliveryOption);

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
        removeItem(productId);
        document.querySelector(`.js-items-orderd-${productId}`).remove();
        updateCart()
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
            removeItem(productId);
            document.querySelector(`.js-items-orderd-${productId}`).remove();
            updateCart()
        }else{
            updateQuantity(productId,newQuantity);

            document.querySelector(`.js-quantity-${productId}`).innerHTML = newQuantity;
            updateCart();
        }

        const container = document.querySelector(`.js-items-orderd-${productId}`);
        container.classList.remove('is-editing-quantity');    
    });
});


function deliveryOptionsHTML(matchingProduct,cartItem){
    let deliveryHTML = '';

    deliveryOptions.forEach((deliveryOption) =>{

        const dateString = getDeliveryDate(deliveryOption);

        const priceString = deliveryOption.price === 0 
                                ?'Free'
                                : `₹${deliveryOption.price} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        deliveryHTML +=
            `
            <div class="delivery-option">
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