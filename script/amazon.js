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
                    <img src="/images/images/ratings/rating-${product.rating.stars*10}.png" class="rating">
                    <span class="reviews">${product.rating.count}</span>
                </div>
                
                <div class="price">₹${Number(product.price)}</div>
                <select name="quantity" class="quantity 
                js-quantity-selector"
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

                <div class="item-added">
                    <img src="/images/images/icons/checkmark.png">

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



