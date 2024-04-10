document.addEventListener('DOMContentLoaded', function () {
    let signInForm = document.getElementById('form1');
    let signInUnameInput = document.querySelector('#username input');
    let signInPassInput = document.querySelector('#password input');
    let stayConnected = document.querySelector('#rememberMe');
    let redirect_to_list=document.querySelector('button_form button');
    
    let loginAttempts = JSON.parse(localStorage.getItem('loginAttempts')) || {};
    
    //unlock user after 5 seconds
    function unlockUser(username) {
        loginAttempts[username] = 0;
        localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
        alert('User unlocked after 5 seconds.');
    }
    //Verify if the password is correct
    function validateSignInInputs() {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        const enteredUsername = signInUnameInput.value;
        const enteredPassword = signInPassInput.value;
        //after 3 attemps, account blocked
        if (loginAttempts[enteredUsername] >= 2) {
            alert('Account blocked. Too many unsuccessful login attempts.');
            //after 5 seconds, unlock user
            setTimeout(function () {
                unlockUser(enteredUsername);
            }, 5000); // 5 seconds in milliseconds
            return false;
        }
       
        const user = users.find(u => u.name === enteredUsername);

        if (user) {
            //if a password is correct
            if (user.password === enteredPassword) {
                loginAttempts[enteredUsername] = 0;
                localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
                return true;
            } else {
                //if a password is false
                loginAttempts[enteredUsername] = (loginAttempts[enteredUsername] || 0) + 1;
                localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
                alert('Invalid username or password');
                return false;
            }
        } else {
            alert('Invalid username or password');
            return false;
        }
    }
    //update user on the local storage
    function updateLastSeen(name) {
        let users = JSON.parse(localStorage.getItem('users'));
        let user = users.filter(u => u.name === name);
    
        if (user){
            user.lastSeen = new Date();
            localStorage.setItem('users', JSON.stringify(users));
        }  
    }

    // Event listener for SignIn form submission
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (validateSignInInputs()) {
            localStorage.setItem('currentUser', signInUnameInput.value);

            updateLastSeen(signInUnameInput.value);

            if (stayConnected.checked) {
                setCookie(signInUnameInput.value); 
            }
            spaRouter.nav(e);
            /*
            // Redirect to the menu.html page
            var targetId = redirect_to_list.getAttribute('data-target');
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Scrolling jusqu'à l'élément cible
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Not found');
            }
           */
        }
    });
});