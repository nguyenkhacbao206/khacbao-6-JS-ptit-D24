document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("userLoggedIn") || "guest";
  const orderHistoryKey = `order_history_${username}`;
  const historyData = JSON.parse(localStorage.getItem(orderHistoryKey)) || [];

  const container = document.getElementById("history-container");

  if (historyData.length === 0) {
    container.innerHTML = '<p style="text-align: center;">Bạn chưa có đơn hàng nào.</p>';
    return;
  }

  let html = `
    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>#</th>
          <th>Thời gian đặt</th>
          <th>Tổng tiền</th>
          <th>Thông tin đơn hàng</th>
        </tr>
      </thead>
      <tbody>
  `;

  historyData.forEach((order, index) => {
    const itemList = order.items.map(item =>
      `<div>${item.name} (x${item.quantity})</div>`
    ).join("");

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${order.date}</td>
        <td>${order.total.toLocaleString('vi-VN')} VNĐ</td>
        <td>
          ${itemList}
          <hr>
          <div><strong>Họ tên:</strong> ${order.customer?.name || ""}</div>
          <div><strong>SĐT:</strong> ${order.customer?.phone || ""}</div>
          <div><strong>Email:</strong> ${order.customer?.email || ""}</div>
          <div><strong>Thanh toán:</strong> ${order.customer?.method || ""}</div>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;

  // Xử lý nút xoá lịch sử
  const clearBtn = document.getElementById("clear-history-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      const confirmClear = confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử mua hàng?");
      if (confirmClear) {
        localStorage.removeItem(orderHistoryKey);
        alert("Đã xóa toàn bộ lịch sử mua hàng.");
        location.reload();
      }
    });
  }
});