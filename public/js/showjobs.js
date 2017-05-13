(function($) {

  $("#match-table").tabulator({
  height:"600px",
  fitColumns:true,
  columns:[
    {title:"Job Title", field:"jobtitle",  sortable:true},
    {title:"Company", field:"company", sortable:true},
    {title:"Location", field:"formattedLocation", sortable:true},
    {title:"Snippet", field:"snippet", sortable:false, formatter:"textarea"},
    {title:"Link", field:"url", sortable:false, formatter:"link"},
  ],
  });

  /* get first 25 job postings into db */
  $.ajax({
    type: "GET",
    url: "/match/getjobs",
    success: function(data) {
      /* returns us the first job posting */
      $("#match-table").tabulator("setData", "/match/getjobs");

    },
    contentType: "application/json",
    dataType: "json"
  });

  $(window).resize(function(){
    $("#match-table").tabulator("redraw");
  });


})(jQuery); // jQuery is exported as $ and jQuery
