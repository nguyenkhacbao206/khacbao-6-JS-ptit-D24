// // làm active cho phần nav ở header
// //  lấy ra và lưu tên file HTML hiện tại đang truy cập
// document.addEventListener("DOMContentLoaded", function () {
//   const currentPath = window.location.pathname;
//   const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

//   menuLinks.forEach(link => {
//     if (link.getAttribute("href") === currentPath) {
//       link.classList.add("active");
//     }
//   });
// });


// // hiển thị sản phẩm từ admin
// document.addEventListener("DOMContentLoaded", function () {
//     const products = JSON.parse(localStorage.getItem("products")) || [];
//     const container = document.getElementById("books-dynamic");

//     if (!container || products.length === 0) return;

//     products.forEach((product, index) => {
//         const bookDiv = document.createElement("div");
//         bookDiv.className = "books-list-1";

//         const fullStars = Math.floor(product.rating);
//         const halfStar = product.rating % 1 >= 0.5;
//         let starHtml = "";

//         for (let i = 0; i < fullStars; i++) {
//             starHtml += '<i class="fa-solid fa-star"></i>';
//         }
//         if (halfStar) {
//             starHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
//         }
//         for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
//             starHtml += '<i class="fa-regular fa-star"></i>';
//         }

//         bookDiv.innerHTML = `
//             <div class="list-cover">
//                 <div class="cover-img">
//                 <img src="${product.image}" alt="book-${index}">
//                 </div>
//             </div>
//             <div class="list-text">
//                 <h2 class="text-title">${product.name}</h2>
//                 <p class="text-author">Tác giả: ${product.author}</p>
//                 <span class="text-price">${product.price.toLocaleString('vi-VN')} đ</span>
//                 <div class="text-star">${starHtml}</div>
//                 <p class="text-content">${product.description}</p>
//                 <div class="text-btn">
//                 <button class="book-btn">Add To Cart</button>
//                 <ul>
//                     <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
//                     <li><a href="#"><i class="fa-solid fa-up-down-left-right"></i></a></li>
//                     <li><a href="#"><i class="fa-regular fa-eye"></i></a></li>
//                 </ul>
//                 </div>
//             </div>
//         `;

//         container.appendChild(bookDiv);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Làm active menu
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");
  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Cài đặt phân trang
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("books-dynamic");
  const pagination = document.querySelector(".pagination-list ul");
  const itemsPerPage = 5;

  // Lấy trang hiện tại từ URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get("page")) || 1;

  // Hiển thị sản phẩm của 1 trang
  function renderProducts(page) {
    container.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach((product, index) => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "books-list-1";

      // Tạo sao
      const fullStars = Math.floor(product.rating);
      const halfStar = product.rating % 1 >= 0.5;
      let starHtml = "";
      for (let i = 0; i < fullStars; i++) starHtml += '<i class="fa-solid fa-star"></i>';
      if (halfStar) starHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starHtml += '<i class="fa-regular fa-star"></i>';

      // HTML sách
      bookDiv.innerHTML = `
        <div class="list-cover">
          <div class="cover-img">
            <img src="${product.image}" alt="book-${index}">
          </div>
        </div>
        <div class="list-text">
          <h2 class="text-title">${product.name}</h2>
          <p class="text-author">Tác giả: ${product.author}</p>
          <span class="text-price">${product.price.toLocaleString('vi-VN')} đ</span>
          <div class="text-star">${starHtml}</div>
          <p class="text-content">${product.description}</p>
          <div class="text-btn">
            <button class="book-btn">Add To Cart</button>
            <ul>
              <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-up-down-left-right"></i></a></li>
              <li><a href="#"><i class="fa-regular fa-eye"></i></a></li>
            </ul>
          </div>
        </div>
      `;
      container.appendChild(bookDiv);
    });
  }

  // Hiển thị phân trang
  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (currentPage > 1) {
      const prev = document.createElement("li");
      prev.innerHTML = `<a href="?page=${currentPage - 1}">Previous</a>`;
      pagination.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="?page=${i}">${i}</a>`;
      if (i === currentPage) li.classList.add("active");
      pagination.appendChild(li);
    }

    if (currentPage < totalPages) {
      const next = document.createElement("li");
      next.innerHTML = `<a href="?page=${currentPage + 1}">Next</a>`;
      pagination.appendChild(next);
    }
  }

  renderProducts(currentPage);
  renderPagination();
});
