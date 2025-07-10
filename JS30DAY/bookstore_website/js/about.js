document.addEventListener("DOMContentLoaded", function () {
  // --- ACTIVE NAV ---
  const currentFile = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll(".header-nav nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href").split("/").pop() === currentFile) {
      link.classList.add("active");
    }
  });

  // --- GỢI Ý TÌM KIẾM ---
  const searchInput = document.querySelector(".sidebar-search input[type='search']");
  const suggest = document.getElementById("suggestList");

  function filterPostsByKeyword(keyword) {
    const posts = document.querySelectorAll(".main-content > div");
    posts.forEach(post => {
      const titleElement = post.querySelector("h2");
      const contentElement = post.querySelector(".content-text p");
      const title = titleElement ? titleElement.textContent.toLowerCase() : "";
      const content = contentElement ? contentElement.textContent.toLowerCase() : "";

      if (title.includes(keyword) || content.includes(keyword)) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase().trim();
    suggest.innerHTML = "";

    if (keyword === "") {
      document.querySelectorAll(".main-content > div").forEach(post => post.style.display = "flex");
      suggest.style.display = "none";
      return;
    }

    const titles = Array.from(document.querySelectorAll(".main-content h2")).map(h2 => h2.textContent.trim());
    const matched = titles.filter(title => title.toLowerCase().includes(keyword));

    if (matched.length > 0) {
      matched.forEach(title => {
        const li = document.createElement("li");
        li.textContent = title;
        li.addEventListener('click', function () {
          searchInput.value = this.textContent;
          suggest.style.display = "none";
          filterPostsByKeyword(this.textContent.toLowerCase());
        });
        suggest.appendChild(li);
      });
      suggest.style.display = "block";
    } else {
      suggest.style.display = "none";
    }

    filterPostsByKeyword(keyword);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".sidebar-search")) {
      suggest.style.display = 'none';
    }
  });

  // phân trnang và hiển thị giới thiệu
  const container = document.querySelector(".main-content");
  const paginationList = document.querySelector(".pagination-list ul");
  const intros = (JSON.parse(localStorage.getItem("introductions")) || []); 

  const itemsPerPage = 3;
  let currentPage = 1;
  const totalPages = Math.ceil(intros.length / itemsPerPage);

  function renderRecentPostForPage(posts) {
  const recentContainer = document.querySelector(".recent-post .post");
  if (!recentContainer) return;
  recentContainer.innerHTML = "";

  posts.forEach((item, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add(`post-${index + 1}`);
    postDiv.innerHTML = `
      <div class="post-image">
        <div class="post-cover">
          <img src="${item.image}" width="110%" alt="post-${index}">
        </div>
      </div>
      <div class="post-date-text">
        <div class="post-date">
          <i class="fa-solid fa-calendar-days"></i>
          <p>${item.createdAt || "Không rõ"}</p>
        </div>
        <div class="post-text">
          <div class="text-p">
            <a href="../html/book-info.html?id=${item.index}">
              <p>${item.title.split(" ").slice(0, 5).join(" ")}...</p>
            </a>
          </div>
        </div>
      </div>
    `;
    recentContainer.appendChild(postDiv);
  });
}


  function renderPage(page) {
  container.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, intros.length);

  
  const pagePosts = intros.slice(startIndex, endIndex).map((item, i) => ({
    ...item,
    index: startIndex + i,
  }));

  pagePosts.forEach((item) => {
    const div = document.createElement("div");
    div.className = `content-item content-intro-${item.index}`;
    div.innerHTML = `
      <div class="content-cover">
        <div class="cover-image">
          <img src="${item.image}" width="100%" alt="intro-${item.index}">
        </div>
      </div>
      <div class="content-date">
        <div class="date">
          <i class="fa-solid fa-calendar-days"></i><span> ${item.createdAt || "Không rõ"} </span>
        </div>
        <div class="admin">
          <i class="fa-regular fa-user"></i><span> ${item.createdBy || "Admin"} </span>
        </div>
      </div>
      <div class="content-tittle">
        <h2>${item.title}</h2>
      </div>
      <div class="content-text">
        <p>${item.content}</p>
      </div>
      <div class="content-button">
        <button class="read-more-btn" data-id="${item.index}">Read More →</button>
      </div>
    `;
    container.appendChild(div);
  });

  
  renderRecentPostForPage(pagePosts);

 
  document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      window.location.href = `../html/book-info.html?id=${id}`;
    });
  });
}


  function renderPagination() {
    paginationList.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i;
      if (i === currentPage) a.classList.add("active");

      a.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = i;
        renderPage(currentPage);
        renderPagination();
      });

      li.appendChild(a);
      paginationList.appendChild(li);
    }
  }

  renderPage(currentPage);
  renderPagination();
});
