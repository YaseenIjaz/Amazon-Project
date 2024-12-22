import { cart } from '../data/cart-class.js';
import {groceries, products} from '../data/products.js';


 function mensFashion(){
    document.querySelector('.product-grid').innerHTML = '';

    const filteredProducts = products.filter((product) => product.type === 'mens-fashion');

    renderProducts(filteredProducts);
 };

  function womensFashion(){
    document.querySelector('.product-grid').innerHTML = '';

    const filteredProducts = products.filter((product) => product.type === 'womens-fashion');

    renderProducts(filteredProducts);
 };
  function toys(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'toys');

   renderProducts(filteredProducts);
};
 function headphones(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'headphones');

   renderProducts(filteredProducts);
};
 function home(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'home');

   renderProducts(filteredProducts);
};
 function kitchen(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'kitchen');

   renderProducts(filteredProducts);
};

 function groceriesPage(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = groceries;

   renderProducts(filteredProducts)
}


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
 function renderProducts(filteredProducts){
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




document.querySelector('.js-view-all-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            renderProducts(products);
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        renderProducts(products);
    }
});

document.querySelector('.view-all-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            renderProducts(products);
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        renderProducts(products);
    }
});

document.querySelector('.js-mens-fashion-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            mensFashion()
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        mensFashion()
    }
});

document.querySelector('.js-womens-fashion-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            womensFashion();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        womensFashion();
    }
});

document.querySelector('.js-toys-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            toys();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        toys();
    }
});
document.querySelector('.js-headphones-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            headphones();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        headphones();
    }
});
document.querySelector('.js-home-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            home();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        home();
    }
});
document.querySelector('.js-kitchen-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            kitchen();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        kitchen();
    }
});
document.querySelector('.js-groceries-btn').addEventListener('click',() =>{
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
    if (existingHomeCSS) {
        existingHomeCSS.remove();
    }
    const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');
    
    if (!existingAmazonCSS) {
        const amazonCSS = document.createElement('link');
        amazonCSS.rel = 'stylesheet';
        amazonCSS.href = 'styles/amazon.css';
        document.head.appendChild(amazonCSS);
        amazonCSS.onload = () => {
            mainElement.innerHTML = `<div class="product-grid"></div>`;
            groceriesPage();
        };
    } else {
        mainElement.innerHTML = `<div class="product-grid"></div>`;
        groceriesPage();
    }
});


let currentIndex = 0;
let interval;

function updateSlidePosition() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveSlide(direction) {
    clearInterval(interval); // Stop the auto-slide temporarily
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    currentIndex = (currentIndex + direction + itemCount) % itemCount;

    updateSlidePosition();
    startAutoSlide(); // Restart auto-slide
}

function startAutoSlide() {
    interval = setInterval(() => {
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;

        currentIndex = (currentIndex + 1) % itemCount; // Cycle through slides seamlessly
        updateSlidePosition();
    }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    startAutoSlide();
});

document.querySelector('.carousel-control-prev').addEventListener('click',() =>{
    moveSlide(-1)
})
document.querySelector('.carousel-control-next').addEventListener('click',() =>{
    moveSlide(1)
})



// document.querySelector('.navigation-bar-categories').addEventListener('click', async (event) => {
//   if (event.target.classList.contains('category-btn')) {
//       const btnClass = event.target.classList;

//       try {
          
//           const response = await fetch('./amazon.html');
//           if (!response.ok) throw new Error('Failed to load amazon.html');
//           const html = await response.text();

          
//           const parser = new DOMParser();
//           const doc = parser.parseFromString(html, 'text/html');
//           const amazonMain = doc.querySelector('main');

          
//           const homeMain = document.querySelector('main');
//           homeMain.innerHTML = 
//            `<div class="product-grid">
//             ${renderAmazonProducts()}
//            </div>`;
           

          
//           const existingHomeCSS = document.querySelector('link[href="styles/home.css"]');
//           const existingAmazonCSS = document.querySelector('link[href="styles/amazon.css"]');

//           if (btnClass.contains('js-mens-fashion-btn') || btnClass.contains('js-womens-fashion-btn')) {
//               if (existingHomeCSS) existingHomeCSS.remove(); 
//               if (!existingAmazonCSS) {
//                   const amazonCSS = document.createElement('link');
//                   amazonCSS.rel = 'stylesheet';
//                   amazonCSS.href = 'styles/amazon.css';
//                   document.head.appendChild(amazonCSS); 
//               }
//               mensFashion(); 
//           } else {
              
//               if (existingAmazonCSS) existingAmazonCSS.remove();
//               if (!existingHomeCSS) {
//                   const homeCSS = document.createElement('link');
//                   homeCSS.rel = 'stylesheet';
//                   homeCSS.href = 'styles/home.css';
//                   document.head.appendChild(homeCSS); 
//               }
//           }
//       } catch (error) {
//           console.error('Error loading content:', error);
//       }
//   }
// });



