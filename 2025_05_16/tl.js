var a = parseInt(prompt('Nhập số nguyên a: '));

        if(a==2){
            document.write('Hôm nay là thứ hai');
        }else if(a==3){
            document.write('Hôm nay là thứ ba');
        }else if(a==4){
            document.write('Hôm nay là thứ tư');
        }else if(a==5){
            document.write('Hôm nay là thứ năm');
        }else if(a==6){
            document.write('Hôm nay là thứ sáu');
        }else if(a==7){
            document.write('Hôm nay là thứ bảy');
        }else if(a==8){
            document.write('Hôm nay là chủ nhật');
        }else{
            document.write('Không hợp lệ');
        }



var a = parseInt(prompt('nhập số nguyên a: '));
switch (a) {
    case 0:
        document.write('không');
        break;
    case 1:
        document.write('Một');
        break;
    case 2:
        document.write('Hai');
        break;
    case 3:
        document.write('Ba');
        break;
    case 4:
        document.write('Bốn');
        break;
    case 5:
        document.write('Năm');
        break;
    default:
        document.write('Không thỏa mãn');
        break;
}

var i = 1;
for (i; i <= 10; i++) {
    document.write('Barca vô địch')
}
var a = 1
while (a<10) {
    document.write('barca vô địch')
    a++
}

var b = 1
do {
    document.while ('real nguuuu') 
    b++
}while (b<=10)


let sum1 = 0
let sum2 = 0
let sum3 = 0

for (var i = 0; i <= 100; i++) {
    sum1+=i
    
}
document.write('tổng :', sum1 ) 

var j = 1;
while (j<=10) {
    sum2+=j
    j++
}
document.write(sum2)


function xin_chao(name)
{
 document.write('Hi' + name);
}
xin_chao('Bao');
xin_chao('MinhChim');
 
function sum(a, b) {
    return a+b
}
sum(1,2)

