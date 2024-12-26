import { userDetails,getUser} from "../data/userDetails.js";
console.log(userDetails);


export let userInfo;

function showCreateAccount() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('create-account-form').classList.remove('hidden');
}
document.querySelector('.js-show-create-account').addEventListener('click', showCreateAccount);


function showLogin() {
    document.getElementById('create-account-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}
document.querySelector('.js-show-login').addEventListener('click', showLogin);


function validatePasswords() {
    const password = document.querySelector('#password').value;
    const passwordAgain = document.querySelector('.password-again');
    const errorMessage = document.getElementById('password-error');

    if (password !== passwordAgain.value) {
        passwordAgain.classList.add('error');
        errorMessage.textContent = "Passwords should match.";
        return false;
    } else {
        passwordAgain.classList.remove('error');
        errorMessage.textContent = "";
        return true;
    }
}
document.querySelector('.password-again').addEventListener('input', validatePasswords);


function saveToStorage() {
    localStorage.setItem('user-details', JSON.stringify(userDetails));
}


function createAccount() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

  
    const existingUser = userDetails.find(user => user.email === email);

    if (existingUser) {
        alert("Account already registered. Please log in.");
        showLogin();
        return;
    }

    if (!validatePasswords()) return;

    if (name && email && password) {
        userDetails.push({ 
            name,
            email, 
            password 
        });
        saveToStorage();
        alert("Account created successfully! Please log in.");
        showLogin();
    } else {
        alert("Please fill out all fields.");
    }
}

document.querySelector('.js-create-account').addEventListener('click', createAccount);


function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if(email ==='' || password ===''){
        alert('Please fill out all fields.')
    }else{
        userInfo = getUser(email);

    if (userInfo) {
        if (userInfo.password === password) {

            localStorage.setItem('logged-in-user', JSON.stringify(userInfo));
            window.location.href = "https://yaseenijaz.github.io/Amazon-Project/home.html";
            
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else{
        alert("User data not found. Sign in if you're a new customer.");
    }
}}

document.querySelector('.js-login').addEventListener('click', login);



