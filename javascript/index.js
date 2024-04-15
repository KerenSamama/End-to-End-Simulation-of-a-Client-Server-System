
// window.onload = function() {

    
//     var clickToElements = document.querySelectorAll(".container .click_to");

//     clickToElements.forEach(function(element) {
//         element.addEventListener("click", function(){
//             // Accéder à l'élément parent de l'élément cliqué
//             var parentTable = this.parentNode;
           
//         });
//     });


    

// };
    
const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        console.log("init");
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        });
        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        });
        
        history.replaceState({}, 'login', '#login');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        // h1.classList.add('big')
        // setTimeout((h)=>{
        //     h.classList.remove('big');
        // }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);