document.addEventListener('DOMContentLoaded', () => {
    images = [
        "/JS30DAY/Day10_26_05_2025/assets/images/mountain.jpg",
        "/JS30DAY/Day10_26_05_2025/assets/images/sea.jpg",
        "/JS30DAY/Day10_26_05_2025/assets/images/city.jpg",
        "/JS30DAY/Day10_26_05_2025/assets/images/forest.jpg"
    ]

    let currentImgIndex = 0;
    const currentImgElement = document.getElementById('currentImage');
    const prevbtn = document.getElementById('prevBtn')
    const nextbtn = document.getElementById('nextBtn')
    function updateImage() {
        currentImgElement.src = images[currentImgIndex]
    }

    prevbtn.addEventListener('click', () => {
        currentImgIndex--;
        if (currentImgIndex < 0) {
            currentImgIndex = images.length - 1;
        };
        updateImage();
    });
    nextbtn.addEventListener('click', () => {
        currentImgIndex++;
        if (currentImgIndex >= images.length) {
            currentImgIndex = 0;
        }
        updateImage()
    })
    updateImage()

});