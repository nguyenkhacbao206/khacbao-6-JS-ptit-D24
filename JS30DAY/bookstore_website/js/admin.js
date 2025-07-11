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
  document.getElementById("intro-section").style.display = section === "intro" ? "block" : "none";
  document.getElementById("intro-manage-section").style.display = section === "manageIntro" ? "block" : "none";
  document.getElementById("feedback-section").style.display = section === "feedback" ? "block" : "none";
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
    message.textContent = " Vui lòng nhập đầy đủ và hợp lệ tất cả các trường.";
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
      message.textContent = " Cập nhật sản phẩm thành công!";
      message.style.color = "green";
    } else {
      products.push({ name, price, image: base64Image, author, description, rating, type });
      message.textContent = "Thêm sản phẩm thành công!";
      message.style.color = "green";
    }

    localStorage.setItem("products", JSON.stringify(products));

    const genres = JSON.parse(localStorage.getItem("genres")) || [];
    // if (!genres.includes(type)) {
    //   genres.push(type);
    //   localStorage.setItem("genres", JSON.stringify(genres));
    // }

    const updatedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const newGenres = [...new Set(updatedProducts.map(p => p.type.trim()).filter(Boolean))];
    localStorage.setItem("genres", JSON.stringify(newGenres));

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
    message.textContent = " Vui lòng chọn ảnh cho sản phẩm mới.";
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
      <strong>${product.name}</strong> - ${product.author} - ${product.price.toLocaleString('vi-VN')} đ - ${product.type || "Không rõ thể loại"}
      <button class="edit-admin-book" data-index="${index}">Sửa</button>
      <button class="delete-admin-book" data-index="${index}">Xóa</button>
    `;
    container.appendChild(div);
  });

  //  Gắn sự kiện XÓA và cập nhật genres
  container.querySelectorAll(".delete-admin-book").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = +this.getAttribute("data-index");
      if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

      const products = JSON.parse(localStorage.getItem("products")) || [];
      products.splice(idx, 1);
      localStorage.setItem("products", JSON.stringify(products));

      // Cập nhật lại danh sách 
      const updatedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const newGenres = [...new Set(updatedProducts.map(p => p.type?.trim()).filter(Boolean))];
      localStorage.setItem("genres", JSON.stringify(newGenres));

      // updateGenresFromProducts();

      renderAdminBooks();
    });
  });

  //  Gắn sự kiện SỬA
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
      document.querySelector("#add-product-form button").textContent = "Cập nhật sản phẩm";
      showSection("add");
    });
  });
}

// xử lý phần thêm phần giới thiệu 
let editingIntroIndex = null;

document.getElementById("intro-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.querySelector("#intro-title").value.trim();
  const content = document.querySelector("#intro-content").value.trim();
  const imgInput = document.querySelector("#intro-image");
  const intros = JSON.parse(localStorage.getItem("introductions")) || [];

  // ✅ Trường hợp SỬA bài viết
  if (editingIntroIndex !== null) {
    const item = intros[editingIntroIndex];
    item.title = title;
    item.content = content;

    if (imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        item.image = reader.result;
        localStorage.setItem("introductions", JSON.stringify(intros));
        alert("✅ Cập nhật bài viết thành công!");
        document.getElementById("intro-form").reset();
        editingIntroIndex = null; // ✅ reset lại
        renderIntroList();
        showSection("manageIntro");
      };
      reader.readAsDataURL(imgInput.files[0]);
    } else {
      localStorage.setItem("introductions", JSON.stringify(intros));
      alert("✅ Cập nhật bài viết thành công!");
      document.getElementById("intro-form").reset();
      editingIntroIndex = null; // ✅ reset lại
      renderIntroList();
      showSection("manageIntro");
    }

    return; // ✅ dừng lại, không chạy tiếp phần thêm mới
  }

  // ✅ Trường hợp THÊM MỚI
  if (!title || !content || !imgInput.files[0]) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imgbase64 = reader.result;
    intros.push({
      title,
      content,
      image: imgbase64,
      createdAt: new Date().toLocaleDateString("vi-VN"),
      createdBy: "admin"
    });
    localStorage.setItem("introductions", JSON.stringify(intros));
    alert("✅ Đã thêm bài giới thiệu");
    document.getElementById("intro-form").reset();
    editingIntroIndex = null; // reset đảm bảo an toàn
    showSection("intro");
  };
  reader.readAsDataURL(imgInput.files[0]);
});



// xử lý phẩn quản lý phản hồi
function renderFeedback() {
  const feedbackList = document.getElementById('feedback-list');
  const feedbacks = JSON.parse(localStorage.getItem("contactmessange")) || [];

  if (feedbacks.length === 0) {
    feedbackList.innerHTML = "<p>không có phản hồi </p>"
    return;
  }
  
  feedbackList.innerHTML = feedbacks.map((fb, index) => `
    <div class="feedback-item" style="border:1px solid #ccc; padding:10px; margin-bottom:10px; border-radius:8px;">
        <p>👤 ${fb.name}</p> - <p>📧 ${fb.email}</p>
        <p>🕒 ${fb.time}</p>
        <P>💬 ${fb.write}</P>
        <button class="delete-feedback" data-index="${index}" style="margin-top: 5px;">❌ Xóa phản hồi</button>
    </div>
  `).join("");
  document.querySelectorAll(".delete-feedback").forEach(btn => {
  btn.addEventListener('click', function() {
    const index = +this.getAttribute("data-index")
    if (!confirm("bạn có chắc muốn xóa phả hồi này không")) return;

    const feedbacks = JSON.parse(localStorage.getItem("contactmessange")) || [];
    feedbacks.splice(index, 1);
    localStorage.setItem("contactmessange", JSON.stringify(feedbacks));
    alert('Đã xóa phản hồi');
    renderFeedback();
  });
});

};



// 
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


function renderIntroList() {
  const introList = document.getElementById("intro-list");
  const intros = JSON.parse(localStorage.getItem("introductions")) || [];

  if (intros.length === 0) {
    introList.innerHTML = "<p>Không có bài giới thiệu nào.</p>";
    return;
  }

  introList.innerHTML = "";

  intros.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "admin-intro-item";
    div.style = "border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 6px;";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Ngày tạo:</strong> ${item.createdAt || "Không rõ"} | <strong>Người tạo:</strong> ${item.createdBy || "admin"}</p>
      <p>${item.content}</p>
      <button class="edit-intro-btn" data-index="${index}">✏️ Sửa</button>
      <button class="delete-intro-btn" data-index="${index}">🗑️ Xóa</button>
    `;
    introList.appendChild(div);
  });

  // Xử lý xóa bài
  document.querySelectorAll(".delete-intro-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = +this.getAttribute("data-index");
      if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
      const intros = JSON.parse(localStorage.getItem("introductions")) || [];
      intros.splice(index, 1);
      localStorage.setItem("introductions", JSON.stringify(intros));
      renderIntroList();
    });
  });

  // Xử lý sửa bài
  document.querySelectorAll(".edit-intro-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = +this.getAttribute("data-index");
      const intros = JSON.parse(localStorage.getItem("introductions")) || [];
      const item = intros[index];

      document.getElementById("intro-title").value = item.title;
      document.getElementById("intro-content").value = item.content;
      document.getElementById("intro-image").value = ""; // reset input ảnh

      editingIntroIndex = index;
      showSection("intro");
    });
  });
}
