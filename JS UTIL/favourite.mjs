function createFavoriteList() {
    const favList = getFave();
    if (!favList) {
        localStorage.setItem('favorite')
    }
}