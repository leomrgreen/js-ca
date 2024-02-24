const slidesContainer = document.getElementById('slides');
let currentIndex = 0;

const BASE_API_URL = 'https://v2.api.noroff.dev';
const API_URL = `${BASE_API_URL}/rainy-days`;

async function getArray() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        carouselArray = json.data; 
        imageCarousel(carouselArray); 
    } catch (error) {
        console.error('Error:', error);
    }
}


function imageCarousel(carouselArray) {
    slidesContainer.innerHTML = '';
    for (let i = 0; i < carouselArray.length; i++) {
        const carouselImage = document.createElement('div');
        if (i === 0) {
            carouselImage.style.display = 'flex';
        } else {
            carouselImage.style.display = 'none';
        }
        
        carouselImage.innerHTML = 
        `<img src="${carouselArray[i].image.url}">
        <h2>${carouselArray[i].title}</h2>`;
        
        carouselImage.setAttribute('class', 'sliderItem');
        slidesContainer.appendChild(carouselImage);
    }
}



function showCurrentImage() {
    const images = slidesContainer.querySelectorAll('div');
    images.forEach((div, index) => {
        if (index === currentIndex) {
            div.style.display = 'flex';
        } else {
            div.style.display = 'none';
        }
    });
}



document.getElementById('next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % carouselArray.length; 
    showCurrentImage();
});


document.getElementById('prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + carouselArray.length) % carouselArray.length;  
    showCurrentImage();
});


getArray();