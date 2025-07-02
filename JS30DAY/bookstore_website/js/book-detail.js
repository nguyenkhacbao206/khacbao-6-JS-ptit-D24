document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get("id"));

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const book = products[bookId];

  const container = document.getElementById("book-detail-content");

  if (!book) {
    container.innerHTML = "<p>Không tìm thấy sách!</p>";
    return;
  }

  const fullStars = Math.floor(book.rating);
  const halfStar = book.rating % 1 >= 0.5;
  let starHtml = "";
  for (let i = 0; i < fullStars; i++) starHtml += '<i class="fa-solid fa-star"></i>';
  if (halfStar) starHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starHtml += '<i class="fa-regular fa-star"></i>';

  container.innerHTML = `
  <div class="book-detail">
    <img src="${book.image}" alt="${book.name}" class="book-detail-img" />
    <div class="book-detail-info">
      <h2>${book.name}</h2>
      <p><strong>Tác giả:</strong> ${book.author}</p>
      <p><strong>Giá:</strong> ${book.price.toLocaleString('vi-VN')} đ</p>
      <p><strong>Thể loại:</strong> ${book.type}</p>
      <p><strong>Đánh giá:</strong> ${starHtml}</p>
      <p><strong>Mô tả:</strong> ${book.description}</p>
      <button class="add-cart-btn" onclick="addToCart('${book.name}')">Thêm vào giỏ hàng</button>
    </div>
  </div>

  <!-- ✅ Di chuyển phần đánh giá RA NGOÀI book-detail -->
  <div class="review-section">
    <h3>Đánh giá sách</h3>
    <div class="star-input">
      <label>Chọn sao: </label>
      <select id="review-stars">
        <option value="5">⭐⭐⭐⭐⭐ - Rất hay</option>
        <option value="4">⭐⭐⭐⭐ - Hay</option>
        <option value="3">⭐⭐⭐ - Bình thường</option>
        <option value="2">⭐⭐ - Không thích</option>
        <option value="1">⭐ - Tệ</option>
      </select>
    </div>
    <textarea id="review-comment" placeholder="Viết nhận xét của bạn..." rows="3"></textarea>
    <button id="submit-review">Gửi đánh giá</button>

    <h4>📋 Nhận xét từ người dùng:</h4>
    <div id="review-list">Chưa có đánh giá nào.</div>
  </div>
`;

// Gắn sự kiện cho nút Gửi đánh giá
document.getElementById("submit-review").addEventListener("click", () => {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    alert("Bạn cần đăng nhập để đánh giá!");
    window.location.href = "/html/login.html";
    return;
  }

  const stars = parseInt(document.getElementById("review-stars").value);
  const comment = document.getElementById("review-comment").value.trim();

  if (!comment) {
    alert("Vui lòng nhập nhận xét.");
    return;
  }

  const allReviews = JSON.parse(localStorage.getItem("bookReviews")) || {};
  const reviews = allReviews[bookId] || [];

  if (window.editingReviewIndex !== undefined) {
    // ✅ Nếu đang sửa
    reviews[window.editingReviewIndex] = { stars, comment, username };
    window.editingReviewIndex = undefined;
    document.getElementById("submit-review").textContent = "Gửi đánh giá";
  } else {
    // ✅ Thêm mới
    reviews.push({ stars, comment, username });
  }

  allReviews[bookId] = reviews;
  localStorage.setItem("bookReviews", JSON.stringify(allReviews));

  document.getElementById("review-comment").value = "";
  renderReviews(bookId);
  alert("Cảm ơn bạn đã đánh giá!");
});


// Gọi hàm hiển thị đánh giá
renderReviews(bookId);
});



function addToCart(name) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const book = products.find(p => p.name === name);
  if (!book) return;

  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
    window.location.href = "/html/login.html";
    return;
  }

  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ name: book.name, price: book.price, quantity: 1, imageUrl: book.image });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`Đã thêm "${book.name}" vào giỏ hàng!`);
}


// xử lý phần đánh giá
function renderReviews(bookId) {
  const list = document.getElementById("review-list");
  const allReviews = JSON.parse(localStorage.getItem("bookReviews")) || {};
  const reviews = allReviews[bookId] || [];

  const currentUser = localStorage.getItem("loggedInUser");

  if (reviews.length === 0) {
    list.innerHTML = "<p>Chưa có đánh giá nào.</p>";
    return;
  }

  list.innerHTML = reviews.map((r, i) => `
    <div class="review-item">
      <div class="review-user">
        <strong>${r.username || "Ẩn danh"}</strong> đánh giá:
        ${
          r.username === currentUser
            ? `
              <button class="edit-review" data-index="${i}">Sửa</button>
              <button class="delete-review" data-index="${i}">Xoá</button>
            `
            : ""
        }
      </div>
      <div class="review-stars">${"⭐".repeat(r.stars)}</div>
      <div class="review-text">${r.comment}</div>
    </div>
  `).join("");

  // Xử lý xoá
  document.querySelectorAll(".delete-review").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      const reviews = allReviews[bookId] || [];
      reviews.splice(index, 1);
      allReviews[bookId] = reviews;
      localStorage.setItem("bookReviews", JSON.stringify(allReviews));
      renderReviews(bookId);
    });
  });

  // Xử lý sửa
  document.querySelectorAll(".edit-review").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      const review = reviews[index];

      // Ghi nhớ index đang sửa
      window.editingReviewIndex = index;

      // Đổ dữ liệu vào form
      document.getElementById("review-stars").value = review.stars;
      document.getElementById("review-comment").value = review.comment;
      document.getElementById("submit-review").textContent = "Cập nhật đánh giá";
    });
  });
}




// Gọi hiển thị khi tải trang
renderReviews(bookId);
