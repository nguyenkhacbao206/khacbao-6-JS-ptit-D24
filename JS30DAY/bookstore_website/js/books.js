// làm active cho phần nav ở header
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

// Hiển thị sách và xử lý tìm kiếm + lọc thể loại + gợi ý khi gõ
document.addEventListener("DOMContentLoaded", function () {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("books-dynamic");
  const pagination = document.querySelector(".pagination-list ul");
  const searchInput = document.getElementById("search-input");
  const genreSelect = document.getElementById("genre-select");
  const suggestionBox = document.getElementById("search-suggestions");
  const itemsPerPage = 5;

  let currentPage = 1;
  let filteredProducts = [...products];

  function renderProducts(list, page) {
    container.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = list.slice(start, end);

    pageItems.forEach((product, index) => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "books-list-1";

      const fullStars = Math.floor(product.rating);
      const halfStar = product.rating % 1 >= 0.5;
      let starHtml = "";
      for (let i = 0; i < fullStars; i++) starHtml += '<i class="fa-solid fa-star"></i>';
      if (halfStar) starHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starHtml += '<i class="fa-regular fa-star"></i>';

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

  function renderPagination(list) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(list.length / itemsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${i}</a>`;
      if (i === currentPage) li.classList.add("active");
      li.addEventListener("click", () => {
        currentPage = i;
        renderProducts(filteredProducts, currentPage);
        renderPagination(filteredProducts);
      });
      pagination.appendChild(li);
    }
  }

  function applyFilters() {
    const keyword = searchInput.value.toLowerCase();
    const genre = genreSelect.value;

    filteredProducts = products.filter(product => {
      const matchesKeyword = product.name.toLowerCase().includes(keyword) ||
                             (product.author && product.author.toLowerCase().includes(keyword));
      const matchesGenre = genre ? product.type === genre : true;
      return matchesKeyword && matchesGenre;
    });

    currentPage = 1;
    renderProducts(filteredProducts, currentPage);
    renderPagination(filteredProducts);
  }

  searchInput.addEventListener("input", () => {
    genreSelect.value = "";
    applyFilters();

    const keyword = searchInput.value.toLowerCase().trim();
    if (!keyword) {
      suggestionBox.innerHTML = "";
      suggestionBox.style.display = "none";
      return;
    }

    const suggestions = products
      .filter(p => p.name.toLowerCase().includes(keyword))
      .slice(0, 5);

    if (suggestions.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    suggestionBox.innerHTML = suggestions.map(p => `<div>${p.name}</div>`).join("");
    suggestionBox.style.display = "block";

    suggestionBox.querySelectorAll("div").forEach(item => {
      item.addEventListener("click", () => {
        searchInput.value = item.textContent;
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
        applyFilters();
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#search-input") && !e.target.closest("#search-suggestions")) {
      suggestionBox.style.display = "none";
    }
  });

  genreSelect.addEventListener("change", () => {
    searchInput.value = "";
    applyFilters();
  });

  renderProducts(filteredProducts, currentPage);
  renderPagination(filteredProducts);
});
