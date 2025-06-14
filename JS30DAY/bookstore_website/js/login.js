

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
    setTimeout(() => window.location.href = "http://127.0.0.1:5501/html/index.html", 1000); 
  } else {
    messageEl.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
    messageEl.style.color = "red"
  }
});

