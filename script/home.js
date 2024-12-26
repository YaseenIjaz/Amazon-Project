import { cart, updateCart } from '../data/cart-class.js';
import {groceries, products} from '../data/products.js';
import { loggedInUser } from '../data/userDetails.js';
import { mensFashion, womensFashion,toys,home,kitchen, headphones, groceriesPage } from './navbar.js';

updateCart();


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


export function renderProducts(products){
    let productHTML = '';
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
}





document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    if (searchTerm) {
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = '';
        const filteredProducts = products.filter((product) => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return (
                matchingKeyword ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        const filteredGroceries = groceries.filter((grocery) => {
            let matchingKeyword = false;

            grocery.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return (
                matchingKeyword ||
                grocery.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        const results = filteredProducts.length > 0 ? filteredProducts : filteredGroceries;

        handleButtonClick(() => renderProducts(results));
    }
});


document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchTerm = document.querySelector('.js-search-bar').value.trim();
    if (searchTerm) {
        const filteredProducts = products.filter((product) => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return (
                matchingKeyword ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        const filteredGroceries = groceries.filter((grocery) => {
            let matchingKeyword = false;

            grocery.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return (
                matchingKeyword ||
                grocery.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        const results = filteredProducts.length > 0 ? filteredProducts : filteredGroceries;

        handleButtonClick(() => renderProducts(results));
         
    }
});


document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value.trim();
        if (searchTerm) {
            const filteredProducts = products.filter((product) => {
                let matchingKeyword = false;

                product.keywords.forEach((keyword) => {
                    if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchingKeyword = true;
                    }
                });

                return (
                    matchingKeyword ||
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            const filteredGroceries = groceries.filter((grocery) => {
                let matchingKeyword = false;

                grocery.keywords.forEach((keyword) => {
                    if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchingKeyword = true;
                    }
                });

                return (
                    matchingKeyword ||
                    grocery.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            const results = filteredProducts.length > 0 ? filteredProducts : filteredGroceries;

            handleButtonClick(() => renderProducts(results));

        }
    }
});


function handleButtonClick(callback) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingCSS = document.querySelector(`link[href="styles/amazon.css"]`);

    if (!existingCSS) {
        const newCSS = document.createElement('link');
        newCSS.rel = 'stylesheet';
        newCSS.href = 'styles/amazon.css';
        document.head.appendChild(newCSS);
        newCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            callback();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        callback();
    }
}


document.querySelector('.js-user-name').innerHTML = `<span class="hello">Hello,</span> <span class="name">${(loggedInUser.name.split(" ")[0])}</span>`;
document.querySelector('.js-view-all-btn').addEventListener('click', () => handleButtonClick(() => renderProducts(products)));
document.querySelector('.view-all-btn').addEventListener('click', () => handleButtonClick(() => renderProducts(products)));
document.querySelector('.js-mens-fashion-btn').addEventListener('click', () => handleButtonClick(mensFashion));
document.querySelector('.mens-fashion-btn').addEventListener('click', () => handleButtonClick(mensFashion));
document.querySelector('.js-womens-fashion-btn').addEventListener('click', () => handleButtonClick(womensFashion));
document.querySelector('.womens-fashion-btn').addEventListener('click', () => handleButtonClick(womensFashion));
document.querySelector('.js-toys-btn').addEventListener('click', () => handleButtonClick(toys));
document.querySelector('.toys-btn').addEventListener('click', () => handleButtonClick(toys));
document.querySelector('.js-headphones-btn').addEventListener('click', () => handleButtonClick(headphones));
document.querySelector('.headphones-btn').addEventListener('click', () => handleButtonClick(headphones));
document.querySelector('.js-home-btn').addEventListener('click', () => handleButtonClick(home));
document.querySelector('.home-btn').addEventListener('click', () => handleButtonClick(home));
document.querySelector('.kitchen-btn').addEventListener('click', () => handleButtonClick(kitchen));
document.querySelector('.js-kitchen-btn').addEventListener('click', () => handleButtonClick(kitchen));
document.querySelector('.js-groceries-btn').addEventListener('click', () => handleButtonClick(groceriesPage));
document.querySelector('.groceries-btn').addEventListener('click', () => handleButtonClick(groceriesPage));

