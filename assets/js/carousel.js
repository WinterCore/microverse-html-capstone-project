function getWidth(item) {
    return item.getBoundingClientRect().width;
}

function getItemsCount(item) {
    const w = window.innerWidth;
    const d = item.dataset.items;
    if (w < 576)
        return item.dataset.smItems || d;
    else if (w < 768)
        return item.dataset.mdItems || d;
    return d;
}

function initCarousel(item) {
    const $arrowLeft = item.querySelector(".carousel-arrow.left .carousel-control");
    const $arrowRight = item.querySelector(".carousel-arrow.right .carousel-control");
    const $content = item.querySelector(".carousel-items");
    const $contentOuter = item.querySelector(".carousel-items-outer")
    const $carouselElements = $content.querySelectorAll(".carousel-item");
    let itemsCount = getItemsCount(item);
    let visibleWidth = getWidth($contentOuter);
    let widthPerItem = visibleWidth / itemsCount;
    let maxWidth = widthPerItem * $carouselElements.length;

    $content.style.width = maxWidth + "px";
    $carouselElements.forEach((item) => item.style.width = widthPerItem + "px");

    let prevTimeout = 0;
    let position = 0;
    window.addEventListener("resize", function () {
        this.clearTimeout(prevTimeout);
        prevTimeout = setTimeout(() => {
            itemsCount           = getItemsCount(item);
            visibleWidth         = getWidth($contentOuter);
            widthPerItem         = visibleWidth / itemsCount;
            maxWidth             = widthPerItem * $carouselElements.length;
            $content.style.width = maxWidth + "px";
            $carouselElements.forEach((item) => item.style.width = widthPerItem + "px");
            position = position > $carouselElements.length - itemsCount ? $carouselElements.length - itemsCount : position;
            $content.style.transform = "translateX(" + -(position * widthPerItem) + "px)";
        }, 300);
    });
    $arrowLeft.addEventListener("click", () => {
        if (position === 0) return;
        position -= 1;
        $content.style.transform = "translateX(" + (-position * widthPerItem) + "px)";
    });
    $arrowRight.addEventListener("click", () => {
        if (position >= $carouselElements.length - itemsCount) return;
        position += 1;
        $content.style.transform = "translateX(" + (-position * widthPerItem) + "px)";
    });
}