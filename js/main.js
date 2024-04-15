const mntoggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
})

function insert_data_scraping() {
    fetch('headline.json')
        .then(response => response.json())
        .then(data => {
            var table = $('#scrapping-table').DataTable();
            data.forEach((obj, index) => {
                table.row.add([
                    index + 1,
                    obj.title,
                    obj.category,
                    obj.publish_time,
                    obj.storing_time
                ]);
            });
            table.draw();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', insert_data_scraping);

$('#scrapping-table').on('draw.dt', function () {
    $('#scrapping-table td').css('text-align', 'center');
});