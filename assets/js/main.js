/**
* Template Name: NiceAdmin
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Apr 20 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();

function dataFilter() {
  var genre = document.getElementById("genre-selector").value;
  var type = document.getElementById("type-selector").value;
  if ($.fn.DataTable.isDataTable('#datatble')) {
      $('#datatable').DataTable().destroy();
  }
  datatable = $('#datatable').DataTable({
      ajax: {
          url: "/manga/manga/hasil.json",
          dataSrc: ""
      },
      scrollX: true,
      columns: [
        { 
          data: "rank",
          orderable: true,
          orderSequence: ["asc", "desc"]
        },
        {
          data: "image",
          render: function (data) {
            return '<img src="' + data + '" alt="Image" style="max-width: 150px; border-radius: 10px;">';
          },
          orderable: false
        },
        { 
          data: "title",
          orderable: true,
          orderSequence: ["asc", "desc"]
        },
        { 
          data: "type",
          orderable: false
        },
        {
          data: "synopsis",
          render: function (data) {
            return '<textarea class="form-control" style="width: 300px;" rows="4" readonly>' + data + '</textarea>'
          },
          orderable: false
        },
        { 
          data: "genre",
          orderable: false
        },
        { 
          data: "score",
          orderable: true,
          orderSequence: ["asc", "desc"]
        },
        { data: "status" },
        { 
          data: "published",
          orderable: false,
        },
        { 
          data: "authors",
          orderable: false
        },
        {
          data: "volumes",
          orderable: false
        },
        {
          data: "chapters",
          orderable: false
        },
        {
          data: "serialization",
          orderable: false
        },
        {
          data: "popularity",
          orderable: false
        },
        { 
          data: "members",
          orderable: true,
          orderSequence: ["asc", "desc"]
        },
        {
          data: "favorites",
          orderable: false,
        }
      ],
      initComplete: function (settings, json) {
        var datatable = this.api();
        var rank = 1;
        datatable.rows().every(function (rowIdx, tableLoop, rowLoop) {
          var genres = datatable.cell(rowIdx, 5).data();
          var types = datatable.cell(rowIdx, 3).data();
  
          if ((genre === "all_genre" || genres.includes(genre)) && (type === "all_type" || types === type)) {
            datatable.cell(rowIdx, 0).data(rank++);
          }
          else {
            datatable.row(rowIdx).remove();
          }
        });
        datatable.draw();
      } 
  })
}