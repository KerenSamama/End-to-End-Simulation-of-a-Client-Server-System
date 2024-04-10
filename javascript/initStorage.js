//initStorage
if (localStorage.getItem('users') === null)
    localStorage.setItem('users', JSON.stringify([]));
if (localStorage.getItem('currentUser') === null)
    localStorage.setItem('currentUser', JSON.stringify({}));
