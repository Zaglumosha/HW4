function isPasswordsMatchUp(password,passrepeat){     
    if (password === passrepeat){ 
        return true; 
    } 
        showError('Пароли не совпадают','passrepeat'); 
        return false;  
} 

function isEmailEmpty(email) { 
    if (!!email.length){ 
        return true; 
    } 
        showError('Поле не заполнено','email'); 
        return false; 
} 
 
function isValidateEmail(email) { 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){ 
        return true; 
    } 
        showError('Неправильная форма записи', 'email') 
        return false; 
} 
 
 
function isFioEmpty(fio){ 
    if(!!fio){ 
        return true; 
    } 
        showError('Поле не заполнено','fio') 
        return false; 
} 
 
function isFioMaxLength(fio){ 
    if(fio.length < 150){ 
        return true; 
    } 
        showError('Превышено max количество символов', 'fio'); 
        return false; 
} 
 
function isPasswordEmpty(password){ 
    if(!!password.length){ 
        return true; 
    } 
        showError('Поле не заполнено', 'password') 
        return false; 
} 
 
function isValidatePassword(password){ 
    if (password.search(/\d/) !== -1 || /[!@#$%^&*]/.test(password)){ 
        return true; 
    } 
        showError('В пароле должна быть хотя бы одна цифра или спецсимвол','password'); 
        return false; 
} 
 
function isPasswordLength(password){ 
    if (password.length > 8 && password.length < 30){ 
        return true; 
    } 
        showError('Неверная длина пароля','password'); 
        return false; 
} 
 
function isPassrepeatEmpty(passrepeat){ 
    if (!!passrepeat){ 
        return true; 
    } 
        showError('Поле не заполнено','passrepeat'); 
        return false; 
} 

function isChecked(value){ 
    if (value){ 
        return true; 
    } 
        showError('Вы обязаны подтвердить, что хотите зарегистрироваться','check'); 
        return false; 
} 
 
function showError(message, fieldName) { 
    const fieldError = document.getElementById(`${fieldName}_error`); 
    const field = document.getElementById(fieldName); 
    if (message) { 
        field.style.backgroundColor = 'rgba(255, 239, 239, 1)'; 
    } else { 
        field.style.backgroundColor = 'white'; 
    } 
    fieldError.innerText = message; 
}

document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById('email');
    const form = document.getElementById('form');
    const fio = document.getElementById('fio');
    const passrepeat = document.getElementById('passrepeat');
    const password = document.getElementById('password');
    const checkbox = document.getElementById('check');
    const button = document.getElementById('button-sub');

    function isUserExist() {
        const content = document.getElementById('content');
        content.outerHTML = '<div class="succeed">Вы успешно создали аккаунт</div>';
    }

    if (localStorage.getItem('user')) {
        isUserExist();
    } else {
        button.addEventListener("click", (e) =>{
            e.preventDefault();
            showError('', 'email');
            showError('', 'fio');
            showError('', 'password');
            showError('','passrepeat');
            showError('','check');

            const results=[isEmailEmpty(email.value.trim()), 
                isValidateEmail(email.value.trim()),
                isFioEmpty(fio.value.trim()),
                isFioMaxLength(fio.value.trim()),
                isPasswordEmpty(password.value.trim()), 
                isPasswordLength(password.value.trim()), 
                isValidatePassword(password.value.trim()),
                isPassrepeatEmpty(passrepeat.value.trim()),
                isPasswordsMatchUp(password.value.trim(), passrepeat.value.trim()), 
                isChecked(checkbox.checked)];
            
            if (results.every(r=>r)) {
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


