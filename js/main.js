 const mntoggle = document.querySelector('.menu-toggle input');
 const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click',function(){
    nav.classList.toggle('menushow');
})

var table = $('#scrapping-table').DataTable({
    columnDefs: [
        {targets: [3], orderable: false}
    ],
    order:[]
});

function web_scraper(){
    fetch()
}