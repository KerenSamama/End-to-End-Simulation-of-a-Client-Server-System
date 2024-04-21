document.addEventListener('DOMContentLoaded', function () {
    var signInForm = document.getElementById('form1');
    var signInUnameInput = document.querySelector('#username input');
    var signInPassInput = document.querySelector('#password input');


    function check(){
       

        var user_check={
            uname:signInUnameInput.value,
            password:signInPassInput.value,
        }

        var user_check_json=JSON.stringify(user_check);
        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("POST","./logIn",false);
        fxhttp.send(user_check_json);
        if(fxhttp.status === 200){
            return true;
        }else{
            alert(fxhttp.statusText);
            return false;
        }

    }
  
    // Event listener for SignIn form submission
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if(check()){
            listManager.init(signInUnameInput.value)
            spaRouter.nav(e);
        }
           
    });
});
