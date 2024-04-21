const spaRouter = {
    pages: [],


    init: function(){
        console.log("init");
        spaRouter.pages = document.querySelectorAll('.page');
        //Querying all elements with the class .page and storing them in the pages array.
        
       
        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', spaRouter.nav);
        });
        
       //history.replaceState({}, 'logIn', '#logIn');
        window.addEventListener('popstate', spaRouter.poppin);
        spaRouter.showPageFromURL();//display the appropriate page based on the current URL.
        
    },
    //This method handles navigation when a link is clicked.
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');//It identifies the target page from the data-target attribute of the clicked link.
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        if (location.hash === '#logIn') {
            location.reload();
        }
    },
    
    //This method is triggered when the user navigates using the browser's back or forward buttons.
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
    },

   // This method displays the page corresponding to the given pageId.
  showPage: function(pageId) {
  
    spaRouter.pages.forEach((page) => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    history.pushState({}, pageId, `#${pageId}`);
},
//This method retrieves the page identifier from the URL hash.
showPageFromURL: function() {
    let hash = location.hash.replace('#', '');
    let currentPage = hash || 'logIn'; 
    spaRouter.showPage(currentPage);
    
    if (currentPage === 'toDolists') {
        listManager.init(listManager.currentUser);
    }
   
}

};

document.addEventListener('DOMContentLoaded', spaRouter.init);