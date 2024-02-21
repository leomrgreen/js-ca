const params = new URLSearchParams(window.location.search);
const productId = params.get('id');


async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`);
        const productDetails = await response.json();
        displayProductDetails(productDetails);
    } catch (error) {
        console.error('Error:', error);
    }
}

if (productId) {
    fetchProductDetails(productId);
}

function displayProductDetails(productDetails) {
    document.getElementById('productImage').src = productDetails.image;
    document.getElementById('productTitle').textContent = productDetails.title;
    document.getElementById('productPrice').textContent = '$' + productDetails.price;
    document.getElementById('productDescription').textContent = productDetails.description;
}

