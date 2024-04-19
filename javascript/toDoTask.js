window.onload = function() {
    // function to add a list
    var uname_value = document.querySelector('#username input');
    var pass_value = document.querySelector('#pass input');
    
    function addList(titleIndex) {
        
       
        var titleSelector = '.table:nth-child(' + titleIndex + ') h1';
        // Clone the extern list
        var listTemplate = document.getElementById('list_template').content.cloneNode(true);
    
        listTemplate.querySelector(".add_task").addEventListener('click', function(e) {
            addTask(e.target.parentNode);
        });
        // put the extern list on the div
        document.querySelector(titleSelector).parentNode.appendChild(listTemplate);
    }


    function addTask(list){
         // Clone the intern list
        var taskTemplate = document.getElementById('toDoTask').content.cloneNode(true);
        var table_name=list.querySelector('h1').id;
        var textBox = taskTemplate.querySelector('.myTask');

        textBox.addEventListener('dblclick', function() {
           textBox.removeAttribute('readonly');
       });
      
       textBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            textBox.setAttribute('readonly', true);
            var userInput = textBox.value;
            console.log("Contenu de .myTask :", userInput);
           
            var user_check ={
                uname: uname_value.value,
                listname:table_name,
                text:userInput
            };
            

 
            console.log(user_check.toDoLists);
            var user_check_json=JSON.stringify(user_check);
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("POST","./addTask", true);
            fxhttp.send(user_check_json);
            
        }
       });
    
        // put the intern list on the extern list
        list.querySelector('ol').appendChild(taskTemplate);
    }
     
    //add the 3 to-do lists
    for(i=1; i<=3; i++){
        addList(i);
    }

    //delete
    


};