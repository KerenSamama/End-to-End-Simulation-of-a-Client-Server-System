document.addEventListener("DOMContentLoaded", () => {
    var form = document.getElementById('form2');
    var unameInput = document.querySelector('#uname input');
    var passInput = document.querySelector('#pass input');
    var c_passInput = document.querySelector('#c_pass input');
    var phoneInput = document.querySelector('#phone input');

    
    
    function store(){ // sign up function
       
        if(passInput.value!=c_passInput.value){
            alert('passwords do not match');
            return false;

        }else{
           
            var new_user ={
                uname: unameInput.value,
                password: passInput.value,
                phone: phoneInput.value
            }
            
            //convert to JSON
            var new_user_json=JSON.stringify(new_user);
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("POST","./signUp", false /**סינכרוני */);
            fxhttp.send(new_user_json);
            if(fxhttp.status === 200){
                alert('Your account has been created');
                return true;
            }else{
                alert(fxhttp.statusText);
                return false;
            }
            
    
        }
    }
    // Event listener for form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if(store()){
            spaRouter.nav(e);
        }
        
    });
});
