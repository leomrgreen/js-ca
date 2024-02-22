const params = new URLSearchParams(window.location.search);
const productId = params.get('id');


async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        const json = await response.json();
        const productDetails = json.data;
        displayProductDetails(productDetails);
    } catch (error) {
        console.error('ERROR:', error);
    }
}

if (productId) {
    fetchProductDetails(productId);
}

function displayProductDetails(productDetails) {
    document.getElementById('productImage').src = productDetails.image.url;
    document.getElementById('productTitle').textContent = productDetails.title;
    document.getElementById('productPrice').textContent = '$' + productDetails.price;
    document.getElementById('productDescription').textContent = productDetails.description;
}

