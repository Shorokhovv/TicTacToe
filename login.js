const globalUserName = document.getElementById('name');
const passInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');

globalUserName.addEventListener('input', function() {
    if (globalUserName.value.trim() !== '') {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
});

registerBtn.addEventListener('click', function() {
    if (globalUserName.value.trim() !== '') {
        window.location.href = 'MainPage.html';

    }
});