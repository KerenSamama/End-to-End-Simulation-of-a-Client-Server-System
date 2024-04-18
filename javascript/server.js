class server{
    
    hendleRequestAsync(data,callback){
        data.readyState = 3;
        req = JSON.parse(data.body); //צריך לשלוח ג'ייסון עם שדות מתאימים ,send נשלח דרך פונקציית 
        let result;

        setTimeout(() =>{
            switch(data.method){
                case 'GET': //שליפת רשימה
                    result = db.getList(req.uname, req.listName);
                    break;

                case 'POST': //הוספת משימה
                    result = db.addTask(req.uname, req.listName, req.text);
                    break;

                case'PUT': //עדכון משימה
                    result = db.updateTask(req.uname, req.listName, req.taskNum, req.text);
                    break;

                case 'DELETE': //מחיקת משימה
                    result = db.deleteTask(req.uname, req.listName, req.taskNum);
                    break;
                
                default:
                    data.status = 405;
                    console.error("method not supported");                 

            }

            if(!result){
                data.status = 409;
                console.error("data not found");
            }
            else{
                data.status = 200;
                data.responseText = JSON.stringify(result);//לכאן מוחזרת תשובה
            }
            data.readyState = 4;
            callback();
        }, 3000)

    }

    hendleRequestSync(data){
        data.readyState = 3;
        req = JSON.parse(data.body);

        if(data.method === 'POST'){
            if(data.url === "./signUp"){
                if(!db.getUserData(req.uname)){
                    db.addUser(req.name);
                    data.status = 200;
                    data.readyState = 4;
                    return true;//משתמש נרשם
                }
                else {
                    data.status = 409;
                    console.error("userName is already in use");
                    data.readyState = 4;
                    return false;//משתמש לא נרשם
                } 

            }
            else if(data.url === "./logIn"){
                if(db.getPassword(req.uname) === req.password){
                    data.status = 200;
                    data.readyState = 4;
                    return true;//משתמש תקין
                }
                else{
                    data.status = 409;
                    console.error("userName or password incorrect");
                    data.readyState = 4;
                    return false;//שם משתמש או סיסמא שגויים
                }
            }
            else{
                data.status = 404;
                console.error("page not found");
                data.readyState = 4;
                return false;
            }

         }
        else {
            data.status = 405;
            console.error("method not supported");
            data.readyState = 4;
            return false;
        }
    }


}

// class Server{
//     static carry_request(body, obj){

//         if(obj.method=="POST"){ // add user or guest 
//             var obj=JSON.parse(body)
//             if(obj.type=="user"){
//                 add_user(body)
//                 obj.status=200;
//                 obj.readyState=4;
//                 return obj;
               
//             }
//             if(obj.type=="guest"){
//                 add_guest(body)
//                 obj.status=200;
//                 obj.readyState=4;
//                 return obj;
               
//             }

//         }
//         else{
//             if((obj.method=="GET")&&(obj.url=="./GET_user")){// get list guest of current user 
//                 var obj=JSON.parse(body)
//             if((obj.type=="user")&&(obj.password=="")){
//                 var list_guest=null;
//                 list_guest=get_list_guest_of_user(body);
//                 if(list_guest!=null){
//                     obj.status=200;
//                     obj.readyState=4;
//                     obj.response=list_guest;
//                     obj.responseText=JSON.stringify(list_guest);
//                    return obj;
                    
//                 }else{
//                     obj.status=404;
//                     obj.readyState=4;
//                     obj.response=list_guest;
//                     obj.responseText="";
//                     return obj;

//                 }
                

//             }
//             if(obj.type=="user"){ // get current user 
//                 var user=null;
//                 user=get_user(body)
//                 if(user!=null){
//                     obj.status=200;
//                     obj.readyState=4;
//                     obj.response=user;
//                     obj.responseText=JSON.stringify(user);
//                     return obj;

//                 }
//                 else{
//                     obj.status=404;
//                     obj.readyState=4;
//                     obj.response=user;
//                     obj.responseText="";
//                     return obj;
//                 }
                
//             }
            
            

//             }
//             if((obj.method=="GET")&&(obj.url=="./GET_guest"))
//             {
//                 var guest=null;
//                 guest=get_guest(body); //get specific guest of current user 
//                 if(guest!=null)
//                 {
//                     obj.status=200;
//                     obj.readyState=4;
//                     obj.response=guest;
//                     obj.responseText=JSON.stringify(guest);
//                     return obj;
//                 }else{
//                     obj.status=404;
//                     obj.readyState=4;
//                     obj.response=guest;
//                     obj.responseText="";
//                     return obj;

//                 }

//             }
//             if (obj.method == "DELETE" ){ // delete guest 
//                 delete_guest(body);
//                 obj.status=200;
//                 obj.readyState=4;
//                 obj.response=null;
//                 obj.responseText="";
//                 return obj;
//             }
//             if(obj.method=="PUT"){ //update guest details 
//                 update_guest(body);
//                 obj.status=200;
//                 obj.readyState=4;
//                 obj.response=null;
//                 obj.responseText="";
//                 return obj;
//             }
//         }

//     }
// }