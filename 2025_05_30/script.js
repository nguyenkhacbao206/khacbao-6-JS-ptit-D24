// student = {id:"B24DCCC034",name:"Nguyen Khac Bao",salary:500000000000}  
//     document.write("Mã SV" + student.id+"<br>"+ 'Họ tên: ' +student.name+"<br>"+"Luong: " + student.salary + '<br>');  

//   var student=new Object();  
//     student.id="b24dccc034";  
//     student.name="nguyen khac bao";  
//     student.salary=4000;  
//     document.write("Mã SV" + student.id+"<br>"+ 'Họ tên: ' +student.name+"<br>"+"Luong: " + student.salary);  


// function student(id , ten, luong){  
//     this.id = id;  
//     this.name = ten;  
//     this.salary = luong;  
// }  

// nam = new student("B24DCCC034", "Nguyễn Khắc Bảo", 20000000);  

// document.write("Mã SV: " + nam.id + "<br>" + "Họ tên: " + nam.name + "<br>" + "Lương: " + nam.salary);


// class Person{
//             name;
//             age;
//             salary;
//             hello(){
//                 document.write("Hello "+ this.name);
//              }

//              changeSalary(newSalary){
//                 this.salary = newSalary;
//              }

//         }

//         a = new Person();
//         a.name = "Nguyễn khắc bảo";
//         a.hello();
//         a.salary = 1;
//         document.write( "Họ tên: " + a.name + "<br>" + "Lương: " + a.salary);
//         a.changeSalary(12);
//         document.write( "Họ tên: " + a.name + "<br>" + "Lương: " + a.salary);



class Person{
            name;
            age;
            salary;

            constructor(name, age, salary) {
                this.name = name;
                this.age = age;
                this.salary = salary
            }

            hello(){
                document.write("Hello "+ this.name);
            }

}

        kbao = new Person();
        kbao.name = "Nguyễn khắc bảo";
        kbao.hello();
        


