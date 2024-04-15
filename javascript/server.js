class server{
    constructor(){

    }

    //אימות משתמש בכניסה
    validateUser(uname, pwd){
        return (db.getPassword(uname) === pwd);
    }

}