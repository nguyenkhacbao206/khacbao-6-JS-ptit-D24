function searchProduct() {
    const searchValue = document.getElementById('searchInput').value;
    const rows = document.querySelectorAll('#productTable tbody tr');

    rows.forEach(row => {
        const product = row.querySelector('.product-code').textContent.trim();
        if (product ===searchValue || searchValue === "") {
            row.style.display = "";
        } else {
            row.style.display ="none"
        }
    });
};