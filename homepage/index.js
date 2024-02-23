const BASE_API_URL = 'https://v2.api.noroff.dev';
const API_URL = `${BASE_API_URL}/rainy-days`;

// function updateCartQuantity() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartAmount = document.getElementById('cartAmount');
//     cartAmount.textContent = cart.length;
//     console.log(cartAmount);
    
// }

function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}

function updateCartQuantity() {
    const cart = getCart();
    const cartAmount = document.getElementById('cartAmount');
    cartAmount.textContent = cart.length;
}

function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}



function addToCart(jacket) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({...jacket, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(); // updates the cart quantity 
}


// creating HTML by creating divs that are equal to the object's different features 
function generateJacketHtml(jacket) {
    const gridWrapper = document.createElement('div');
    gridWrapper.classList.add('gridWrapper');

    const jacketContainer = document.createElement('div');
    jacketContainer.classList.add('jacketContainer');

    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;
    jacketImage.addEventListener('click', () => {
        window.location.href = `/product/index.html?id=${jacket.id}`;
        });
        

    const heading = document.createElement('h3');
    heading.textContent = jacket.title;

    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = '$' + jacket.price;

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('jacketToCartBtn');
    addToCartButton.textContent = 'ADD TO CART';
    addToCartButton.addEventListener('click', () => {
        addToCart(jacket);
    })

    jacketContainer.append(jacketImage, heading, jacketPrice, addToCartButton);

    return jacketContainer;
}



function displayJackets(rainyArray) {
    const displayContainer = document.getElementById('displayContainer');
    rainyArray.forEach(jacket => {
        const jacketHtml = generateJacketHtml(jacket);
        displayContainer.appendChild(jacketHtml);
    });
}


async function main() {
    try {
        createCart();
        updateCartQuantity();
        const response = await fetch(API_URL);
        const json = await response.json();
        const rainyArray = json.data; 
        displayJackets(rainyArray);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();