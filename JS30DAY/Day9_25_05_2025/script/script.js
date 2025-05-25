const backgroundselect = document.getElementById('background-select')
const changebackgroundbtn = document.getElementById('change-background-btn')

const backgroundImages = {
    mountain: "/JS30DAY/Day9_25_05_2025/assets/images/mountain.jpg",
    sea: "/JS30DAY/Day9_25_05_2025/assets/images/sea.jpg",
    forest: "/JS30DAY/Day9_25_05_2025/assets/images/forest.jpg",
    city: "/JS30DAY/Day9_25_05_2025/assets/images/city.jpg"
}

changebackgroundbtn.addEventListener('click', function() {
    const selectedValue = backgroundselect.value
    const imageUrl = backgroundImages[selectedValue]
    
    if (imageUrl) {
        document.body.style.backgroundImage = `url("${imageUrl}")`
    }else {
        console.warn("không tìm thấy ảnh url", selectedValue)
    }
})
