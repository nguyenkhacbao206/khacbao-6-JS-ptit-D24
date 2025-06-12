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