document.addEventListener("DOMContentLoaded", function () {
  // Kích hoạt nav menu hiện tại
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");
  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Hiển thị giỏ hàng
  const cartContainer = document.getElementById("cart-items-display");
  const emptyMessage = document.querySelector(".empty-cart-message");

  // Lấy giỏ hàng từ localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Nếu có sản phẩm trong giỏ
  if (cart.length > 0) {
    emptyMessage.style.display = "none"; // Ẩn thông báo giỏ hàng trống

    // Tạo HTML sản phẩm
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Số lượng: ${item.quantity}</p>
        <p>Giá: ${item.price.toLocaleString()}đ</p>
        <hr/>
      `;
      cartContainer.appendChild(itemDiv);
    });
  } else {
    emptyMessage.style.display = "block"; // Hiển thị khi giỏ rỗng
  }
});
