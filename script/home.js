import {renderProducts,displayAddedMsg} from './amazon.js';
import {groceries, products} from '../data/products.js';
import { mensFashion, womensFashion,toys,home,kitchen, headphones, groceriesPage } from './navbar.js';

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


