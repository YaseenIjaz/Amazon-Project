import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js'

let productHTML = '';

function updateCart(){
    let cartQuantity = 0;
    cart.forEach((item) =>{
        cartQuantity += item.quantity;
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }) 
}

function displayAddedMsg(productId){
    const addedMsg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMsg.classList.add ('added-to-cart-visible');

    const previousTimeout = addedMsgTimeout[productId];
    if(previousTimeout){
        clearTimeout(previousTimeout)
    }

    const timeoutId = setTimeout(() =>{ 
        addedMsg.classList.remove('added-to-cart-visible')
    },2000)

    addedMsgTimeout[productId] = timeoutId;
}

products.forEach((product) => {
    productHTML +=  `
            <div class="products">
                <div class="image-container">
                    <img src="${product.image}">
                </div>
                
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
                <div class="rating-review">
                    <img src="images/images/ratings/rating-${product.rating.stars*10}.png" class="rating">
                    <span class="reviews">${product.rating.count}</span>
                </div>
                
                <div class="price">₹${Number(product.price)}</div>
                <select name="quantity" class="quantity 
                js-quantity-selector-${product.id}"
                >
                    <option value="1">1</option>
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

                <div class="item-added js-added-to-cart-${product.id}">
                    <img src="images/images/icons/checkmark.png">

                    Added to Cart
                </div>

                <button type="button" class="add-to-cart
                 js-add-to-cart"
                 data-product-id ="${product.id}">
                 Add to Cart
                 </button>
            </div>
    `
})

document.querySelector('.product-grid').innerHTML = productHTML;

const addedMsgTimeout = {};
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click',() =>{
        const productId = button.dataset.productId;
        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        addToCart(productId,quantity);
        updateCart();
        displayAddedMsg(productId);
        
        
        
        
    })
})

