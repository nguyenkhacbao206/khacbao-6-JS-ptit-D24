document.addEventListener("DOMContentLoaded", function () {
  const currentFile = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href").split("/").pop() === currentFile) {
      link.classList.add("active");
    }
  });
});
// 

document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.querySelector(".search-name input");
  const emailInput = document.querySelector(".search-email input");
  const writeInput = document.querySelector(".content-write textarea");
  const btn = document.querySelector(".content-btn button");

  btn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const write = writeInput.value.trim()
    
    if (!name || !email || !write) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    };

    const feedback = {
      name,
      email,
      write,
      time: new Date().toDateString()
    };

    const feedbacks = JSON.parse(localStorage.getItem("contactmessange")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("contactmessange", JSON.stringify(feedbacks));
    

    alert("Xin cảm ơn bạn đã góp ý cho chúng tôi")

    nameInput.value = "";
    emailInput.value = "";
    writeInput.value = "";
  });


});