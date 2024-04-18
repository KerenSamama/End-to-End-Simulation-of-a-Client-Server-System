const spaRouter = {
    pages: [],
    init: function(){
        console.log("init");
        spaRouter.pages = document.querySelectorAll('.page');

        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', spaRouter.nav);
        });
        
        history.replaceState({}, 'logIn', '#logIn');
        window.addEventListener('popstate', spaRouter.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
    },

    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
    }
}

document.addEventListener('DOMContentLoaded', spaRouter.init);