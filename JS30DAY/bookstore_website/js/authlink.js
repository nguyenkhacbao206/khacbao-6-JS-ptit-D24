const loggedInUsername = localStorage.getItem("loggedInUser");
const users = JSON.parse(localStorage.getItem("users")) || {};

const greentingSection = document.getElementById("greentingSection");
const userFullname = document.getElementById("userFullName");
const authLinks = document.getElementById("authLinks");
const logoutBtn = document.getElementById("logoutbtn");

if (loggedInUsername && users[loggedInUsername]) {
    const fullName = users[loggedInUsername].fullName || "";
    const nameParts = fullName.trim().split(" ");
    const shortName = nameParts[nameParts.length-1];


    userFullname.textContent = shortName;
    greentingSection.style.display = "inline";
    authLinks.style.display = "none";
};

// xử lý đăng xuất 

logoutBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    // ẩn phầ xin chào và đăng xuất
     greentingSection.style.display = "none";

    // Hiện lại phần Đăng ký / Đăng nhập
    authLinks.style.display = "inline";
    // location.reload();
});