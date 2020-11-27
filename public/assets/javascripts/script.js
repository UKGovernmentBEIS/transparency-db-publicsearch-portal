 /*
 Author: Ajay Badgujar
 Website: https://wwww.ajaybadgujar.com/
 */

var pagination = new Pagination({id:'pagination', tableID:'datatable', noOfRows:10});

let btnclick= document.querySelector('button');

btnclick.addEventListener('click',() => {
let checkbox1 = document.querySelector('input[type="checkbox"]:checked');
console.log("valud="+ checkbox1.value);
});


var mycheckbox = document.getElementById('Subsidy_awardNo');
mycheckbox.form.addEventListener('submit',function(e) {

    e.preventDefault();
    console.log(mycheckbox.checked)
});