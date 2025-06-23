

// Hàm Thêm Sản Phẩm Vào Giỏ Hàng 
function addToCart(productName, productPrice, imageUrl) {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      alert("Bạn cần đăng nhập để mua hàng.");
      window.location.href = "/html/login.html";
      return;
    }

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Ép kiểu chắc chắn
    const price = parseFloat(productPrice.toString().replace(/[^\d.]/g, ''));

    if (!productName || isNaN(price)) {
        console.error("Tham số không hợp lệ khi thêm vào giỏ:", productName, productPrice);
        alert("Lỗi: Không thể thêm sản phẩm vào giỏ hàng.");
        return;
    }

    // let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, imageUrl: imageUrl });
    }

    // localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`Đã thêm "${productName}" vào giỏ hàng!`);
    updateCartCount(); 
}





// --- 3. Hàm Hiển Thị Giỏ Hàng Lên Màn Hình
function displayCartItems() {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    alert("Bạn cần đăng nhập để xem giỏ hàng.");
    window.location.href = "/html/login.html"; 
    return;
  }

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
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
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </td>
        <td>${itemTotal.toLocaleString('vi-VN')} VNĐ</td>
        <td><button onclick="removeItem(${index})">Xóa</button></td>
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
  attachCartEventListeners(); // nếu bạn có xử lý sự kiện tăng/giảm/xóa
}


// hàm xử lý nút tăng
function increaseQuantity(index) {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
        alert("Bạn cần đăng nhập.");
        return;
    }

    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!cart[index]) return;

    cart[index].quantity = (cart[index].quantity || 1) + 1;

    localStorage.setItem(cartKey, JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// hàm xưer lý nút giảm
function decreaseQuantity(index) {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
        alert("Bạn cần đăng nhập.");
        return;
    }

    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        const confirmDelete = confirm(`Bạn có muốn xóa "${cart[index].name}" khỏi giỏ hàng?`);
        if (confirmDelete) {
            cart.splice(index, 1);
        } else {
            return;
        }
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}


// hàm xử lý nút xóa
function removeItem(index) {
  const username = localStorage.getItem("loggedInUser");
  if (!username) return;

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart.splice(index, 1);

  localStorage.setItem(cartKey, JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}




// 5. Hàm Cập Nhật Số Lượng Sản Phẩm Trên Icon Giỏ Hàng ở Header
function updateCartCount() {
    const username = localStorage.getItem("loggedInUser");
    if (!username) return; 

    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartCountSpan = document.createElement("span"); 

   
    const iconShopping = document.querySelector(".icon-shopping");

    // Kiểm tra nếu chưa có phần tử cart-count thì tạo và thêm vào icon-shopping
    if (!document.getElementById("cart-count") && iconShopping) {
        cartCountSpan.id = "cart-count";
        cartCountSpan.style.cssText = `
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            margin-left: 4px;
            display: none;
        `;
        iconShopping.appendChild(cartCountSpan);
    }

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = "inline-block";
        } else {
            cartCount.style.display = "none";
        }
    }
}

// xử lý thanh toán
// document.addEventListener("DOMContentLoaded", function () {
//     const checkoutBtn = document.getElementById("checkout-btn");

//     if (checkoutBtn) {
//         checkoutBtn.addEventListener("click", function () {
//             const username = localStorage.getItem("loggedInUser");
//             if (!username) {
//                 alert("Bạn cần đăng nhập để thanh toán.");
//                 window.location.href = "/html/login.html";
//                 return;
//             }

//             const cartKey = `cart_${username}`;
//             const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

//             if (cart.length === 0) {
//                 alert("Giỏ hàng trống, không thể thanh toán.");
//                 return;
//             }

//             // Tính tổng tiền
//             const totalAmount = cart.reduce((sum, item) => {
//                 return sum + item.price * (item.quantity || 1);
//             }, 0);

//             const confirmPay = confirm(`Xác nhận thanh toán ${totalAmount.toLocaleString('vi-VN')} VNĐ?`);
//             if (!confirmPay) return;

//             // Lưu lịch sử đơn hàng
//             const historyKey = `order_history_${username}`;
//             const history = JSON.parse(localStorage.getItem(historyKey)) || [];
//             history.push({
//                 items: cart,
//                 total: totalAmount,
//                 date: new Date().toLocaleString(),
//             });
//             localStorage.setItem(historyKey, JSON.stringify(history));

//             // Xoá giỏ hàng sau thanh toán
//             localStorage.removeItem(cartKey);
//             alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
            
//             displayCartItems();
//             updateCartCount();
//         });
//     }
  
// });

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const username = localStorage.getItem("userLoggedIn");
      if (!username) {
        alert("Bạn cần đăng nhập để thanh toán.");
        window.location.href = "/html/login.html";
        return;
      }

      const cartKey = `cart_${username}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      if (cart.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán.");
        return;
      }

      // Chuyển sang trang xác nhận thanh toán
      window.location.href = "/html/checkout.html";
    });
  }
});

// --- 6. Chạy khi DOM đã sẵn sàng ---
document.addEventListener("DOMContentLoaded", () => {
    // Chỉ hiển thị giỏ hàng nếu đây là trang shopping.html
    // Bạn có thể kiểm tra URL hoặc một ID/class đặc trưng của trang
    if (document.title === "Giỏ Hàng Của Bạn" || window.location.pathname.includes('/html/shopping.html')) {
        displayCartItems();
    }
    
});
    