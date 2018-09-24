$(document).ready(function() {

  //set up a tv shows array to display at the start of the page

  var topics = ["NewsRadio", "Seinfeld", "Everybody Loves Raymond", "The Office", "Friends", "Mama's Family", "In Living Color", "Curb Your Enthusiasm", "Roseanne"];

  //GET attributes and display content by using Giphy API and JSON through a function 

  function displayInfo() {
      var show = $(this).attr("tvshow-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=JFdCPg2FwsteVhDbA9vZyYEf2m7DISkV&limit=9";

      //AJAX is used to retrieve information on the button that is clicked

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response) {

          // tvShows is set to empty so that a new selection can append to empty div

          $("#show").empty();

          var results = response.data;

          //for loop is added to grab the rating information from GIPHY and assigned a gif for that specific button

          for (var i = 0; i < results.length; i++) {
              var showDiv = $("<div class='userShow'>");

              //variable is created for rating 

              var rating = results[i].rating;
              var pRate = $("<p>").text("Rating: " + rating);

              //make variables for still and animated url

              var urlStill = results[i].images.fixed_height_still.url;
              var urlPlay = results[i].images.fixed_height.url;

              //gif needs still source to load and data attributes to store the still and animated gifs for pausing function

              var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

              //append the gif and rating to the new div created during for loop

              showDiv.append(gif);
              showDiv.append(pRate);

              //append all for loop created divs to the DOM

              $("#show").append(showDiv);
          }

          //on click of the still gif image, gif will play. It will pause when clicked again.

          $(".gif").on("click", function() {
              var state = $(this).attr("data-state");

              if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
              } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
              }

          });
      });

  }

  //function to create buttons out of array indexes

  function renderButtons() {

      //deletes original array of buttons everytime rendered

      $("#tvshowButtons").empty();

      //loop through array

      for (var i = 0; i < topics.length; i++) {

          var tvshowRender = $("<button>");

          //add class and attribute of name so display function knows what to GET

          tvshowRender.addClass("show");
          tvshowRender.attr("tvshow-name", topics[i]);
          tvshowRender.text(topics[i]);
          $("#tvshowButtons").append(tvshowRender);
      }
  }

  // this on click event will add sport buttons when button is clicked

  $("#addShow").on("click", function(event) {
      event.preventDefault();
      var show = $("#tvshow-input").val().trim();

      //push input to original topics array and then rerun render of buttons to show newly added button
      topics.push(show);
          $("#tvshow-input").val(" ");
      renderButtons();
  });


  //on click entire document to cover all elements named "show" and run display function
  $(document).on("click", ".show", displayInfo);

  //run function to display all buttons on startup
  renderButtons();

});
