export function loadContent(contentArray) {
  for(var cartItem of contentArray[0]){
      loadTemplate(cartItem);
    }
}

function loadTemplate(cartItem){
  if ('content' in document.createElement('template')) {
    
    var cartTemplate = document.querySelector('#cartItemComponent');
    var cartImage= cartTemplate.content.querySelector('img');
    var cartTitle = cartTemplate.content.querySelector('h3');
    var cartPrice = cartTemplate.content.querySelector('.itemPrice');
    var cartDelivery = cartTemplate.content.querySelector('.itemDelivery');
    var cartQuantity = cartTemplate.content.querySelector('.itemQuantity');
    var cartAvailability = cartTemplate.content.querySelector('.itemAvailability');
    
    cartTemplate.content.querySelector('.cartItem').dataset.cartItemDetails = JSON.stringify(cartItem);
    cartImage.src = cartItem.product_meta.img;
    cartTitle.innerText = cartItem.product_meta.title;
    cartPrice.innerText = cartItem.pricing.amount;
    cartDelivery.innerText = cartItem.pricing.delivery_charge;
    cartQuantity.innerText = 1;
    cartAvailability.innerText = '';
    

    var cartBody = document.querySelector(".cartBody");
    var clone = document.importNode(cartTemplate.content, true);
    cartBody.appendChild(clone);
  }
}
