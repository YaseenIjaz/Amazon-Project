export const cart =[];

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
}