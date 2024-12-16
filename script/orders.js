import {cart,removeItem,saveToStorage,calculateCart,updateQuantity,updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions,calculateDeliveryDate } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';

let ordersHTML = '';

orders.forEach((order) => {
    ordersHTML += 
    `
    <div class="order-grid">    
            <div class="order">
                <div class="order-head">
                    <div class="order-heading-left">
                        <div class="order-date">
                            <div class="orders-heading">Order Placed:</div>
                            <div>August 12</div>
                        </div>
                        <div class="order-amount">
                            <div class="orders-heading">Total:</div>
                            <div>₹2097</div>
                        </div>
                        
                    </div>

                    <div class="order-heading-right">
                        <div class="orders-heading">Order ID:</div>
                        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
                    </div>

                </div>
                
                
                <div class="order-details-grid">
                    <div class="order-image">
                        <img src="images/images/products/athletic-cotton-socks-6-pairs.jpg" alt="socks">
                    </div>

                    <div class="delivery-details">
                        <div class="product-name">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                        </div>
                        <div class="deliverty-date">
                            Arriving on: August 15
                        </div>
                        <div class="quantity">Quantity: 1</div>

                        <button type="button" class="buy-again">
                            <img src="images/images/icons/buy-again.png" alt="buy again">
                            <span>Buy it again</span>
                        </button>
                    </div>

                    <div class="tracking">
                        <a href="">
                            <button type="button">
                            Track Package
                            </button>
                        </a>
                        
                    </div>

                    <div class="order-image">
                        <img src="images/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" alt="t-shirts">
                    </div>

                    <div class="delivery-details">
                        <div class="product-name">
                            Adults Plain Cotton T-Shirt - 2 Pack
                        </div>
                        <div class="deliverty-date">
                            Arriving on: August 19
                        </div>
                        <div class="quantity">Quantity: 2</div>

                        <button type="button" class="buy-again">
                            <img src="images/images/icons/buy-again.png" alt="buy again">
                            <span>Buy it again</span>
                        </button>
                    </div>

                    <div class="tracking">
                        <a href="">
                            <button type="button">
                            Track Package
                            </button>
                        </a>
                        
                    </div>
                </div>
            </div>
                

            <div class="order">
                <div class="order-head">
                    <div class="order-heading-left">
                        <div class="order-date">
                            <div class="orders-heading">Order Placed:</div>
                            <div>July 17</div>
                        </div>
                        <div class="order-amount">
                            <div class="orders-heading">Total:</div>
                            <div>₹1198</div>
                        </div>
                        
                    </div>

                    <div class="order-heading-right">
                        <div class="orders-heading">Order ID:</div>
                        <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
                    </div>

                    

                    
                    
                    

                </div>
                
                
                <div class="order-details-grid">
                    <div class="order-image">
                        <img src="images/images/products/intermediate-composite-basketball.jpg" alt="socks">
                    </div>

                    <div class="delivery-details">
                        <div class="product-name">
                            Intermediate Size Basketball
                        </div>
                        <div class="deliverty-date">
                            Arriving on: July 17
                        </div>
                        <div class="quantity">Quantity: 2</div>

                        <button type="button" class="buy-again">
                            <img src="images/images/icons/buy-again.png" alt="buy again">
                            <span>Buy it again</span>
                        </button>
                    </div>

                    <div class="tracking">
                        <a href="">
                            <button type="button">
                            Track Package
                            </button>
                        </a>
                        
                    </div>
                            
                        
                    
                </div>
                    

            </div>
        </div>
    `
})