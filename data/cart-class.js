import { deliveryOptions } from "./deliveryOptions.js";

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
        this.cartItems = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId : '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId : '2'
            }];    
      }
    }

  
  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)) 
  }

  addToCart (productId,quantity){
    let isMissing = false;
    this.cartItems.forEach((item) => {
        if(productId ===  item.productId){
            item.quantity += quantity;
            isMissing =true;
        }
    })
    if(!isMissing){
        this.cartItems.push({
            productId,
            quantity,
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
}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);



 






