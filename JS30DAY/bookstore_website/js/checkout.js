// checkout.js - xử lý hiển thị đơn hàng và xác nhận thanh toán

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("userLoggedIn");
  if (!username) {
    alert("Bạn cần đăng nhập để thanh toán.");
    window.location.href = "/html/login.html";
    return;
  }

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const summary = document.getElementById("checkout-summary");
  const form = document.getElementById("checkout-form");

  if (cart.length === 0) {
    summary.innerHTML = "<p>Giỏ hàng trống.</p>";
    form.style.display = "none";
    return;
  }

  // Hiển thị đơn hàng có ảnh
  let total = 0;
  let html = "";
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    total += itemTotal;

    html += `
      <div class="checkout-item">
        <img src="${item.imageUrl}" alt="ảnh">
        <div class="checkout-item-info">
          <span><strong>${item.name}</strong></span>
          <span>Số lượng: x${qty}</span>
          <span>Thành tiền: ${itemTotal.toLocaleString()} đ</span>
        </div>
      </div>
    `;
  });

  html += `<p><strong>Tổng cộng: ${total.toLocaleString()} đ</strong></p>`;
  summary.innerHTML = html;

  document.getElementById("payment-method").addEventListener("change", function () {
    const value = this.value;

    // Ẩn cả hai trước
    document.getElementById("qr-bank").style.display = "none";
    document.getElementById("qr-momo").style.display = "none";

    // Hiện đúng cái được chọn
    if (value === "bank") {
      document.getElementById("qr-bank").style.display = "block";
    } else if (value === "momo") {
      document.getElementById("qr-momo").style.display = "block";
    }
  });

  // thanh toán
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const method = document.getElementById("payment-method").value;

    if (!name || !phone || !email || !method) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const order = {
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      customer: { name, phone, email, method }
    };

    const historyKey = `order_history_${username}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history.push(order);
    if (history.length > 10) history.shift()
    localStorage.setItem(historyKey, JSON.stringify(history));

    localStorage.removeItem(cartKey);
    alert("Thanh toán thành công! Đơn hàng đã được lưu.");
    window.location.href = "/html/history.html";
  });
});
