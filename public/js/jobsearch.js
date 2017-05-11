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
    type: "POST",
    url: "/swipe/getjobs",
    data: "",
    success: function(data) {
      /* returns us the first job posting */
      console.log(JSON.stringify(data));
      theResult.html(JSON.stringify(data, null, '\t'));
      title.html(JSON.stringify(data.jobtitle));
      company.html(JSON.stringify(data.company));
      location.html(JSON.stringify(data.formattedLocation));
      snippet.html(JSON.stringify(data.snippet));
      web.attr("href",JSON.stringify(data.url));
    },
    contentType: "application/json",
    dataType: "json"
  });

  /* if like button pressed */
  theForm.submit(e => {
    e.preventDefault();
    const formData = {
      jobtitle: theTitle.val(),
    };

    if(formData.jobtitle) {
    $.ajax({
      type: "POST",
      url: "/",
      data: JSON.stringify(formData),
      success: function(data) {
        //console.log(JSON.stringify(data));
        theResult.html(JSON.stringify(data, null, '\t'));
      },
      contentType: "application/json",
      dataType: "json"
    });
  }
  });
})(jQuery); // jQuery is exported as $ and jQuery
