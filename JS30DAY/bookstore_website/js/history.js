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
          <button class="print-btn" onclick="printOrder(this)">🖨️ In hóa đơn</button>
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

function printOrder(button) {
  const td = button.closest("td");
  if (!td) return;

  
  const cloned = td.cloneNode(true);

  //  XÓA NÚT IN TRONG BẢN SAO
  const printBtn = cloned.querySelector(".print-btn");
  if (printBtn) printBtn.remove();
  //  Tìm hàng chứa tổng tiền
  const row = td.closest("tr");
  const totalCell = row.querySelector("td:nth-child(3)"); // Cột thứ 3 là tổng tiền
  const totalText = totalCell ? totalCell.textContent.trim() : "Không rõ";

  // Tạo dòng tổng tiền để in rõ ràng
  const totalDiv = document.createElement("div");
  totalDiv.style = "margin-top: 10px; font-weight: bold;";
  totalDiv.textContent = `Tổng tiền: ${totalText}`;

  // Gắn dòng tổng tiền vào bản in
  cloned.appendChild(document.createElement("hr"));
  cloned.appendChild(totalDiv);


  // In bản sao đã xóa nút
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>Hóa đơn</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h2 { text-align: center; }
        div { margin-bottom: 6px; }
        hr { margin: 10px 0; }
      </style>
    </head>
    <body>
      <h2>🧾 HÓA ĐƠN MUA HÀNG</h2>
      ${cloned.innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

