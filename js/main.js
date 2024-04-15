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

function insert_data_scrapper(){
    fetch('headlines.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((obj, index) => {
            table.row.add([
                index + 1,
                obj.title,
                obj.category,
                obj.publish_time,
                obj.storing_time

            ]).draw();
        })
    })
    .catch(error => {
        console.error('Error',error)
    });
}

document.addEventListener('DOMContentLoaded', insert_data_scrapper);

$('#scrapping-table').on('draw.dt', function(){
    $('#scrapping-table td').css('text-align','center');
});