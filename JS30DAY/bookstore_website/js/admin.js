// Kiểm tra đăng nhập admin
document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = localStorage.getItem("adminLoggedIn");
  if (isAdmin !== "true") {
    alert("Bạn cần đăng nhập tài khoản admin để truy cập.");
    window.location.href = "/html/login.html";
  }
});

let editingIndex = null;

function showSection(section) {
  document.getElementById("add-section").style.display = section === "add" ? "block" : "none";
  document.getElementById("manage-section").style.display = section === "manage" ? "block" : "none";
  document.getElementById("review-section").style.display = section === "review" ? "block" : "none";
}

// Xử lý thêm / cập nhật sản phẩm
const form = document.getElementById("add-product-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value.trim());
  const imageInput = document.getElementById("product-image");
  const author = document.getElementById("product-author").value.trim();
  const description = document.getElementById("product-description").value.trim();
  const rating = parseFloat(document.getElementById("product-rating").value.trim());
  const type = document.getElementById("product-type").value.trim();
  const message = document.getElementById("admin-message");

  if (!name || isNaN(price) || !author || !description || isNaN(rating) || !type) {
    message.textContent = "❌ Vui lòng nhập đầy đủ và hợp lệ tất cả các trường.";
    message.style.color = "red";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64Image = reader.result;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (editingIndex !== null) {
      products[editingIndex] = { name, price, image: base64Image, author, description, rating, type };
      editingIndex = null;
      form.querySelector("button").textContent = "Thêm sản phẩm";
      message.textContent = "✅ Cập nhật sản phẩm thành công!";
      message.style.color = "green";
    } else {
      products.push({ name, price, image: base64Image, author, description, rating, type });
      message.textContent = "✅ Thêm sản phẩm thành công!";
      message.style.color = "green";
    }

    localStorage.setItem("products", JSON.stringify(products));

    const genres = JSON.parse(localStorage.getItem("genres")) || [];
    if (!genres.includes(type)) {
      genres.push(type);
      localStorage.setItem("genres", JSON.stringify(genres));
    }

    form.reset();
    renderAdminBooks();
    showSection("manage");
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else if (editingIndex !== null) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const oldImage = products[editingIndex].image;
    reader.onload({ target: { result: oldImage } });
  } else {
    message.textContent = "❌ Vui lòng chọn ảnh cho sản phẩm mới.";
    message.style.color = "red";
  }
});

function renderAdminBooks() {
  const container = document.getElementById("admin-books-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>Không có sản phẩm nào.</p>";
    return;
  }

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "admin-book-item";
    div.innerHTML = `
      <strong>${product.name}</strong> - ${product.author} - ${product.price.toLocaleString()} đ - ${product.type || "Không rõ thể loại"}
      <button class="edit-admin-book" data-index="${index}">Sửa</button>
      <button class="delete-admin-book" data-index="${index}">Xóa</button>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll(".delete-admin-book").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = +this.getAttribute("data-index");
      if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
      const products = JSON.parse(localStorage.getItem("products")) || [];
      products.splice(idx, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderAdminBooks();
    });
  });

  container.querySelectorAll(".edit-admin-book").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = +this.getAttribute("data-index");
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const product = products[idx];

      document.getElementById("product-name").value = product.name;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-author").value = product.author;
      document.getElementById("product-description").value = product.description;
      document.getElementById("product-rating").value = product.rating;
      document.getElementById("product-type").value = product.type || "";

      editingIndex = idx;
      form.querySelector("button").textContent = "Cập nhật sản phẩm";
      showSection("add");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderAdminBooks);

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
