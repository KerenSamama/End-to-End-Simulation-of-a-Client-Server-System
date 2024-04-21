const listManager = {
    currentUser: "",
    init: function(uname){
        listManager.currentUser = uname;
        for(i=1; i<=3; i++){
            var titleSelector = '.table:nth-child(' + i + ') h1';
            document.querySelector(titleSelector).addEventListener('click', listManager.showList);
        }

    },
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

    hideList: function(ev){
        title = ev.target;
        par = title.parentNode;
        par.removeChild(par.children[par.children.length -1]);
        par.removeChild(par.children[par.children.length -1]);
        title.removeEventListener('click', listManager.hideList);
        title.addEventListener('click', listManager.showList);
    },

    showTask: function(list, task){
         // Clone the intern list
         var taskTemplate = document.getElementById('toDoTask').content.cloneNode(true);
         var textBox = taskTemplate.querySelector('.myTask');
         var del = taskTemplate.querySelector('.delete_button');
 
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

    updateTask: function(ev){
        var task = ev.target.parentNode;
        var list = task.parentNode;
        var childrenArray = Array.from(list.children);
        var tNum = childrenArray.indexOf(task);
        
        var tx = ev.target.value;
        var lname = list.parentNode.querySelector('h1').id;
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

    deleteTask: function(ev){
        var task = ev.target.parentNode;
        var list = task.parentNode;
        var childrenArray = Array.from(list.children);
        var tNum = childrenArray.indexOf(task);        
        var lname = list.parentNode.querySelector('h1').id;
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












//indow.onload = function() {
    // function to add a list
    //var uname_value = document.querySelector('#username input');
    //var pass_value = document.querySelector('#pass input');
    
    // function addList(titleIndex) {

    // }



     
    //add the 3 to-do lists


    //delete

    //UPDATE
//     function updateTask(list){




//     }
    


// };