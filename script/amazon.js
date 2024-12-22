import { cart } from '../data/cart-class.js';
import {groceries, products} from '../data/products.js';
import { mensFashion, womensFashion,toys,home,kitchen, headphones, groceriesPage } from './navbar.js';




function updateCart() {
    const cartQuantity = cart.calculateCart();

    const cartItemsElement = document.querySelector('.js-cart-quantity');
    if (cartQuantity === 0) {
        cartItemsElement.innerHTML = `0`;
    } else {
        cartItemsElement.innerHTML = `${cartQuantity}`;
    }
}
updateCart();

export function displayAddedMsg(productId){
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

const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter((product) => {
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });
  
        return matchingKeyword ||
          product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
export function renderProducts(filteredProducts){
    let productHTML = '';
    filteredProducts.forEach((product) => {
        productHTML +=  `
                <div class="products">
                    <div class="image-container">
                        <img src="${product.image}">
                    </div>
                    
                    <div class="product-name limit-text-to-2-lines">
                        ${product.name}
                    </div>
                    <div class="rating-review">
                        <img src="${product.getStarsUrl()}" class="rating">
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
    
            cart.addToCart(productId,quantity);
            updateCart();
            displayAddedMsg(productId);
             
        })
    })
    
    document.querySelector('.js-search-button').addEventListener('click', () => {
          const search = document.querySelector('.js-search-bar').value;
          window.location.href = `amazon.html?search=${search}`;
        });
    document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
        }
    });
    
}
renderProducts(filteredProducts);



document.querySelector('.js-view-all-btn').addEventListener('click',() =>{
    renderProducts(products);
});
document.querySelector('.js-mens-fashion-btn').addEventListener('click',() =>{
    mensFashion();
});
document.querySelector('.js-womens-fashion-btn').addEventListener('click',() =>{
    womensFashion();
})
document.querySelector('.js-toys-btn').addEventListener('click',() =>{
    toys();
});
document.querySelector('.js-headphones-btn').addEventListener('click',() =>{
    headphones();
});
document.querySelector('.js-home-btn').addEventListener('click',() =>{
    home();
});
document.querySelector('.js-kitchen-btn').addEventListener('click',() =>{
    kitchen();
});
document.querySelector('.js-groceries-btn').addEventListener('click',() =>{
    groceriesPage();
});

