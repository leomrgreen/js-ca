document.getElementById('sortLow').addEventListener('click', function() {
    sortByLowPrice(rainyArray); 
});


function sortByHighPrice(rainyArray) {
    rainyArray.sort((a, b) => {
        return b.price - a.price;
    });
}



function filterJacketsByGender(gender) {
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

