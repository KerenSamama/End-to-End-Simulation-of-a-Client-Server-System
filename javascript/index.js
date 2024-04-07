
window.onload = function() {

    
    var clickToElements = document.querySelectorAll(".container .click_to");

    clickToElements.forEach(function(element) {
        element.addEventListener("click", function(){
            // Accéder à l'élément parent de l'élément cliqué
            var parentTable = this.parentNode;
           
        });
    });




    var textBox = document.querySelector('.myTask');

     //lists template
     textBox.addEventListener('dblclick', function() {
        textBox.removeAttribute('readonly');
    });
    
    textBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            textBox.setAttribute('readonly', true);
            // Here you can add your update logic
            console.log('Text updated:', textBox.value);
        }
    });

    

};
    