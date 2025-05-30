// function themsinhvien() {
//     let masv = document.getElementById('msv').value
//     let hoten = document.getElementById('hoten').value
//     let email = document.getElementById('email').value
//     let sdt = document.getElementById('sdt').value

//     let newtable = document.createElement('tr')

//     newtable.innerHTML = `
//     <td>${masv}</td>
//     <td>${hoten}</td>
//     <td>${email}</td>
//     <td>${sdt}</td>`

//     document.getElementById('bangsinhvien').appendChild(newtable)

//     document.getElementById('msv').value = ""
//     document.getElementById('hoten').value = ""
//     document.getElementById('email').value = ""
//     document.getElementById('sdt').value = ""

// }






const studentForm = document.getElementById('studentForm')
const sudentList = document.getElementById('studentList')
const submitBtn = document.getElementById('submitBtn')


let editIndex = -1;
let students = [];

function renderstudents() {
    sudentList.innerHTML = students.map((sv, index) => `
    <tr>
       <td>${sv.masv}</td>
       <td>${sv.hoten}</td>
       <td>${sv.email}</td>
       <td>${sv.sdt}</td>
       <td><button class='btn-edit' onclick="editStudent(${index})">Sửa</button></td>
    </tr>
    `).join("")
}


function resetForm() {
    studentForm.reset()
    submitBtn.textContent = "Thêm"
    editIndex = -1
}

studentForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const newStudents = {
        masv: document.getElementById('msv').value,
        hoten: document.getElementById('hoten').value,
        email: document.getElementById('email').value,
        sdt: document.getElementById('sdt').value
    }

    if (editIndex === -1 ) {
        students.push(newStudents)
    }else {
        students[editIndex] = newStudents
    }

    renderstudents()
    resetForm()
})

window.editStudent = function(index) {
    const sv = students[index]
    document.getElementById('msv').value = sv.masv 
    document.getElementById('hoten').value = sv.hoten
    document.getElementById('email').value = sv.email
    document.getElementById('sdt').value = sv.sdt

    editIndex = index
    submitBtn.textContent = "Lưu"

}

