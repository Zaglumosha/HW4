function compare(){    
    var first_pass = document.getElementById('password');  
    var second_pass = document.getElementById('passrepeat');
    if (first_pass.value === second_pass.value){
        return true;
    }
}

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())){
        return true;
    }
    return false;
}

function showError(message, fieldName) {
    const fieldError = document.getElementById(`${fieldName}_error`);
    const field = document.getElementById(fieldName);
    if (message) {
        field.style.backgroundColor = 'red';
    } else {
        field.style.backgroundColor = 'white';
    }
    fieldError.innerText = message;
}

document.addEventListener('DOMContentLoaded', function() {
    let isValid = true;
    const email = document.getElementById('email');
    const form = document.getElementById('form');
    const fio = document.getElementById('fio');
    const passrepeat = document.getElementById('passrepeat');
    const password = document.getElementById('password');
    const checkbox = document.getElementById('check');

    function isUserExist() {
        const content = document.getElementById('content');
        content.outerHTML = '<div class="succeed">Вы успешно создали аккаунт</div>';
    }

    if (localStorage.getItem('user')) {
        isUserExist();
    } else {
        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            showError('', 'email');
            showError('', 'fio');
            showError('', 'password');
            showError('','passrepeat');
    
            if(email.value === ''){
                showError('Поле не заполнено','email');
                isValid = false;
            } else if(email.value == null){
                showError('Поле не заполнено','email');
                isValid = false;
            } else if(email.value !== '' && !validateEmail(email.value)){
                showError('Неправильная форма записи', 'email');
                isValid = false;
            }
    
            if(fio.value === ''){
                showError('Поле не заполнено','fio');
                isValid = false;
            } else if(fio.value == null){
                showError('Поле не заполнено','fio');
                isValid = false;
            } else if (fio.value.length>150){
                showError('Превышено max количество символов', 'fio');
                isValid = false;
            }
    
            if (password.value === ''){
                showError('Поле не заполнено', 'password');
                isValid = false;
            } else if (password.value == null){
                showError('Поле не заполнено','password');
                isValid = false;
            } else if (password.value.search(/\d/) === -1 && !/!@#$%^&*/.test(password.value)){
                showError('В пароле должна быть хотя бы одна цифра или спецсимвол','password');
                isValid = false;
            } else if (password.value.length < 8 || password.value.length > 30){
                showError('Неверная длина пароля','password');
                isValid = false;
            }
    
            if(passrepeat.value === '' ){
                showError('Поле не заполнено','passrepeat');
                isValid = false;
            } else if(passrepeat.value == null){
                showError('Поле не заполнено','passrepeat');
                isValid = false;
            } else if(passrepeat.value !== '' && !compare()){
                showError('Пароли не совпадают','passrepeat');
                isValid = false;
            }
    
            if (!checkbox.checked){
                showError('Вы обязаны подтвердить, что хотите зарегистрироваться','check');
                isValid = false;
            }
    
            if (isValid) {
                localStorage.setItem('user', JSON.stringify({
                    fio: fio.value,
                    password: password.value,
                    email: email.value,
                    agree: checkbox.checked,
                }));
                isUserExist();
            }
        })
    }

})


