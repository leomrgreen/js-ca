// const slidesContainer = document.getElementById('slides');
// let currentIndex = 0;
// let rainyArray = []; //


// async function getArray() {
//     try {
//         const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
//         const json = await response.json();
//         rainyArray = json; 
//         console.log(json);
//         imageCarousel(rainyArray); 
//         main();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }


// function imageCarousel(rainyArray) {
//     slidesContainer.innerHTML = '';
//     for (let i = 0; i < rainyArray.length; i++) {
//         const carouselImage = document.createElement('div');
//         if (i === 0) {
//             carouselImage.style.display = 'flex';
//         } else {
//             carouselImage.style.display = 'none';
//         }
        
//         carouselImage.innerHTML = 
//         `<img src="${rainyArray[i].image}">
//         <h2>${rainyArray[i].title}</h2> 
//         <h3>$${rainyArray[i].price}</h3>`;
        
//         carouselImage.setAttribute('class', 'sliderItem');
//         slidesContainer.appendChild(carouselImage);
//     }
// }



// function showCurrentImage() {
//     const images = slidesContainer.querySelectorAll('div');
//     images.forEach((div, index) => {
//         if (index === currentIndex) {
//             div.style.display = 'flex';
//         } else {
//             div.style.display = 'none';
//         }
//     });
// }



// document.getElementById('next').addEventListener('click', function() {
//     currentIndex = (currentIndex + 1) % rainyArray.length; 
//     showCurrentImage();
// });


// document.getElementById('prev').addEventListener('click', function() {
//     currentIndex = (currentIndex - 1 + rainyArray.length) % rainyArray.length;  
//     showCurrentImage();
// });


// getArray();


// const jacketContainer = document.getElementById('gridContainer');
// function main(jacketsToDisplay = rainyArray) {
//     jacketContainer.innerHTML = '';
//     jacketsToDisplay.forEach(item => {
//         const jacketDiv = document.createElement('div');
//         jacketDiv.innerHTML = `<img src="${item.image}" alt="${item.title}" class="jacketImage"> 
//         <h2>${item.title}</h2> <h3>$ ${item.price}</h3>
//         <button class='addToCartBtn' data-id='${item.id}'>ADD TO CART</button>`;
//         jacketDiv.setAttribute('class', 'jacketItem');
//         jacketContainer.appendChild(jacketDiv);
//         const addToCartBtn = jacketDiv.querySelector('.addToCartBtn');
//         addToCartBtn.addEventListener('click', () => addToCart(item));
//         const imageJacket = jacketDiv.querySelector('.jacketImage');
//         imageJacket.addEventListener('click', () => {
//             window.location.href = `productPage.html?id=${item.id}`;
//         });

//     });
// }




// let cart = [];
// let cartAmount = document.getElementById('cartAmount');
// function saveCartData() {
//     localStorage.getItem('cart', JSON.stringify(cart));
// }


// function createCartItemDiv(item) {
//     const itemDiv = document.createElement('div');
//     itemDiv.className = 'cart-item';
//     itemDiv.innerHTML = `<img src="${item.image}"> Price: $${item.price} `;
//     return itemDiv;
// }


// function createRemoveButton(item, itemDiv) {
//     const removeButton = document.createElement('button');
//     const removeIcon = document.createElement('i');
//     removeIcon.className = 'bi bi-x-lg'; 
//     removeButton.appendChild(removeIcon);

   
//     removeButton.onclick = function () {
      
//        const index = cart.indexOf(item);
//        if (index !== -1) {
//            cart.splice(index, 1);
//            itemDiv.remove(); 
//            saveCartData(); 
//            cartAmount.textContent = cart.length; 
//        }
//     };
//     return removeButton;
// }


// function addToCart(item) {
//     cart.push(item);
//     saveCartData();
//     cartAmount.textContent = cart.length;
//     const cartContainer = document.getElementById('cartDisplay');
//     const itemDiv = createCartItemDiv(item);
//     const removeButton = createRemoveButton(item, itemDiv);
//     itemDiv.appendChild(removeButton);
//     cartContainer.appendChild(itemDiv);
// }


// import { API_URL } from "./fetch/constants.mjs";


// function displayJackets(rainyArray) {
//     console
// }

const BASE_API_URL = 'https://v2.api.noroff.dev';
const API_URL = `${BASE_API_URL}/rainy-days`;

function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}


function addToCart(jacket) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.findIndex(function (currentJacket) {
        if (jacket.id === currentJacket.id) {
            return true;
        }
        return false;
    });

    if (itemIndex === -1) {
        cart.push({...jacket, quantity: 1});
    }
    else {
        cart[itemIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}



function generateJacketHtml(jacket) {
    const gridWrapper = document.createElement('div');
    gridWrapper.classList.add('gridWrapper');

    const jacketContainer = document.createElement('div');
    jacketContainer.classList.add('jacketContainer');

    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;

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
        console.log(jacketHtml);
        displayContainer.appendChild(jacketHtml);
    });
}


async function getArray() {
    try {
        createCart();
        const response = await fetch(API_URL);
        const json = await response.json();
        const rainyArray = json.data; 
        displayJackets(rainyArray);
    } catch (error) {
        console.error('Error:', error);
    }
}

getArray();
