document.addEventListener("DOMContentLoaded", function () {
    // Đăng ký
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const userName = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const messengEl = document.getElementById("message");

    // kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        messengEl.textContent = "Mật khẩu không khớp";
        return;
    };
    
    // kiểm tra số điện thoại hợp lệ
    if (phoneNumber.length < 9 || !/^\d+$/.test(phoneNumber)) {
        messengEl.textContent = "số điện thoại không hợp lệ";
        return;
    };

    // lấy giữ liệu người dùng hiện tại từ localstorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[userName]) {
        messengEl.textContent = "Tên đăng nhập đã tồn tại"
    } else {
        // thêm người dùng mới
        users[userName] = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            password: password
        }

        // lưu vào localsorage
        localStorage.setItem("users", JSON.stringify(users));

        messengEl.textContent = "Đăng ký thành công"
        document.getElementById("registerForm").reset();
    }
    
    
});
} )
