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
        var table_name=list.querySelector('h1').id;//"today"
        var textBox = taskTemplate.querySelector('.myTask');//"מה שאני נכנסת"

        textBox.addEventListener('dblclick', function() {
           textBox.removeAttribute('readonly');
       });
      
       textBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            textBox.setAttribute('readonly', true);
            var userInput = textBox.value;
            console.log("Contenu de .myTask :", userInput);
           
            var add_check_list ={
                uname: uname_value.value,
                listName:table_name,
                text:userInput
            };
            console.log(add_check_list.toDoLists);
            var add_check_list_json=JSON.stringify(add_check_list);
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("POST","./addTask", true);
            fxhttp.send(add_check_list_json);
            
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

    //UPDATE
    function updateTask(list){
        var taskTemplate = document.getElementById('toDoTask').content.cloneNode(true);
        var table_name=list.querySelector('h1').id;//"today"
        var textBox = taskTemplate.querySelector('.myTask');//"מה שאני נכנסת"

        textBox.addEventListener('dblclick', function() {
            textBox.removeAttribute('readonly');
            const taskIndex = uname_value.toDoLists[listName].findIndex(task => task.id === taskId);
            var updateData = {
                uname: uname_value,
                listName: table_name,
                taskNum: taskIndex,
                text:userInput
            };
            if (taskIndex === -1) {
                console.error("Task not found");
                return false;
            }

            var update_check_list_json=JSON.stringify(update_check_list);
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("POST","./addTask", true);
            fxhttp.send(update_check_list_json);
            
            

        });



    }
    


};