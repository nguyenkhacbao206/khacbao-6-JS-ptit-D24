document.addEventListener("DOMContentLoaded", function () {
  const currentFile = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href").split("/").pop() === currentFile) {
      link.classList.add("active");
    }
  });
});

// Hiển thị sách và xử lý tìm kiếm + lọc thể loại + gợi ý khi gõ
document.addEventListener("DOMContentLoaded", function () {
  const genreSelect = document.getElementById("genre-select");
  const genres = JSON.parse(localStorage.getItem("genres")) || [];

    // Xóa các option cũ (trừ option đầu tiên)
  while (genreSelect.options.length > 1) {
        genreSelect.remove(1);
  }

    // Thêm các thể loại từ localStorage
  genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
  });


  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("books-dynamic");
  const pagination = document.querySelector(".pagination-list ul");
  const searchInput = document.getElementById("search-input");
  // const genreSelect = document.getElementById("genre-select");
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
          <p class="text-type">Thể loại: ${product.type || "Không rõ"}</p>
          
          <div class="text-btn">
            <button class="book-btn">Add To Cart</button>
            <ul>
              <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-up-down-left-right"></i></a></li>
              <li><a href="../html/book-detail.html?id=${start + index}"><i class="fa-regular fa-eye"></i></a></li>
            </ul>
          </div>
        </div>
      `;
      container.appendChild(bookDiv);
    });
  }

  // làm ra các trang
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
        setTimeout(() => {
          const scrollTarget = document.querySelector(".main-container");
          if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }
        }, 0);
      });
      pagination.appendChild(li);
    }
  }

  function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const minPrice = parseFloat(document.getElementById("price-min")?.value) || 0;
  const maxPrice = parseFloat(document.getElementById("price-max")?.value) || Infinity;
  const minRating = parseFloat(document.getElementById("rating-filter")?.value) || 0;

  filteredProducts = products.filter(product => {
  const price = Number(product.price);
  const rating = Number(product.rating);

  const matchesKeyword = product.name.toLowerCase().includes(keyword) ||
                         (product.author && product.author.toLowerCase().includes(keyword));

  const matchesGenre = genre ? product.type === genre : true;
  const matchesPrice = !isNaN(price) && price >= minPrice && price <= maxPrice;
  const matchesRating = !isNaN(rating) && (minRating === 0 || Math.floor(rating) === minRating);

  return matchesKeyword && matchesGenre && matchesPrice && matchesRating;
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

   // Gắn sự kiện lọc theo giá và sao
  const filterBtn = document.getElementById("apply-filter");
  if (filterBtn) {
    filterBtn.addEventListener("click", applyFilters);
  }
});


// xử lý thêm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
  // Bắt tất cả nút Add To Cart 
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("book-btn") || e.target.closest(".book-btn")) {
      const button = e.target.closest(".book-btn");

      // Lấy người dùng
      const username = localStorage.getItem("loggedInUser");
      if (!username) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        window.location.href = "/html/login.html";
        return;
      }

      // Tìm phần tử cha chứa thông tin sách
      const bookItem = button.closest(".books-list-1");
      if (!bookItem) return;

      const name = bookItem.querySelector(".text-title")?.textContent.trim();
      const priceText = bookItem.querySelector(".text-price")?.textContent.trim();
      const price = parseFloat(priceText.replace("đ", "").replace(/\./g, "").trim());

      const imgEl = bookItem.querySelector(".cover-img img");
      const imageUrl = imgEl?.getAttribute("src") || "";

      // Giỏ hàng riêng cho từng user
      const cartKey = `cart_${username}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const existingIndex = cart.findIndex(item => item.name === name);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({ name, price, quantity: 1, imageUrl });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert(`Đã thêm "${name}" vào giỏ hàng!`);
      if (typeof updateCartCount === "function") updateCartCount();
    }
  });
});

// xử lý phần yêu thích
document.addEventListener("click", function (e) {
  const heartContainer = e.target.closest("li");
  if (heartContainer && heartContainer.querySelector(".fa-heart")) {
    e.preventDefault();

    const heartIcon = heartContainer.querySelector(".fa-heart");
    heartIcon.classList.toggle("fa-solid");
    heartIcon.classList.toggle("fa-regular");
    heartIcon.classList.toggle("liked");
  }
});


