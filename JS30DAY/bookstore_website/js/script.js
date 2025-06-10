const listFeature = document.getElementById("list-feature");
const slides = document.querySelectorAll(".feature-container");
let current = 1;
const total = slides.length;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// clone phần tử đầu và cuối
listFeature.appendChild(firstClone);
listFeature.insertBefore(lastClone, listFeature.firstChild);

// cập nhật lại 
const updateSlides = document.querySelectorAll(".feature-container");
const widthSlide = 100;
listFeature.style.transform = `translateX(-${widthSlide}%)`;

let autoSlideInterval;

// Hàm chuyển slide
function moveToNextSlide() {
    current++;
    listFeature.style.transition = "transform 0.5s ease-in-out";
    listFeature.style.transform = `translateX(-${widthSlide * current}%)`;
}

function moveToPrevSlide() {
    current--;
    listFeature.style.transition = "transform 0.5s ease-in-out";
    listFeature.style.transform = `translateX(-${widthSlide * current}%)`;
}

// Reset nếu đến đầu hoặc cuối
listFeature.addEventListener("transitionend", () => {
    // Nếu đang ở bản clone cuối -> nhảy về slide đầu thật
    if (current === updateSlides.length - 1) {
        listFeature.style.transition = "none";
        current = 1;
        listFeature.style.transform = `translateX(-${current * widthSlide}%)`;
    }

    // Nếu đang ở bản clone đầu -> nhảy về slide cuối thật
    if (current === 0) {
        listFeature.style.transition = "none";
        current = updateSlides.length - 2;
        listFeature.style.transform = `translateX(-${current * widthSlide}%)`;
    }
});

// Hàm tự động chạy
function startAutoSlide() {
    stopAutoSlide(); // tránh tạo nhiều interval
    autoSlideInterval = setInterval(() => {
        moveToNextSlide();
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Khởi động
startAutoSlide();

// Dừng khi hover, chạy lại khi rời chuột
listFeature.addEventListener("mouseenter", stopAutoSlide);
listFeature.addEventListener("mouseleave", startAutoSlide);

// xử lý nút next với prev
document.querySelector("#btn-next").addEventListener("click", () => {
    moveToNextSlide();
});
document.querySelector("#btn-prev").addEventListener("click", () => {
    moveToPrevSlide();
});


// xử lý hiện xin chào tên và đăng xuất


// xử lý xin chào tên

const loggedInUsername = localStorage.getItem("loggedInUser");
const users = JSON.parse(localStorage.getItem("users")) || {};

const greentingSection = document.getElementById("greentingSection");
const userFullname = document.getElementById("userFullName");
const authLinks = document.getElementById("authLinks");
const logoutBtn = document.getElementById("logoutbtn");

if (loggedInUsername && users[loggedInUsername]) {
    const fullName = users[loggedInUsername].fullName || "";
    const nameParts = fullName.trim().split(" ");
    const shortName = nameParts[nameParts.length-1];


    userFullname.textContent = shortName;
    greentingSection.style.display = "inline";
    authLinks.style.display = "none";
};

// xử lý đăng xuất 

logoutBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    // ẩn phầ xin chào và đăng xuất
     greentingSection.style.display = "none";

    // Hiện lại phần Đăng ký / Đăng nhập
    authLinks.style.display = "inline";
    // location.reload();
});