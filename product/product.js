import { updateCartQuantity, addToCart, getCart, createCart } from "../JS UTIL/cart.mjs";
import { initializeLoader, hideLoader } from "../JS UTIL/loader.mjs";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');


async function fetchProductDetails(productId) {
    try {
        initializeLoader();
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        const json = await response.json();
        const productDetails = json.data;
        displayProductDetails(productDetails);
    } catch (error) {
        console.error('ERROR:', error);
    }
    finally {
        hideLoader();
    }
}



function displayProductDetails(product) {
    document.getElementById('productImage').src = product.image.url;
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productPrice').textContent = '$' + product.price;
    // Makes sure to display the sale price if jacket on sale is clicked on at home-page
    if (product.onSale ===true) {
        document.getElementById('productPrice').textContent = '$' + product.discountedPrice;
        document.getElementById('productPrice').style.cssText = 'color: red'
    };
    document.getElementById('productDescription').textContent = product.description;
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.textContent = 'ADD TO CART';
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    })
}


function main() {
    if (productId) {fetchProductDetails(productId);}
    updateCartQuantity();
    createCart();
    getCart();
}

main();