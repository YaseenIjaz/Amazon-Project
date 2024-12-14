import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('Test Suite: addToCart', () =>{
    it('Adding an already existing product to the cart',() =>{
        spyOn(localStorage,'setItem')

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId : '1'
            }]);
        });
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart).toEqual[ Object({ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1' }) ];
    });
    
    it('Adding a new product to the cart', () =>{
        spyOn(localStorage,'setItem')

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart).toEqual[ Object({ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1' }) ];
    })
})