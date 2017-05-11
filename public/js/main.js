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
    
    function nextM(){
        $.ajax({
            url: "http://localhost:3000/matches/next",
            type: "POST",
            data: {nextM: 'yes'},
            success: function(returned) {
                console.log(returned);
            },
            error: function(){
                
            }
        });
    }
    
    function prevM(){
        $.ajax({
           url: "http://localhost:3000/matches/prev",
            type: "POST",
            data: {prevM: 'yes'},
            success: function(returned) {
                console.log(returned);
            },
            error: function(){
                
            }
        });
    }
    
})();