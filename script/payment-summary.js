import {cart} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { products } from '../data/products.js';

export function renderPaymentSummary(){
    let cost = 0 ;
    let shipping = 0;
    let costBeforeTax = 0;
    let tax = 0;
    total = 0;

    cart.forEach((cartItem) =>{
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
        costBeforeTax += cost + shipping;
        tax += costBeforeTax *0.1;
        total += costBeforeTax + tax;
    })

    
}
