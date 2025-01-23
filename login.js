const nameInput = document.getElementById('name');
const passInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');

nameInput.addEventListener('input', function() {
    if (nameInput.value.trim() !== '') {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
});

registerBtn.addEventListener('click', function() {
    if (nameInput.value.trim() !== '') {
        window.location.href = 'MainPage.html';
    }
});