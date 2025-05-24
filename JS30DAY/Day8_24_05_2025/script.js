const divbutton = document.querySelectorAll("button")
const divinput = document.querySelector("p")

let inp = ""
let ketqua = ""

divbutton.forEach(item => {
    item.addEventListener("click", () => {
        if (item.dataset.value == "AC") {
            inp = ""
            divinput.innerHTML = inp
        }else if (item.dataset.value == "=") {
            try {
                ketqua = eval(inp)
                inp = ketqua
                divinput.innerHTML = inp
            }
            catch {
                divinput.innerHTML = "Lỗi"
                inp = ""
            }
        }else {
            inp += item.dataset.value
            divinput.innerHTML = inp
        }    
        
    })
})