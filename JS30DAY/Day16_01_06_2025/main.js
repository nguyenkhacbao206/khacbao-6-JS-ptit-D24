class Product {
    constructor(id, name, price, quantity) {
        this.id= id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    gettotal() {
        return this.price*this.quantity;
    };
};

const products = [];

function rendertable() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = ""

    products.forEach((p, index) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
        <td>${p.gettotal().toLocaleString()}</td>
        <td>
            <button class="btn btn-edit" onclick="editProduct(${index})">Sửa</button>
            <button class="btn btn-delete" onclick="deleteProduct(${index})">Xóa</button>
        </td>`;
        tbody.appendChild(row);
        updatetext()
    })
}

function addproduct() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    if (products.find(p => p.id === id)) {
        alert("ID này đã tồn tại. Hãy nhập ID khác");
        return;
    }

    const newproduct = new Product(id, name, price, quantity)
    products.push(newproduct)
    clearproduct()
    rendertable()

}

function clearproduct() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function editProduct(index) {
    const p = products[index];
    document.getElementById('id').value = p.id;    
    document.getElementById('name').value = p.name;  
    document.getElementById('price').value = p.price;  
    document.getElementById('quantity').value = p.quantity;  

    deleteProduct(index)
    
};

function deleteProduct(index) {
    products.splice(index, 1)
    rendertable()
}

function updatetext() {
    let total = 0;
    let maxproduct = products[0];
    for (let p of products) {
        total += p.gettotal();
        if (p > maxproduct) {
            maxproduct = p;
        };
    }

    document.getElementById("totalvalue").innerHTML = `Tổng giá trị tồn kho: ${total.toLocaleString()}`
    document.getElementById("highesprice").innerHTML = `Sản phẩm đắt nhất: ${maxproduct.name} (${maxproduct.price.toLocaleString()})`
}