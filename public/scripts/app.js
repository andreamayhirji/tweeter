/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* hard-coded user data */
$(document).ready(function () {
    // Take object of tweet data
    // Returns a jquery DOM element "$tweetContainer".
    // This function has a return.
    function createTweetElement(tweetData) {

        //     <article class="tweet">
        //     <header>
        //       <img class="profile" src="/images/Andrea.jpg">
        //       <h3 class="fullName">Andrea Hirji</h3>
        //       <span class="handle">@LaBonneChat</span>
        //     </header>
        //     <section class="tweet-content">
        //       <p>Sample tweet post goes here.</p>
        //     </section>
        //     <footer>
        //       <span class="time-stamp">10 days ago</span>
        //     </footer>
        //   </article>

        // define the variable for each element tag within the section, 
        // then bundle them together into their parent, then bundle the
        // parents into the grandparents

        //profile
        let $profileContent = $("<header>")
        let $profileImg = $("<img>").attr("src", tweetData.user.avatars.regular).addClass("profile");
        let $handle = $("<span>").text(tweetData.user.handle).addClass("handle");
        let $fullName = $("<h3>").text(tweetData.user.name).addClass("fullName");

        $profileContent.append($profileImg, $handle, $fullName);

        //the tweet data
        let $tweetContent = $("<section>").addClass("tweet-content");
        let $tweetText = $("<p>").text(tweetData.content.text);

        $tweetContent.append($tweetText);

        //the footer data
        let $footerContent = $("<footer>");
        let $timeStamp = $("<span>").text(moment(tweetData.created_at).startOf('minute').fromNow()).addClass("time-stamp");

        $footerContent.append($timeStamp);

        //
        let $tweetContainer = $("<article>").addClass("tweet");

        $tweetContainer.append($profileContent, $tweetContent, $footerContent);
  


        return $tweetContainer;
    }

    // take DOM element and render to the DOM, above existing content.
    // this function has a side effect
    function renderTweetToPage(tweets) {
        tweets.forEach(function (tweet) {
            $("#tweets").prepend(createTweetElement(tweet));
        });
    }

    //AJAX POST request

    $('#tweetform').on('submit', function (event) {
        event.preventDefault();
        // console.log("we submitted the form")
        var data = $('#tweetform').serialize();
        if ($("#text-input").val() === "") {
            $("#new-tweet").find('#empty-error').slideDown();
            //alert('Your string is empty');  //Change 
        }

        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: data,
            success: function (result) {
                $('#tweets').prepend(data); //pops the new tweet to the top, above previous '#tweets'
                $('#text-input').val(""); //clears the text area 
                $('.counter').text(140); //resets the counter to 140
                loadTweets();
            },
            //TODO: make alert message NOT a pop up.
            // error: function (err) {
            //     // if (('#textInput').val === null {
            //     //     alert('You cannot submit an empty message');
            //     // }
            // }
        })
    });

    function loadTweets() {
        $.get("/tweets", function (tweets) {
            $("#tweets").empty();
            renderTweetToPage(tweets);
        });
    }
    loadTweets();

    // Slide effect on the #tweetform when .compose-button is clicked
    $('#compose-button').click(function () {
        $('#new-tweet').slideToggle("slow"); // toggles the new-tweet off and on
        $('#text-input').focus().select(); // auto-selects the text area
    });

     

});

