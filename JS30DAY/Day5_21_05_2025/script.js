const divbutton=document.querySelectorAll("button");
const divinput=document.querySelector("p");



let html="";
let ketQua="";
divbutton.forEach(item=>{
    item.addEventListener("click",()=>{
        if (item.dataset.value=="AC"){
            html="";
            divinput.innerHTML=html;           
        }else if(item.dataset.value=="="){
            try {
                ketQua=eval(html);
                html = ketQua.toString();
                divinput.innerHTML=html;                  
            } catch {
                divinput.innerHTML="lỗi";                  
                html="";
            }
       
        }else{
            html+=item.dataset.value;
            divinput.innerHTML=html;      
        }
    })
});