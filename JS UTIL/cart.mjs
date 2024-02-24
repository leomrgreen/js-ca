export function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}

export function updateCartQuantity() {
    const cart = getCart();
    const cartAmount = document.getElementById('cartAmount');
    cartAmount.textContent = cart.length;
}

export function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

export function addToCart(jacket) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({...jacket, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(); 
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
    displayCartItems();
    updateCartQuantity();
}

export function displayCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = ''; 

    if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'EMPTY CART';
        cartContainer.appendChild(emptyMessage);
    } else {
        let totalSum = 0; // 

        cart.forEach(function (currentItem) {
            const cartHtml = generateHtmlCart(currentItem);
            cartContainer.appendChild(cartHtml);
            totalSum += currentItem.price * currentItem.quantity; 
        });

         // Create a DIV for the new total sum of the cart, .toFixed in order to limit the total sum characters
        const totalSumDiv = document.createElement('div');
        totalSumDiv.style.cssText = 'font-weight: bold'
        totalSumDiv.textContent = 'TOTAL: $' + totalSum.toFixed(2); 
        cartContainer.appendChild(totalSumDiv); 

        const checkOutButton = document.createElement('button');
        checkOutButton.textContent = 'CHECKOUT';
        checkOutButton.addEventListener('click', function(){
            window.location.href = '/confirmation'
        });

        cartContainer.appendChild(checkOutButton);
       
    }
}

function generateHtmlCart(jacket) {
    const cartWrapper = document.createElement('div');

    const cartJacketImage = document.createElement('img');
    cartJacketImage.src = jacket.image.url;

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = jacket.title + ' ' + `(${jacket.gender})`

    const itemQuantity = document.createElement('div');
    itemQuantity.textContent = 'QTY: ' + jacket.quantity;
    
    const itemPrice = document.createElement('div');
    itemPrice.textContent = 'PRICE: ' + '$' + jacket.price;


    const removeButton = document.createElement('i');
    removeButton.className = 'bi bi-trash';
    removeButton.setAttribute('data-id', jacket.id); 
    removeButton.addEventListener('click', removeFromCart);

    cartWrapper.append(cartJacketImage, itemTitle, itemQuantity, itemPrice, removeButton);

    return cartWrapper;
}

