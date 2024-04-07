window.onload = function() {
    // function to add a list
    function addList(titleIndex) {
       
        var titleSelector = '.table:nth-child(' + titleIndex + ') h1';
        // Clone the extern list
        var listTemplate = document.getElementById('list_template').content.cloneNode(true);
        listTemplate.querySelector(".add_task").addEventListener('click',addTask);
        
        // put the extern list on the div
        document.querySelector(titleSelector).parentNode.appendChild(listTemplate);
    }

    //"TODAY"
    document.querySelector('.table:nth-child(1) h1').addEventListener('click', function() {
        addList(1);
    });

    //"THIS WEEK"
    document.querySelector('.table:nth-child(2) h1').addEventListener('click', function() {
        addList(2);
    });

    //"OTHER"
    document.querySelector('.table:nth-child(3) h1').addEventListener('click', function() {
        addList(3);
    });

    function addTask(){
         // Clone the intern list
        var taskTemplate = document.getElementById('toDoTask').content.cloneNode(true);
         
        var textBox = taskTemplate.querySelector('.myTask');
        textBox.addEventListener('dblclick', function() {
           textBox.removeAttribute('readonly');
       });
       
       textBox.addEventListener('keydown', function(event) {
           if (event.key === 'Enter') {
               textBox.setAttribute('readonly', true);
           }
       });
    
        // put the intern list on the extern list
        listTemplate.querySelector('ol').appendChild(taskTemplate);
    }


};