$( document ).ready(function() {
  
  //set up tv shows array to show at the start of the page
  
  var topics = ["NewsRadio", "Seinfeld", "King of Queens", "The Office", "MadTv", "Frasier", "Saturday Night Live", "The Big Bang Theory", "Roseanne"];

  //GET attributes and display content by using Giphy API and JSON through a function 

  function displayInfo() {
    var show = $(this).attr("show-name");
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    //use AJAX to GET information on tv show button clicked

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //empty tv shows div so new selection appends to empty div - do not want any previous searches listed

      $("#tvshows").empty();

      var results = response.data;

      //for loop is added to grab the rating information from Giphy and assigned gif for button clicked into its own div to keep information together

      for (var i = 0; i < results.length; i++) {
        var tvShowDiv = $("<div class='userTvShow'>");

        //variable is created for rating 
        
        var rating = results[i].rating;
        var pRate = $("<p>").text("Rating: " + rating);

        //make variables for still url and animated url for clean build

        var urlStill = results[i].images.fixed_height_still.url;
        var urlPlay = results[i].images.fixed_height.url;

        //gif needs still source to load and data attributes to store the still and animated gifs for pausing function

        var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

        //append the gif and rating to the new div created during for loop

        tvShowDiv.append(gif);
        tvShowDiv.append(pRate);

        //append all for loop created divs to the DOM

        $("#tvshows").append(tvShowDiv);
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
  
  //create buttons out of array indexes - gets information from JSON

  function renderButtons() {

    //delete original array of buttons everytime renders so they do not keep repeating

    $("#tvshowButtons").empty();

    //loop through array

    for (var i = 0; i < topics.length; i++) {

      var tvShowRender = $("<button>");

      //add class and attribute of name so display function knows what to GET

      tvShowRender.addClass("show");
      tvShowRender.attr("show-name", topics[i]);
      tvShowRender.text(topics[i]);
      $("#tvshowButtons").append(tvShowRender);
    }
  }

  //on click event to add an additional tv show button when submitted - push input to array.

  $("#addTvShow").on("click", function(event){
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

