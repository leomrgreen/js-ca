function generateHtmlCart(jacket) {
    const cartWrapper = document.createElement('div');

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = jacket.title;

    const itemQuantity = document.createElement('div');
    itemQuantity.textContent = 'antal: ' + jacket.quantity;
    
    const itemPrice = document.createElement('div');
    itemPrice.textContent = 'pris ' + '$' + jacket.price;

    const totalPrice = document.createElement('div');
    totalPrice.textContent = 'Total: ' + '$' + (jacket.price * jacket.quantity);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'REMOVE';
    removeButton.setAttribute('data-id', jacket.id); 
    removeButton.addEventListener('click', removeFromCart);

    cartWrapper.append(itemTitle, itemQuantity, itemPrice, totalPrice, removeButton);

    return cartWrapper;
}

function removeFromCart(event) {
    const idToRemove = event.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart'));
    const indexToRemove = cart.findIndex(item => item.id == idToRemove); 

    if (indexToRemove > -1) {
        cart.splice(indexToRemove, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        event.target.parentElement.remove(); 
    }
}


function displayCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = ''; 

    if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'EMPTY CART';
        cartContainer.appendChild(emptyMessage);
    } else {
        cart.forEach(function (currentItem) {
            const cartHtml = generateHtmlCart(currentItem);
            cartContainer.appendChild(cartHtml);
        });

        const checkOutButton = document.createElement('button');
        checkOutButton.textContent = 'CHECKOUT';
        checkOutButton.addEventListener('click', function(){
            window.location.href = './confirmation'
        });

        cartContainer.appendChild(checkOutButton);
    }
}


function main() {
    displayCartItems();
}

main();