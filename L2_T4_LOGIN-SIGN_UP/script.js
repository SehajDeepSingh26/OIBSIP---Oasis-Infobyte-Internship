let tempUserForPasswordReset = null;

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        showLoginForm();
    } else {
        alert('Please fill in both fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('welcomeusername').innerText = username;
        showWelcomePage();
    } else {
        alert('Invalid username or password.');
    }
}

function initiatePasswordReset() {
    const username = document.getElementById('forgot-password-username').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);

    if (user) {
        tempUserForPasswordReset = user;
        showResetPasswordForm();
    } else {
        alert('Username not found.');
    }
}

function resetPassword() {
    initiatePasswordReset();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(user => 
            user.username === tempUserForPasswordReset.username ? { ...user, password: newPassword } : user
        );
        localStorage.setItem('users', JSON.stringify(users));
        alert('Password reset successful!');
        tempUserForPasswordReset = null;
        showLoginForm();
    } else {
        alert('Passwords do not match or are empty.');
    }
}

function logout() {
    showInitialPage();
}

function showRegisterForm() {
    document.getElementById('register-container').classList.remove('hidden');
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('initial-container').classList.add('hidden');
    document.getElementById('forgot-container').classList.add('hidden');
    document.getElementById('welcome-container').classList.add('hidden');
}

function showLoginForm() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('initial-container').classList.add('hidden');
    document.getElementById('forgot-container').classList.add('hidden');
    document.getElementById('welcome-container').classList.add('hidden');
}

function showInitialPage() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('initial-container').classList.remove('hidden');
    document.getElementById('forgot-container').classList.add('hidden');
    document.getElementById('welcome-container').classList.add('hidden');
}

function showResetPasswordForm() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('initial-container').classList.add('hidden');
    document.getElementById('forgot-container').classList.remove('hidden');
    document.getElementById('welcome-container').classList.add('hidden');
}

function showWelcomePage() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('initial-container').classList.add('hidden');
    document.getElementById('forgot-container').classList.add('hidden');
    document.getElementById('welcome-container').classList.remove('hidden');
}

showInitialPage();
