export function sortByLowPrice() {
    rainyArray.sort((a, b) => {
        return a.price - b.price;
    }); 
}

document.getElementById('sortLow').addEventListener('click', function() {
    sortByLowPrice(); 
    main(); 
});


export function sortByHighPrice() {
    rainyArray.sort((a, b) => {
        return b.price - a.price;
    });
}

export function filterJacketsByGender(gender) {
    const filteredArray = rainyArray.filter(item => item.gender === gender);
    main(filteredArray); 
}


document.getElementById('sortHigh').addEventListener('click', function() {
    sortByHighPrice(); 
    main(); 
});


document.getElementById('filterFemale').addEventListener('click', function() {
    filterJacketsByGender('Female');
});

document.getElementById('filterMale').addEventListener('click', function() {
    filterJacketsByGender('Male');
});

document.getElementById('filterAll').addEventListener('click', function() {
    main();
})
