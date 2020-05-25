const carousels = document.querySelectorAll(".carousel-outer");

function getWidth(item) {
    return item.getBoundingClientRect().width;
}

carousels.forEach(initCarousel);