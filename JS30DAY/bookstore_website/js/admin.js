// kiểm tra người dùng admin đăng nhập
// Bảo vệ trang admin - chỉ cho admin đã đăng nhập
    document.addEventListener("DOMContentLoaded", function () {
      const isAdmin = localStorage.getItem("adminLoggedIn");
      if (isAdmin !== "true") {
        alert("Bạn cần đăng nhập tài khoản admin để truy cập.");
        window.location.href = "/html/login.html";
      }
    });
document.getElementById("add-product-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value.trim());
    const imageInput = document.getElementById("product-image");
    const author = document.getElementById("product-author").value.trim();
    const description = document.getElementById("product-description").value.trim();
    const rating = parseFloat(document.getElementById("product-rating").value.trim());
    const message = document.getElementById("admin-message");

    if (!name || isNaN(price) || !imageInput.files[0] || !author || !description || isNaN(rating)) {
        message.textContent = "❌ Vui lòng nhập đầy đủ và hợp lệ tất cả các trường.";
        message.style.color = "red";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const base64Image = reader.result;

        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ name, price, image: base64Image, author, description, rating });
        localStorage.setItem("products", JSON.stringify(products));

        message.textContent = "✅ Thêm sản phẩm thành công!";
        message.style.color = "green";
        e.target.reset();
    };

    reader.readAsDataURL(imageInput.files[0]);
});

let editingIndex = null;

function showSection(section) {
  document.getElementById("add-section").style.display = section === "add" ? "block" : "none";
  document.getElementById("manage-section").style.display = section === "manage" ? "block" : "none";
}

function renderAdminBooks() {
  const container = document.getElementById("admin-books-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (!container) return;

  container.innerHTML = "";
  if (products.length === 0) {
    container.innerHTML = "<p>Không có sản phẩm nào.</p>";
    return;
  }

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "admin-book-item";
    div.innerHTML = `
      <strong>${product.name}</strong> - ${product.author} - ${product.price.toLocaleString()} đ
      <button class="edit-admin-book" data-index="${index}">Sửa</button>
      <button class="delete-admin-book" data-index="${index}">Xóa</button>
    `;
    container.appendChild(div);
  });

  // Gắn sự kiện XÓA
  container.querySelectorAll(".delete-admin-book").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = +this.getAttribute("data-index");
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
      if (!confirmDelete) return;

      products.splice(idx, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderAdminBooks();
    });
  });

  // Gắn sự kiện SỬA
  container.querySelectorAll(".edit-admin-book").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = +this.getAttribute("data-index");
      const product = products[idx];

      // Đổ dữ liệu cũ lên form
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-author").value = product.author;
      document.getElementById("product-description").value = product.description;
      document.getElementById("product-rating").value = product.rating;

      // Không thể sửa ảnh trực tiếp (vì input type="file" không cho set value)
      alert("Lưu ý: Nếu bạn muốn đổi ảnh, hãy chọn ảnh mới trong ô 'Chọn ảnh'");

      editingIndex = idx;
      document.querySelector("#add-product-form button").textContent = "Cập nhật sản phẩm";
      showSection("add");
    });
  });
}

document.getElementById("add-product-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value);
  const image = document.getElementById("product-image").files[0];
  const author = document.getElementById("product-author").value.trim();
  const description = document.getElementById("product-description").value.trim();
  const rating = parseFloat(document.getElementById("product-rating").value);

  if (!name || isNaN(price) || !author || !description || isNaN(rating)) {
    alert("Vui lòng điền đầy đủ thông tin hợp lệ.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (editingIndex !== null) {
      // Cập nhật sản phẩm
      products[editingIndex] = { name, price, image: imageData, author, description, rating };
      editingIndex = null;
      document.querySelector("#add-product-form button").textContent = "Thêm sản phẩm";
      alert("Đã cập nhật sản phẩm.");
    } else {
      // Thêm mới
      products.push({ name, price, image: imageData, author, description, rating });
      alert("Đã thêm sản phẩm mới.");
    }

    localStorage.setItem("products", JSON.stringify(products));
    this.reset();
    renderAdminBooks();
    showSection("manage");
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    // Nếu không có ảnh mới (trường hợp cập nhật), giữ nguyên ảnh cũ
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (editingIndex !== null) {
      const oldImage = products[editingIndex].image;
      reader.onload({ target: { result: oldImage } });
    } else {
      alert("Bạn phải chọn ảnh cho sản phẩm mới.");
    }
  }
});

document.addEventListener("DOMContentLoaded", renderAdminBooks);


// xử lý đăng xuất trang admin
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("admin-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("adminLoggedIn");
      window.location.href = "/html/index.html";
    });
  }
});