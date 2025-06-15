

// Hàm Thêm Sản Phẩm Vào Giỏ Hàng 
function addToCart(productName, productPrice, imageUrl) {
    // Ép kiểu chắc chắn
    const price = parseFloat(productPrice.toString().replace(/[^\d.]/g, ''));

    if (!productName || isNaN(price)) {
        console.error("Tham số không hợp lệ khi thêm vào giỏ:", productName, productPrice);
        alert("Lỗi: Không thể thêm sản phẩm vào giỏ hàng.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, imageUrl: imageUrl });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm "${productName}" vào giỏ hàng!`);
    updateCartCount(); 
}





// --- 3. Hàm Hiển Thị Giỏ Hàng Lên Màn Hình
function displayCartItems() {
    
//     if (!userData) {
//     alert("Bạn cần đăng nhập để xem giỏ hàng.");
//     window.location.href = "/html/login.html"; 
//     return;
//   }

//   const username = userData.username;
//   const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items-display");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Giỏ hàng của bạn đang trống.</p>';
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tổng cộng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price);
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    html += `
      <tr>
        <td>
            <div class="cart-item-info">
                <div class="cart-image-preview" style="background-image: url('${item.imageUrl}')"></div>
                <span>${item.name}</span>
            </div>
        </td>
        
        <td>${price.toLocaleString('vi-VN')} VNĐ</td>
        <td class="quantity-controls">
           
          <button onclick="decreaseQuantity(${index})" data-index="${index}" data-action="decrease">-</button>
          <span>${quantity}</span>
          <button onclick="increaseQuantity(${index})" data-index="${index}" data-action="increase">+</button>
        </td>
        <td>${itemTotal.toLocaleString('vi-VN')} VNĐ</td>
        <td><button onclick="removeItem(${index})" class="remove-item-btn" data-index="${index}">Xóa</button></td>
      </tr>
    `;
  });

  html += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"><strong>Tổng tiền giỏ hàng:</strong></td>
          <td><strong>${total.toLocaleString('vi-VN')} VNĐ</strong></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  `;

  container.innerHTML = html;
  attachCartEventListeners();
}

// hàm xử lý nút tăng
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    cart[index].quantity = (cart[index].quantity || 1) + 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// hàm xưer lý nút giảm
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }// } else {
    //     const confirmDelete = confirm(`Bạn có muốn xóa "${cart[index].name}" khỏi giỏ hàng?`);
    //     if (confirmDelete) {
    //         cart.splice(index, 1);
    //     } else {
    //         return;
    //     }
    // }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// hàm xử lý nút xóa
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa "${cart[index].name}" khỏi giỏ hàng?`);
        if (confirmDelete) {
            cart.splice(index, 1); // Xoá sản phẩm khỏi giỏ
            localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại localStorage
            displayCartItems(); // Render lại bảng
            updateCartCount();  // Cập nhật số trên giỏ hàng
        }
    }
}




// 5. Hàm Cập Nhật Số Lượng Sản Phẩm Trên Icon Giỏ Hàng ở Header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountSpan = document.getElementById("cart-count"); // Đảm bảo ID này tồn tại trong HTML header của bạn

    if (cartCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCountSpan.textContent = totalItems;
            cartCountSpan.style.display = 'inline-block'; // Hiển thị số lượng
        } else {
            cartCountSpan.style.display = 'none'; // Ẩn nếu không có sản phẩm
        }
    }
}


// --- 6. Chạy khi DOM đã sẵn sàng ---
document.addEventListener("DOMContentLoaded", () => {
    // Chỉ hiển thị giỏ hàng nếu đây là trang shopping.html
    // Bạn có thể kiểm tra URL hoặc một ID/class đặc trưng của trang
    if (document.title === "Giỏ Hàng Của Bạn" || window.location.pathname.includes('/html/shopping.html')) {
        displayCartItems();
    }
    
});
    