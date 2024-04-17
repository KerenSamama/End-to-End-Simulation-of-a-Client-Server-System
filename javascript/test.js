const ob = {
    add: function(a, b) {
        return a +b;
    },

    show: function(a, b){
        this['add'](a, b);
    }

};

document.addEventListener('DOMContentLoaded', () => {

    const checkContent = ob.show(55, 8);
    console.log(checkContent);
    document.body.appendChild(document.createTextNode(checkContent))
});
