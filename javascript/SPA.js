const spaRouter = {
    pages: [],
    init: function(){
        console.log("init");
        spaRouter.pages = document.querySelectorAll('.page');
        
       
        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', spaRouter.nav);
        });
        
       //history.replaceState({}, 'logIn', '#logIn');
        window.addEventListener('popstate', spaRouter.poppin);
        spaRouter.showPageFromURL();
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
    },

  //jai rajouter
  showPage: function(pageId) {
    // Masquer toutes les pages et afficher celle avec l'ID correspondant
    spaRouter.pages.forEach((page) => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    history.pushState({}, pageId, `#${pageId}`);
},
showPageFromURL: function() {
    let hash = location.hash.replace('#', '');
    let currentPage = hash || 'logIn'; // Si aucun hash, afficher la page de connexion par défaut
    spaRouter.showPage(currentPage);
}

};

document.addEventListener('DOMContentLoaded', spaRouter.init);