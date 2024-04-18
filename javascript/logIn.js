document.addEventListener('DOMContentLoaded', function () {
    var signInForm = document.getElementById('form1');
    var signInUnameInput = document.querySelector('#username input');
    var signInPassInput = document.querySelector('#password input');


    function check(){
       

        var user_check={
            uname:signInUnameInput.value,
            password:signInPassInput.value,
            phone:""
        }

        var user_check_json=JSON.stringify(user_check);
        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("GET","./logIn");
        fxhttp.send(user_check_json);
        

    }
  
    // Event listener for SignIn form submission
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        check();
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
        
    });
});
/*---------------------------------------------------------------*/
/* function check(){ //sign in function
    
   // var signInUnameInput = document.querySelector('#username input');
    //var userEmail = document.getElementById('userMail');
   // var userPw = document.getElementById('userPw');
    var signInUnameInput = document.querySelector('#username input');
    var signInPassInput = document.querySelector('#password input');
    
   
    var user_to_search ={
        type:"user",
        name:signInUnameInput.value,
        password:signInPassInput.value
    }
    var user_to_search_json=JSON.stringify(user_to_search);


    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./fakeURL",true);
    
    fxhttp.send(user_to_search_json);
    var rep=fxhttp.onload();
    current_user=rep;

    if(rep!=null){
       // go to guest list page
        let currentPage= "index";
          temp1=document.querySelector(current_page_div)
          document.body.removeChild(temp1);
          current_page='#'+currentPage;
          current_page_div=current_page+"_div"
         temp2=document.getElementById(currentPage)
         var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
         console.log(currentPage)
         history.pushState({}, currentPage, `#${currentPage}`);
         document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
         document.getElementById(currentPage).dispatchEvent(app.show);
    }
    else{
        alert("error in username or password, please retry")
        error_sign_in=true;
        let currentPage= "sign_in";
        temp1=document.querySelector(current_page_div)
        document.body.removeChild(temp1);
        current_page='#'+currentPage;
        current_page_div=current_page+"_div"
       temp2=document.getElementById(currentPage)
       var clon2 = temp2.content.cloneNode(true);
       document.body.appendChild(clon2);
       if(error_sign_in==true){
        error_sign_in=false;
        var userEmail = document.getElementById('userMail');
        var userPw = document.getElementById('userPw');
        userEmail.value="";
        userPw.value="";
        max_essai_sign_in++;
        if(max_essai_sign_in==3){
            
            setTimeout(blocking,  15000);
            alert("you are blocked for 15 seconds");
            document.getElementById("userMail").disabled = true;
            document.getElementById("userPw").disabled = true;
            max_essai_sign_in=0;
            
    
        }
    }
       
    }
} */