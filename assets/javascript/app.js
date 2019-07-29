

//on click function so when buttons are clicked gifs show up 
var ButtonFunction = function () {
    $('button').on('click', function () {
        //
        var myGiphy = $(this).data("giphy");
        console.log(this);

        $('#gifsDisplay').empty();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + myGiphy + "&api_key=4oXRtl5CmpcDy4GbORHP5OmJZfTqmZRO&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            //loop through the gifs available
            for (var i = 0; i < response.data.length; i++) {
                //create a var for a div which the giphys will be displayed in 
                var giphyDiv = $('<div class="giphyDisplay">');
                //create a var for a paragraph tag which the rating will be displayed in 
                var rating = $('<p class="text-info">').text("Rating: " + response.data[i].rating);
                //create a var for an image tag which the giphy image will be displayed in
                var giphyImage = $('<img class="actualGif">');
                //set the attribute for my giphy image source, data-state, data-still, data-animate
                giphyImage.attr('src', response.data[i].images.fixed_height_still.url);
                giphyImage.attr('data-still', response.data[i].images.fixed_height_still.url);
                giphyImage.attr('data-animate', response.data[i].images.fixed_height.url);
                giphyImage.attr('data-state', 'still');
                //call the image tag and attach it to the giphyDiv
                giphyDiv.html(giphyImage);
                //call the rating and have it append to the bottom of the  giphyDiv
                giphyDiv.append(rating);
                //call the giphyDiv I set up in the last two and append it to the area I specified in my HTML
                $('#gifsDisplay').append(giphyDiv);

            }
            //call the animateFunction after gifs have loaded to the page
            animateFunction();
        })
    })
}




//animate gif function
animateFunction = function () {
    //on-click function to animate the photo
    $('.actualGif').on('click', function () {

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
};



$(document).ready(function () {
    ButtonFunction();

    //on-click event to take in user text
    $('#addGiphy').on('click', function (event) {
        event.preventDefault();
        var smileItem = $('#makeSmiles').val().trim();

        newSmileButton = '<button data-giphy="' + smileItem + '" class="btn btn-primary">' + smileItem + '</button>'

        $('#giphyButtons').append(newSmileButton)

        ButtonFunction();
    })


})


