const db = {
    //הוספת משתמש חדש
    addUser: function(uname, phone, pwd){
        userData = {
            password: pwd,
            phone: phone,
            toDoLists:{
                today: [],
                thisWeek: [],
                other: []
            }
        };
        localStorage.setItem(uname, JSON.stringify(userData));
    },

    //אימות משתמש בכניסה
    validateUser: function(uname, pwd){
        userData = JSON.parse(localStorage.getItem(uname));
        return (userData.password === pwd);
    },

    //שליפת רשימת משימות
    getList(currentUser, listName){
        userData = JSON.parse(localStorage.getItem(currentUser));
        return userData.toDoLists[listName];
    },

    //הוספת משימה
    addTask(currentUser, listName, text){
        userData = JSON.parse(localStorage.getItem(currentUser));
        userData.toDoLists[listName].push(text);
        localStorage.setItem(currentUser, JSON.stringify(userData));
    },

    //עדכון משימה
    updateTask(currentUser, listName, taskNum, text){
        userData = JSON.parse(localStorage.getItem(currentUser));
        userData.toDoLists[listName][taskNum - 1] = text;
        localStorage.setItem(currentUser, JSON.stringify(userData));

    },

    //מחיקת משימה
    deleteTask(currentUser, listName, taskNum){

    }

}