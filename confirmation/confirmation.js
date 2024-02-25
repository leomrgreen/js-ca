import { initializeLoader, hideLoader } from "../JS UTIL/loader.mjs";

function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  console.log('Cart has been cleared');
}

function main() {
    initializeLoader();
    clearCart();
    hideLoader();
}

main();