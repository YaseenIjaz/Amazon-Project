import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryDate,getDeliveryOption } from './deliveryOptions.js';
import { cart } from './cart-class.js';
import {deliveryOptions} from './deliveryOptions.js';



export class Orders {
  id;
  orderTime;
  totalPrice;
  products = [];

  constructor(totalPrice) {
    this.id = this.#generateUUID();
    this.orderTime = this.#orderTime();
    this.totalPrice = totalPrice;
    this.products = this.#getCartProducts();
  }

  
  #generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  
  #orderTime() {
    return dayjs().toISOString();
  }

  
  #getCartProducts() {
    return cart.cartItems.map(cartItem => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      deliveryOptionId: cartItem.deliveryOptionId,
      estimatedDelivery: this.estimatedDeliveryTime(cartItem.deliveryOptionId),
    }));
  }

  
  estimatedDeliveryTime(deliveryOptionId) {
    const deliveryDays = getDeliveryOption(deliveryOptionId).deliveryDays;
    return dayjs().add(deliveryDays, 'days').toISOString();
}
}

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
};