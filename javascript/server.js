class Server{
  
    hendleRequestAsync(data,callback){
        data.readyState = 3;
        const req = JSON.parse(data.body); //צריך לשלוח ג'ייסון עם שדות מתאימים ,send נשלח דרך פונקציית 
        let result;

        setTimeout(() =>{
            console.log(data)
            switch(data.method){
                case 'GET': //שליפת רשימה
                    result = db.getList(req.uname, req.listName);
                    break;

                case 'POST': //הוספת משימה
                    result = db.addTask(req.uname, req.listName, req.text);//listname : today...
                    break;

                case'PUT': //עדכון משימה
                    result = db.updateTask(req.uname, req.listName, req.taskNum, req.text);
                    break;

                case 'DELETE': //מחיקת משימה
                    result = db.deleteTask(req.uname, req.listName, req.taskNum);
                    break;
                
                default:
                    data.status = 405;
                    let err = "method not supported";
                    data.statusText = err;
                    console.error(err);                 

            }

            if(!result){
                data.status = 409;
                let err = "data not found";
                data.statusText = err;
                console.error(err);
            }
            else{
                data.status = 200;
                data.responseText = JSON.stringify(result);//לכאן מוחזרת תשובה
            }
            data.readyState = 4;
            callback(data);
        }, 3000)

    };

    hendleRequestSync(data){
        data.readyState = 3;
        const req = JSON.parse(data.body);

        if(data.method === 'POST'){
            if(data.url === "./signUp"){
                if(!db.getUserData(req.uname)){
                    db.addUser(req.uname, req.phone, req.password);
                    data.status = 200;
                    data.readyState = 4;
                    return true;//משתמש נרשם
                }
                else {
                    data.status = 409;
                    let err = "userName is already in use";
                    data.statusText = err;
                    console.error(err); 
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
                    let err = "userName or password incorrect";
                    data.statusText = err;
                    console.error(err); 
                    data.readyState = 4;
                    return false;//שם משתמש או סיסמא שגויים
                }
            }
            else{
                data.status = 404;
                let err = "page not found";
                data.statusText = err;
                console.error(err);
                data.readyState = 4;
                return false;
            }

         }
        else {
            data.status = 405;
            let err = "method not supported";
            data.statusText = err;
            console.error(err);
            data.readyState = 4;
            return false;
        }
    }


}
