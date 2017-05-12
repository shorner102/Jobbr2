(function($) {
  const likeBtn = $("#likeBtn");
  const dislikeBtn = $("#dislikeBtn");
  const title = $("#jobtitle");
  const company = $("#company");
  const location = $("#location");
  const snippet = $("#snippet");
  const web = $("#link");

  /* get first 25 job postings into db */
  $.ajax({
    type: "GET",
    url: "/swipe/getjobs",
    success: function(data) {
      /* returns us the first job posting */
      title.html(data.jobtitle);
      company.html(data.company);
      location.html(data.formattedLocation);
      snippet.html(data.snippet);
      web.attr("href",data.url);
    },
    contentType: "application/json",
    dataType: "json"
  });

  /* if like button pressed */
  likeBtn.submit(e => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/swipe/like",
      data: "",
      success: function(data) {
        title.html(data.jobtitle);
        company.html(data.company);
        location.html(data.formattedLocation);
        snippet.html(data.snippet);
        web.attr("href",data.url);
      },
      contentType: "application/json",
      dataType: "json"
    });
  });

  /* if dislike button pressed */
  dislikeBtn.submit(e => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/swipe/dislike",
      data: "",
      success: function(data) {
        title.html(data.jobtitle);
        company.html(data.company);
        location.html(data.formattedLocation);
        snippet.html(data.snippet);
        web.attr("href",data.url);
      },
      contentType: "application/json",
      dataType: "json"
    });
  });


})(jQuery); // jQuery is exported as $ and jQuery
