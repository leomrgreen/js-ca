export function getWishList() {
  const wishList = localStorage.getItem("wishlist");
  return wishList;
}

export function createWishList() {
  const wishList = getWishList();
  if (!wishList) {
    localStorage.setItem("wishlist", JSON.stringify([]));
  }
}

export function addToWishList(jacket) {
  const wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishList.push({ ...jacket, quantity: 1 });
  localStorage.setItem("wishlist", JSON.stringify(wishList));
}

// lägg filter man och kvinna funktion i navbar ist
// broken heart
// shop => filter all
//
