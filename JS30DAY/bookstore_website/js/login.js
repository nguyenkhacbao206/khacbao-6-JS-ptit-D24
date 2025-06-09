// Đăng ký người dùng
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    document.getElementById("message").textContent = "Tên đăng nhập đã tồn tại!";
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("message").textContent = "Đăng ký thành công!";
    document.getElementById("registerForm").reset();
  }
});

// Đăng nhập người dùng
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username] === password) {
    document.getElementById("message").textContent = "Đăng nhập thành công!";
  } else {
    document.getElementById("message").textContent = "Sai tên đăng nhập hoặc mật khẩu!";
  }
});
