document.addEventListener('DOMContentLoaded', () => {
    db.deleteTask('noam1', 'today', 4);
    checkContent = db.getList('noam1', 'today');
    console.log(checkContent);
    document.body.appendChild(document.createTextNode(checkContent))
});
