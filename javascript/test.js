document.addEventListener('DOMContentLoaded', () => {
    db.addUser('Noam','0585463179','12345678');
    db.deleteTask('noam1', 'today', 4);
    checkContent = db.getList('noam1', 'today');
    console.log(checkContent);
    document.body.appendChild(document.createTextNode(checkContent))
});
