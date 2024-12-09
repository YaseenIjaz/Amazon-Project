let cart;
try {
    cart = JSON.parse(localStorage.getItem('cart'));
    
    if (!cart) {
        cart = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1
            }
        ];
        
        
    }
} catch (error) {
    
    console.error('Error parsing cart data from localStorage:', error);
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1
        }
    ];
    
}

export { cart };



saveToStorage();
export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart (productId,quantity){
    

    let isMissing = false;
    cart.forEach((item) => {
        if(productId ===  item.productId){
            item.quantity += quantity;
            isMissing =true;
        }
    })
    if(!isMissing){
        cart.push({
            productId,
            quantity
        })
    }  
    saveToStorage();
}

export function removeItem(productId){
   const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
})
cart = newCart;
saveToStorage();
}

export function calculateCart(){
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    return cartQuantity
}

export function updateQuantity(productId,newQuantity){
    cart.forEach((product) =>{
        if(product.productId === productId){
            product.quantity =newQuantity;
        };
    });
    saveToStorage()
};
