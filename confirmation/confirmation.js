function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  console.log('Cart has been cleared');
}

function main() {
    clearCart();
}

main();