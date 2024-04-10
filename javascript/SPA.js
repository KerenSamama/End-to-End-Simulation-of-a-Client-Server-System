const spaRouter = {
    pages: [],
    show: new Event('show'),
    init: function(){
        console.log("init");
        spaRouter.pages = document.querySelectorAll('.page');
        spaRouter.pages.forEach((pg)=>{
            pg.addEventListener('show', spaRouter.pageShown);
        });
        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', spaRouter.nav);
        });
        
        history.replaceState({}, 'login', '#login');
        window.addEventListener('popstate', spaRouter.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(spaRouter.show);
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
        document.getElementById(hash).dispatchEvent(spaRouter.show);
    }
}

document.addEventListener('DOMContentLoaded', spaRouter.init);