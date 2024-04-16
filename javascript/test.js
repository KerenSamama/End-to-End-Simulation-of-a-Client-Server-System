const ob = {
    add: function(a, b) {
        return a +b;
    }

};

document.addEventListener('DOMContentLoaded', () => {

    const checkContent = ob['add'](2, 77);
    console.log(checkContent);
    document.body.appendChild(document.createTextNode(checkContent))
});
