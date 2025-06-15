// làm active cho phần nav ở header
//  lấy ra và lưu tên file HTML hiện tại đang truy cập
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

// làm slide cho phần feature
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



// Xử lý thêm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".book-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // const isLoggedIn = localStorage.getItem("loggedIn") === "true";
            
            // if (!isLoggedIn) {
            //     alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            //     window.location.href = "/html/login.html"; // <-- đổi nếu cần
            //     return;
            // }
            // Tạo key riêng cho từng tài khoản
            // const username = userData.username;
            // const cartKey = `cart_${username}`; 
            // xử lý khi thêm vào giỏ hàng khi đăng nhập
            const bookItem = this.closest(".book-item"); // lấy phần tử cha
            const name = bookItem.querySelector(".book-title").textContent.trim();
            const priceText = bookItem.querySelector(".book-price").textContent.trim(); 
            
            // Chuyển "24,99 đ" thành số 24990
            const price = parseFloat(priceText.replace("đ", "").replace(",", "").trim());

            // Lấy div có background-image (giả sử class là bắt đầu bằng "book-img")
            const imgDiv = bookItem.querySelector("[class^='book-img']");
            const style = window.getComputedStyle(imgDiv);
            const imageUrl = style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

            // Lấy giỏ hàng hiện tại
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Kiểm tra sản phẩm đã tồn tại chưa
            const existingIndex = cart.findIndex(item => item.name === name);
            if (existingIndex !== -1) {
                cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
            } else {
                cart.push({ name, price, quantity: 1, imageUrl });
            }

            // Lưu lại
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm "${name}" vào giỏ hàng`);
        });
    });
});

// xử lý vòng lặp di chuyển vô hạn

const track  = document.getElementById('testimonialTrack');
  const speed  = 0.6;         // px mỗi frame – chỉnh nhỏ hơn để chậm hơn
  let offset   = 0;

  // Nhân đôi nội dung để tạo hiệu ứng liền mạch A‑B‑…‑A‑B‑…
  track.innerHTML += track.innerHTML;

  let pause = false;          // pause khi hover (tùy chọn)
//   track.addEventListener('mouseenter', () => pause = true);
//   track.addEventListener('mouseleave', () => pause = false);

  function animate() {
    // if (!pause) offset += speed;
    offset += speed;
    // Khi đã cuộn hết nửa track (hết phần gốc) → reset
    if (offset >= track.scrollWidth / 2) offset = 0;
    track.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(animate);
  }
  animate();
