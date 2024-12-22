let currentIndex = 0;
let interval;

function updateSlidePosition() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveSlide(direction) {
    clearInterval(interval); // Stop the auto-slide temporarily
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    currentIndex = (currentIndex + direction + itemCount) % itemCount;

    updateSlidePosition();
    startAutoSlide(); // Restart auto-slide
}

function startAutoSlide() {
    interval = setInterval(() => {
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;

        currentIndex = (currentIndex + 1) % itemCount; // Cycle through slides seamlessly
        updateSlidePosition();
    }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    startAutoSlide();
});

document.querySelector('.carousel-control-prev').addEventListener('click',() =>{
    moveSlide(-1)
})
document.querySelector('.carousel-control-next').addEventListener('click',() =>{
    moveSlide(1)
})
