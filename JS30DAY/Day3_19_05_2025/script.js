document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const signUpBtn = document.querySelector('.img-btn .m-up'); // Nút "Sign Up" trong img-btn
    const signInBtn = document.querySelector('.img-btn .m-in');  // Nút "Sign In" trong img-btn

    // Lắng nghe sự kiện click cho nút "Sign Up"
    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            container.classList.add('s-signup'); // Thêm class để kích hoạt trạng thái đăng ký
        });
    }

    // Lắng nghe sự kiện click cho nút "Sign In"
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            container.classList.remove('s-signup'); // Xóa class để quay lại trạng thái đăng nhập
        });
    }

});