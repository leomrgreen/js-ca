import { createCart, updateCartQuantity, addToCart } from "./JS UTIL/cart.mjs";
import { initializeLoader, hideLoader } from "./JS UTIL/loader.mjs";
let rainyArray = [];

const BASE_API_URL = 'https://v2.api.noroff.dev';
const API_URL = `${BASE_API_URL}/rainy-days`;

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

function sortByLowestPrice() {
    rainyArray.sort((a, b) => a.price - b.price);
    displayJackets(rainyArray);
}

function sortByHighestPrice() {
    rainyArray.sort((a, b) => b.price - a.price);
    displayJackets(rainyArray);
}

function filterByGender(gender) {
    const filteredArray = rainyArray.filter(jacket => jacket.gender === gender);
    displayJackets(filteredArray);
}

function filterAll() {
    displayJackets(rainyArray);
}

document.getElementById('sortLow').addEventListener('click', sortByLowestPrice);
document.getElementById('sortHigh').addEventListener('click', sortByHighestPrice);
document.getElementById('filterMale').addEventListener('click', () => filterByGender('Male'));
document.getElementById('filterFemale').addEventListener('click', () => filterByGender('Female'));
document.getElementById('filterAll').addEventListener('click', filterAll);

function displayJackets(rainyArray) {
    const displayContainer = document.getElementById('displayContainer');
    displayContainer.innerHTML = ''
    rainyArray.forEach(jacket => {
        const jacketHtml = generateJacketHtml(jacket);
        displayContainer.appendChild(jacketHtml);
    });
}

async function main() {
    try {
        initializeLoader();
        createCart();
        updateCartQuantity();
        const response = await fetch(API_URL);
        const json = await response.json();
        rainyArray = json.data; 
        displayJackets(rainyArray);
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        hideLoader();
    }
}



main();


