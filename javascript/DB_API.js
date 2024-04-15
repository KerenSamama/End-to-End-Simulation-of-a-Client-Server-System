const db = {
    //הוספת משתמש חדש
    addUser: function(uname, phone, pwd){
        const userData = {
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
        const userData = JSON.parse(localStorage.getItem(uname));
        return (userData?.password === pwd);
    },

    //שליפת רשימת משימות
    getList: function(currentUser, listName){
        const userData = JSON.parse(localStorage.getItem(currentUser));
        return userData?.toDoLists[listName];
    },

    //הוספת משימה
    addTask: function(currentUser, listName, text){
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.toDoLists[listName].push(text);
        localStorage.setItem(currentUser, JSON.stringify(userData));
    },

    //עדכון משימה
    updateTask: function(currentUser, listName, taskNum, text){
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.toDoLists[listName][taskNum - 1] = text;
        localStorage.setItem(currentUser, JSON.stringify(userData));

    },

    //מחיקת משימה
    deleteTask: function(currentUser, listName, taskNum){
        const userData = JSON.parse(localStorage.getItem(currentUser));
        for (let i = taskNum - 1; i < userData.toDoLists[listName].length; i++) {
            userData.toDoLists[listName][i] = userData.toDoLists[listName][i + 1];  
        }
        userData.toDoLists[listName].pop();
        localStorage.setItem(currentUser, JSON.stringify(userData));
    }

}