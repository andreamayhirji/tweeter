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


        // sample HTML DOM structure to display tweet.
        // <article class="tweet">
        //   <header>
        //     <img class="profile" src="/images/Andrea.jpg">
        //     <h3 class="fullName">Andrea Hirji</h3>
        //     <span class="handle">@LaBonneChat</span>
        //   </header>
        //   <section class="tweet-content">
        //     <p>Sample tweet post goes here.</p>
        //   </section>
        //   <footer>
        //     <span class="time-stamp">10 days ago</span>
        //       <img class="icon" src="images/flag.svg">
        //       <img class="icon" src="images/comment.svg">
        //       <img class="icon" src="images/heart.svg">
        //   </footer>
        // </article>

        // define the variable for each element tag within the section, 
        // then bundle them together into their parent, then bundle the
        // parents into the grandparents

        //the profile data
        let $profileContent = $("<header>")
        let $profileImg = $("<img>").attr("src", tweetData.user.avatars.regular).addClass("profile");
        let $handle = $("<span>").text(tweetData.user.handle).addClass("handle");
        let $fullName = $("<h3>").text(tweetData.user.name).addClass("fullName");
        //compiling the profile 
        $profileContent.append($profileImg, $handle, $fullName);

        //the tweet data
        let $tweetContent = $("<section>").addClass("tweet-content");
        let $tweetText = $("<p>").text(tweetData.content.text);
        //compiling the tweet
        $tweetContent.append($tweetText);

        //the footer data
        let $footerContent = $("<footer>");
        let $timeStamp = $("<span>").text(moment(tweetData.created_at).startOf('minute').fromNow()).addClass("time-stamp");
        let $icon1 = $("<img>").attr("src", "images/flag.svg" ).addClass("icon");
        let $icon2 = $("<img>").attr("src", "images/comment.svg" ).addClass("icon");
        let $icon3 = $("<img>").attr("src", "images/heart.svg" ).addClass("icon");

        //compiling the footer
        $footerContent.append($timeStamp, $icon1, $icon2, $icon3);
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
        var data = $('#tweetform').serialize();
        if ($("#text-input").val() === "") {
            $("#new-tweet").find('#empty-error').slideDown();
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