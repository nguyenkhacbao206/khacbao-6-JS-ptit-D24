function themsinhvien() {
    let masv = document.getElementById('msv').value
    let hoten = document.getElementById('hoten').value
    let email = document.getElementById('email').value
    let sdt = document.getElementById('sdt').value

    let newtable = document.createElement('tr')

    newtable.innerHTML = `
    <td>${masv}</td>
    <td>${hoten}</td>
    <td>${email}</td>
    <td>${sdt}</td>`

    document.getElementById('bangsinhvien').appendChild(newtable)

    document.getElementById('msv').value = ""
    document.getElementById('hoten').value = ""
    document.getElementById('email').value = ""
    document.getElementById('sdt').value = ""

}