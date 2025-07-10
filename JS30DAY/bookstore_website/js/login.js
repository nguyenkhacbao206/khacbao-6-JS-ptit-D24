

// Đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const messageEl = document.getElementById("message");

  // Lấy danh sách người dùng
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    const user = users[username];
    messageEl.textContent = `Đăng nhập thành công! Xin chào, ${user.fullName}`;
    messageEl.style.color = "green"
    
    // Ghi nhớ người dùng đang đăng nhập
    localStorage.setItem("loggedInUser", username);
    
    // trở lại mà hình khi đăng nhâp thaanhf công
    setTimeout(() => window.location.href = "/html/index.html", 1000); 
  } else {
    messageEl.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
    messageEl.style.color = "red"
  }
});


// xử lý đăng nhập trang admin


// Gán tài khoản admin cố định (không dùng chung localStorage với người dùng)
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputUsername = document.getElementById("loginUsername").value.trim();
  const inputPassword = document.getElementById("loginPassword").value;
  const message = document.getElementById("message");

  if (inputUsername === "admin" && inputPassword === "123456") {
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.removeItem("userLoggedIn"); // Xóa nếu trước đó có user đăng nhập
    message.textContent = "Đăng nhập admin thành công!";
    message.style.color = "green";
    setTimeout(() => window.location.href = "/html/admin.html", 1000);
    return;
  }

  // 👤 Người dùng thường
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[inputUsername] && users[inputUsername].password === inputPassword) {
    localStorage.setItem("userLoggedIn", inputUsername);
    localStorage.removeItem("adminLoggedIn"); // Xóa nếu trước đó có admin
    message.textContent = `Đăng nhập thành công! Xin chào ${users[inputUsername].fullName}`;
    message.style.color = "green";
    setTimeout(() => window.location.href = "/html/index.html", 1000);
  } else {
    message.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
    message.style.color = "red";
  }
});


