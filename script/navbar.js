 import {renderProducts} from './home.js';
 import { products,groceries } from '../data/products.js';

export function mensFashion(){
    document.querySelector('.product-grid').innerHTML = '';

    const filteredProducts = products.filter((product) => product.type === 'mens-fashion');

    renderProducts(filteredProducts);
 };

 export function womensFashion(){
    document.querySelector('.product-grid').innerHTML = '';

    const filteredProducts = products.filter((product) => product.type === 'womens-fashion');

    renderProducts(filteredProducts);
 };
 export function toys(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'toys');

   renderProducts(filteredProducts);
};
export function headphones(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'headphones');

   renderProducts(filteredProducts);
};
export function home(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'home');

   renderProducts(filteredProducts);
};
export function kitchen(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = products.filter((product) => product.type === 'kitchen');

   renderProducts(filteredProducts);
};

export function groceriesPage(){
   document.querySelector('.product-grid').innerHTML = '';

   const filteredProducts = groceries;

   renderProducts(filteredProducts)
}
 