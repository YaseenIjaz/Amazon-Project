import { deliveryOptions } from "./deliveryOptions.js";
import { loggedInUser } from "./userDetails.js";


class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
    if (!this.cartItems) {
        this.cartItems = [];    
      }
    }

  
  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)) 
  }

  addToCart (productId,quantity){
    let isMissing = false;
    this.cartItems.forEach((item) => {
        if(productId ===  item.productId){
            item.quantity += quantity || 1;
            isMissing =true;
        }
    })
    if(!isMissing){
        this.cartItems.push({
            productId,
            quantity: quantity || 1,
            deliveryOptionId : '1'
        })
    }  
    this.saveToStorage();
  }

  removeItem(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
  })
  this.cartItems = newCart;
  this.saveToStorage();
  }

  calculateCart(){
    let cartQuantity = 0;

    this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
    });

    return cartQuantity
  }

  updateQuantity(productId,newQuantity){
    this.cartItems.forEach((product) =>{
        if(product.productId === productId){
            product.quantity =newQuantity;
        };
    });
    this.saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
 
    this.cartItems.forEach((cartItem) =>{
        
        if( productId === cartItem.productId){
             matchingItem = cartItem;    
        }
    });
     matchingItem.deliveryOptionId = deliveryOptionId;

     this.saveToStorage();
  }
};

export function updateCart() {
  const cartQuantity = cart.calculateCart();

  const cartItemsElement = document.querySelector('.js-cart-quantity');
  if (cartQuantity === 0) {
      cartItemsElement.innerHTML = `0`;
  } else {
      cartItemsElement.innerHTML = `${cartQuantity}`;
  }
}

const loggedEmail = loggedInUser.email;

export const cart = new Cart(`cart-${loggedEmail}`);


