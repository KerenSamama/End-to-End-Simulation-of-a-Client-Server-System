const listManager = {
   // This method initializes the listManager object by setting currentUser to the provided username (uname). 
   //It also adds event listeners to the task list titles.
    currentUser: "",
    init: function(uname){
        listManager.currentUser = uname;
        for(i=1; i<=3; i++){
            var titleSelector = '.table:nth-child(' + i + ') h1';
            document.querySelector(titleSelector).addEventListener('click', listManager.showList);
        }

    },
    // This method is called when a user clicks on a task list title. 
    //It displays the corresponding task list by cloning a task list template from the HTML, 
    //adding event listeners for adding new tasks, and sending an HTTP request to retrieve existing
    // tasks.

    showList: function(ev){
        title = ev.target;
        // Clone the extern list
        var listTemplate = document.getElementById('list_template').content.cloneNode(true);
    
        listTemplate.querySelector(".add_task").addEventListener('click', function(e) {
            listManager.addTask(e.target.parentNode);
        });
        // put the extern list on the div
        title.parentNode.appendChild(listTemplate);
        listTemplate.querySelector('ol');
        //clonedList.classList.add('new-class');
        
        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("GET", "./getList", true)
        var lname=title.id;
        const dataToSend = {
            uname: listManager.currentUser,
            listName: lname
        };    
        fxhttp.onreadystatechange = function() {
            if (fxhttp.readyState === 4) {
                if (fxhttp.status === 200) {
                    var taskList = JSON.parse(fxhttp.responseText);
                    taskList.forEach(task => {
                        listManager.showTask(title.parentNode, task);
                    });
                } else {
                    alert(fxhttp.statusText);
                }
            }
        };
        fxhttp.send(JSON.stringify(dataToSend));

        title.removeEventListener('click', listManager.showList);
        title.addEventListener('click', listManager.hideList);

    },
    //Method hideList(ev): This method is called when a user clicks again on the title of an 
    //already opened task list. It hides the task list by removing the cloned task list template.
    hideList: function(ev){
        title = ev.target;
        par = title.parentNode;
        par.removeChild(par.children[par.children.length -1]);// removes the last child element of the parent node
        par.removeChild(par.children[par.children.length -1]);
        title.removeEventListener('click', listManager.hideList);
        title.addEventListener('click', listManager.showList);
    },
    //This method displays a task in a specified task list. 
    //It clones a task template from the HTML, adds an event listener for task deletion,
    // and then appends it to the task list.
    showTask: function(list, task){
         // Clone the intern list
         var taskTemplate = document.getElementById('toDoTask').content.cloneNode(true);//clones the content of the task template defined in the HTML
         var textBox = taskTemplate.querySelector('.myTask');//selects the input field within the cloned task template
         var del = taskTemplate.querySelector('.delete_button');// selects the delete button within the cloned task template
 
         textBox.addEventListener('dblclick', function() {
            textBox.removeAttribute('readonly');
        });
       
        textBox.addEventListener('keydown', function(ev) {
         if (ev.key === 'Enter') {
            listManager.updateTask(ev);
             
         }
        });

        del.addEventListener('click', listManager.deleteTask);

        if (task){
            textBox.value = task;
        }
   
         // put the intern list on the extern list
         list.querySelector('ol').appendChild(taskTemplate);
    },
    //This method adds a new task to a specified task list. 
    //It also sends an HTTP request to add the task to the database.
    addTask: function(list){

        var lname=list.querySelector('h1').id;//"today"
        var dataToSend={
                 uname: listManager.currentUser,
                 listName: lname,
                 text: ''
             };
            
             var fxhttp=new FXMLHttpRequest();
             fxhttp.open("POST","./addTask", true);
             fxhttp.onreadystatechange = function() {
                if (fxhttp.readyState === 4) {
                    if (fxhttp.status === 200) {
                        listManager.showTask(list);
                    } else {
                        alert(fxhttp.statusText);
                    }
                }
            };   
            fxhttp.send(JSON.stringify(dataToSend));

    },
    //This method updates an existing task in a specified task list. 
    //It sends an HTTP request to update the task in the database.
    updateTask: function(ev){
        var task = ev.target.parentNode;// finds the parent node of the element that triggered the event
        var list = task.parentNode;// finds the parent node of the task
        var childrenArray = Array.from(list.children);// converts the child nodes of the task list into an array.
        var tNum = childrenArray.indexOf(task);//tnum= index of the task within the array of child nodes
        
        var tx = ev.target.value;// retrieves the new text content of the task from the event target 
        var lname = list.parentNode.querySelector('h1').id;// finds the ID of the task list
        var dataToSend={
            uname: listManager.currentUser,
            listName: lname,
            taskNum: tNum,
            text: tx
        };
       
        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("PUT","./updateTask", true);
        fxhttp.onreadystatechange = function() {
           if (fxhttp.readyState === 4) {
               if (fxhttp.status === 200) {
                   console.log("Task updated successfully");
               } else {
                   alert(fxhttp.statusText);
               }
           }
       };   
       fxhttp.send(JSON.stringify(dataToSend));
    },
    //This method deletes an existing task from a specified task list.
    // It sends an HTTP request to delete the task from the database.
    deleteTask: function(ev){
        var task = ev.target.parentNode;//finds the parent node of the clicked element
        var list = task.parentNode;// finds the parent node of the task
        var childrenArray = Array.from(list.children);// converts the child nodes of the task list into an array.
        var tNum = childrenArray.indexOf(task);//the index of the task within the array of child nodes     
        var lname = list.parentNode.querySelector('h1').id;//lname= ID of the task list
        var dataToSend={
            uname: listManager.currentUser,
            listName: lname,
            taskNum: tNum
        };
       
        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("DELETE","./deleteTask", true);
        fxhttp.onreadystatechange = function() {
           if (fxhttp.readyState === 4) {
               if (fxhttp.status === 200) {
                   list.removeChild(task);
               } else {
                   alert(fxhttp.statusText);
               }
           }
       };   
       fxhttp.send(JSON.stringify(dataToSend));
    }

}

