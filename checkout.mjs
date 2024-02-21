function generateHtmlCart(jacket) {
    const cartWrapper = document.createElement('div');

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = jacket.title;

    const itemQuantity = document.createElement('div');
    itemQuantity.textContent = 'antal: ' + jacket.quantity;
    
    const itemPrice = document.createElement('div');
    itemPrice.textContent = 'pris ' + '$' + jacket.price;

    const totalPrice = document.createElement('div');
    totalPrice.textContent = 'Total: ' + '$' + jacket.price * jacket.quantity;

    cartWrapper.append(itemTitle, itemQuantity, itemPrice, totalPrice);
    return cartWrapper;

}

function displayCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart'));


cart.forEach(function (currentItem) {
    const cartHtml = generateHtmlCart(currentItem);
    cartContainer.appendChild(cartHtml);
});

}

function main() {
    displayCartItems();
}

main();