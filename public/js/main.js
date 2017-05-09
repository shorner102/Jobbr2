(function () {
  
    function like(){
        $.ajax({
            url: "http://localhost:3000/swipe/like",
            type: "POST",
            data: {like: 'yes'}, //send this to server
            success: function(returned) {
                 console.log(returned); // here can get the return of route
            },
            error: function() {

            }
        });
    }

    function dislike(){
        $.ajax({
            url: "http://localhost:3000/swipe/dislike",
            type: "POST",
            data: {dislike: 'yes'}, //send this to server
            success: function(returned) {
                 console.log(returned); // here can get the return of route
            },
            error: function() {

            }
        });
    }
    
})();