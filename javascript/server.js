class server{
    constructor(){

    }
    
    process_data(data,dispatcher){

    }

    process_data(data){
        
    }
    //אימות משתמש בכניסה
    validateUser(uname, pwd){
        return (db.getPassword(uname) === pwd);
    }

}
