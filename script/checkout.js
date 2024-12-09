import {cart,removeItem,saveToStorage,calculateCart} from '../data/cart.js';
import { products } from '../data/products.js';

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
    

    checkOutHTML +=
    `
        <div class="items-orderd 
        js-items-orderd-${matchingProduct.id}">
            <div class="order-delivery-date">
                Delivery date: <span class="deliverty-date">Monday, December 2</span> 
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
                        <div class="quantity">
                            Quantity: <span class="quantity">${Number(cartItem.quantity)}</span>
                        </div>
                        <div class="modification">
                            <div class="update">Update</div>
                            <div class="delete js-delete-button"
                            data-delete-id=${matchingProduct.id}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="delivery-option">
                    <div class="delivery-heading">Choose a delivery option:</div>
                    <div class="delivery-options">
                        <div class="free-delivery">
                            <input type="radio" name="delivery-date-${matchingProduct.id}" checked>
                            <div>
                                <div class="deliverty-date-options">Tuesday, December 17</div>
                                <div class="delivery-amount">FREE Shipping</div>
                            </div>
                        </div>
                        <div class="premium-delivery">
                            <input type="radio" name="delivery-date-${matchingProduct.id}">
                            <div>
                                <div class="deliverty-date-options">Wednesday, December 11</div>
                                <div class="delivery-amount">₹50-Shipping</div>
                            </div>
                        </div>
                        <div class="extra-premium-delivery">
                            <input type="radio" name="delivery-date-${matchingProduct.id}">
                            <div>
                                <div class="deliverty-date-options">Thursday, December 5</div>
                                <div class="delivery-amount">₹200-Shipping</div>
                            </div>
                        </div>
                        
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
        console.log(cart);
        
        updateCart()
    })
    
    
})
