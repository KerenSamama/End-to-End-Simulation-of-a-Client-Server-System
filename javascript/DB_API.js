const db = {
    //הוספת משתמש חדש
    addUser: function(uname, ph, pwd){
        const userData = {
            password: pwd,
            phone: ph,
            toDoLists:{
                today: [],
                thisWeek: [],
                other: []
            }
        };
        localStorage.setItem(uname, JSON.stringify(userData));
    },

    //שליפת נתוני משתמש
    getUserData: function(uname){
        return JSON.parse(localStorage.getItem(uname));
    },

     //שליפת סיסמא 
    getPassword: function(uname){
        const userData = this.getUserData(uname);
        return userData?.password;
    },

     //עדכון סיסמא 
     updatePassword: function(uname, pwd){
        const userData = this.getUserData(uname);
        if(!userData){
            console.error("user not found");
            return false;
        }
        userData.password = pwd;
        localStorage.setItem(uname, JSON.stringify(userData));
    },

    //שליפת כל הרשימות
    getAllLists: function(currentUser){
        const userData = this.getUserData(currentUser);
        return userData?.toDoLists;
    },  

    //שליפת רשימת משימות
    getList: function(currentUser, listName){
        const userData = this.getUserData(currentUser);
        return userData?.toDoLists[listName];
    },

    //הוספת רשימה
    addList: function(currentUser, listName){
        const userData = this.getUserData(currentUser);
        if(!userData){
            console.error("user not found");
            return false;
        }
        userData.toDoLists[listName] = [];
        localStorage.setItem(currentUser, JSON.stringify(userData));
    },

    //הוספת משימה
    addTask: function(currentUser, listName, text){
        const userData = this.getUserData(currentUser);
        if(!userData || !(userData.toDoLists[listName])){
            console.error("user or list not found");
            return false;
        }
        userData.toDoLists[listName].push(text);
        localStorage.setItem(currentUser, JSON.stringify(userData));
    },

    //עדכון משימה
    updateTask: function(currentUser, listName, taskNum, text){
        const userData = this.getUserData(currentUser);
        if(!userData || !(userData.toDoLists[listName])){
            console.error("user or list not found");
            return false;
        }
        userData.toDoLists[listName][taskNum - 1] = text;
        localStorage.setItem(currentUser, JSON.stringify(userData));

    },

    //מחיקת משימה
    deleteTask: function(currentUser, listName, taskNum){
        const userData = this.getUserData(currentUser);
        if(!userData || !(userData.toDoLists[listName])){
            console.error("user or list not found");
            return false;
        }
        for (let i = taskNum - 1; i < userData.toDoLists[listName].length; i++) {
            userData.toDoLists[listName][i] = userData.toDoLists[listName][i + 1];  
        }
        userData.toDoLists[listName].pop();
        localStorage.setItem(currentUser, JSON.stringify(userData));
    }

}