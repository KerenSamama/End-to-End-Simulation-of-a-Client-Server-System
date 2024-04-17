document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById('form2')
    //let unameInput = document.querySelector('#uname input');
    //let phoneInput = document.querySelector('#phone input');
    //let passInput = document.querySelector('#pass input');
    //let c_passInput = document.querySelector('#c_pass input');
    //let stayConnected = document.querySelector('#rememberMe');
    let redirect_to_logIn=document.getElementById('button_form_id2');
    
    function store(){ // sign up function
        
        
        let unameInput = document.querySelector('#uname input');
        //var email=document.getElementById('email');
        let passInput = document.querySelector('#pass input');
        let c_passInput = document.querySelector('#c_pass input');
        let phoneInput = document.querySelector('#phone input');
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
    
    
        if(unameInput.value.length == 0){
            alert('Please fill in name');
        
        if(phoneInput.value.length<8 && !phoneInput.value.match(numbers))
            alert('Please the phone number must contain 8 digits')
    
        }else if(passInput.value.length == 0){
            alert('Please fill in password');
    
        }else if(unameInput.value.length == 0 && passInput.value.length == 0){
            alert('Please fill in name and password');
    
        }else if(!passInput.value.match(numbers)){
            alert('please add 1 number');
    
        }else if(!passInput.value.match(upperCaseLetters)){
            alert('please add 1 uppercase letter');
    
        }else if(!passInput.value.match(lowerCaseLetters)){
            alert('please add 1 lovercase letter');
    
        }else if(passInput.value!=c_passInput.value){
            alert('passwords do not match');
        }else{
           
            var new_user ={
                type:"user",
                name:unameInput.value,
                password:passInput.value,
                phone:phoneInput.value
            }
            
            //convert to JSON
            var new_user_json=JSON.stringify(new_user);
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("POST","./FakeURL",true);  
            fxhttp.send(new_user_json);
            alert('Your account has been created');
    
        }
    }


  
    // Event listener for input on username field
    unameInput.addEventListener('input', function () {
        valid_input(this, /[^a-zA-Z0-9]+/);
    });

    // Event listener for input on phone field
    phoneInput.addEventListener('input', function () {
        valid_input(this, /[^0-9]+/);
    });

    // Event listener for input on password field
    passInput.addEventListener('input', function () {
        valid_input(this, /\s+/);
    });

    // Event listener for input on confirm password field
    c_passInput.addEventListener('input', function () {
        let pass = passInput.value;
        let conf = c_passInput.value;

        // Check if passwords match and update border accordingly
        if (pass.length <= conf.length)
            if (pass !== conf) {
                c_passInput.style.border = '2px solid red';
            } else {
                c_passInput.style.border = '2px solid rgba(255, 255, 255, .2)';
            }
        else
            c_passInput.style.border = '2px solid rgba(255, 255, 255, .2)';
    });

    // Function to validate input based on regex
    function valid_input(inputElement, regex) {
        let inputValue = inputElement.value;
        if (regex.test(inputValue)) {
            inputElement.value = inputValue.slice(0, -1);
            console.log(inputValue + 'rejected');
        }
    }

    // // check if user already exists
    // function userExists() {
    //     //CE QUE JAI CHANGER:
    //     xhr=getFxhr();
    //     xhr.onreadystatechange=function(){
    //         if(xhr.readyState==4 && xhr.status==200){

    //         }
    //     }
    //     xhr.open('GET',"URL",true);
    //     xhr.send();
        

    //     // const users = JSON.parse(localStorage.getItem('users'));
    //     // for (let i = 0; i < users.length; i++)
    //     //     if (users[i].name === unameInput.value)
    //     //         return true;
    //     // return false;
    // }

    // // validate phone number
    // // function validPhone() {
    // //     if (!/^(\d{10})$/.test(phoneInput.value))
    // //         return false;
    // //     return true;
    // // }

    // // validate all inputs
    // function validateInputs() {
    //     if (userExists()) {
    //         errMessage(unameInput, 'username already exists');
    //         return false;
    //     }
    //     // if (!validPhone()) {
    //     //     errMessage(phoneInput, 'invalid phone number');
    //     //     return false;
    //     // }
    //     if (passInput.value !== c_passInput.value) {
    //         errMessage(c_passInput, 'passwords do not match');
    //         return false;
    //     }

    //     return true;
    // }

    // display error message
    function errMessage(elem, message) {
        elem.focus();
        window.alert(message);
    }

    // Event listener for form submission
    form.addEventListener('submit', e => {
        e.preventDefault();

        // if (validateInputs()) {
        //     // Set cookie if 'Stay Connected' checkbox is checked
        //     if (stayConnected.checked) {
        //         setCookie(unameInput.value);
        //     }

        if (passInput.value !== c_passInput.value) {
            errMessage(c_passInput, 'passwords do not match');
            return false;
        }
        xhr=getFxhr();
        xhr.onreadystatechange=function(){
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("המשתמש נרשם בהצלחה!");
                        spaRouter.nav(e);
                    } else if(xhr.status === 409){
                        console.error("שם משתמש קיים:", xhr.responseText);
                        errMessage(unameInput, 'username already exists');
                        return false;
                    }else {
                        console.error("שגיאה ברישום משתמש:", xhr.responseText);
                        errMessage(form, xhr.responseText);
                        return false;
                    }
                }
            };
        }

        xhr.open('POST',JSON.stringify({func: "signUP"}), true);
        
        // Create user object
        let user = {
            name: unameInput.value,
            phone: phoneInput.value,
            password: passInput.value,
            // lastSeen: new Date()
        };

        xhr.send(JSON.stringify(user));


            
            // // Add user to local storage
            // let users = JSON.parse(localStorage.getItem('users')) || [];
            // users.push(user);
            // localStorage.setItem('users', JSON.stringify(users));

            // // Set current user in local storage
            // localStorage.setItem('currentUser', user.name);

            // Redirect to menu page
            /*
            var targetId = redirect_to_logIn.getAttribute('data-target');
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Scrolling jusqu'à l'élément cible
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Not found');
            }
            */
        //}
    });
});
