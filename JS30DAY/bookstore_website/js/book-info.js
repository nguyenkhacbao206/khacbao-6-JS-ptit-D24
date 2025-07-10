document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const intros = JSON.parse(localStorage.getItem("introductions")) || [];

  // Kiểm tra id hợp lệ và tồn tại trong mảng
  if (isNaN(id) || id < 0 || id >= intros.length) {
    document.body.innerHTML = "<p style='text-align: center;'>Không tìm thấy bài viết</p>";
    return;
  }

  const item = intros[id];

  document.getElementById("book-image").src = item.image || "";
  document.getElementById("book-title").textContent = item.title || "Không có tiêu đề";
  document.getElementById("book-author").textContent = "Người đăng: " + (item.createdBy || "Admin");
  document.getElementById("book-price").textContent = "Ngày đăng: " + (item.createdAt || "Không rõ");
  document.getElementById("book-rating").textContent = ""; // không cần đánh giá nếu là bài viết
  document.getElementById("book-description").textContent = item.content || "Không có nội dung.";
});
    