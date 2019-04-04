/**
 * This is our "Entry Point"
 */

import * as appModule from 'controller/appcontroller';
var cartItems = [];
fetch('http://localhost:3000/cartData')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        cartItems[0] = myJson;
        appModule.loadContent(cartItems);
        var addButtons = document.querySelectorAll('.addButton');
        for (let item of addButtons) {
            item.addEventListener('click', (ev) => {
                ev.target.parentElement.querySelector('.itemQuantity').innerText = Number(ev.target.parentElement.querySelector('.itemQuantity').innerText) + 1;
            });
        }

        var removeButtons = document.querySelectorAll('.removeButton');
        for (let item of removeButtons) {
            item.addEventListener('click', (ev) => {
                if (Number(ev.target.parentElement.querySelector('.itemQuantity').innerText) > 1) {
                    ev.target.parentElement.querySelector('.itemQuantity').innerText = Number(ev.target.parentElement.querySelector('.itemQuantity').innerText) - 1;
                }
            });
        }

        // update initial price summary
        var price = document.querySelector('.totalPrice');
        var delivery = document.querySelector('.deliveryCharges');
        var payable = document.querySelector('.amountPayable');
        
        
        var calcPrice = 0;
        var calcDelivery = 0;
        for(let individualItem of cartItems[0]) {
            calcPrice += individualItem.pricing.amount;
            calcDelivery += individualItem.pricing.delivery_charge;
        }
        price.textContent ="Rs. " +  calcPrice;
        delivery.textContent ="Rs. " +  calcDelivery;
        payable.textContent ="Rs. " +  (calcDelivery+calcPrice);
    });

document.getElementById('checkByPincode').addEventListener('click', (ev) => {
    var cartItems = document.querySelectorAll('.cartItem');

    if (ev.target.parentElement.children[1].value === '') {
        for (let item of cartItems) {
            item.style.display = 'block';
        }
    }
    for (let item of cartItems) {
        let cartItemDetails = JSON.parse(item.dataset.cartItemDetails);
        if (cartItemDetails.availability.unavailable_pincodes.indexOf(ev.target.parentElement.children[1].value) !== -1) {
            item.style.display = 'none';
        }
    }

})