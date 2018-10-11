/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* hard-coded user data */
$(document).ready(function () {





    const newTweetData = [{
            "user": {
                "name": "Newton",
                "avatars": {
                    "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                    "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                    "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
                },
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": {
                    "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                    "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                    "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
                },
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        },
        {
            "user": {
                "name": "Johann von Goethe",
                "avatars": {
                    "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                    "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                    "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
                },
                "handle": "@johann49"
            },
            "content": {
                "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
            },
            "created_at": 1461113796368
        }
    ];

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
        let $timeStamp = $("<span>").text(tweetData.created_at).addClass("time-stamp");

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

    renderTweetToPage(newTweetData);



    //AJAX POST request

    //$submit is the variable in place of the specific id of the button


    $('#tweetform').on('submit', function (event) {
        event.preventDefault();
        // console.log("we submitted the form")
        var data = $('#tweetform').serialize();
        // console.log(data);

        //TODO: once text has been submitted, clear the form of text.

        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: data,
            success: function (result) {
                $('#tweets').prepend(data); //pops the new tweet to the top, above previous '#tweets'
                $('#textInput').val(""); //clears the text area 
                $('.counter').text(140); //resets the counter to 140
                loadTweets();
            },
            error: function (err) {}
        })
    });

    function loadTweets() {
        $.get("/tweets", function (tweets) {
            $("#tweets").empty();
            renderTweetToPage(tweets);
        });
    }

    // Slide effect on the #tweetform when .compose-button is clicked
    $('#compose-button').click(function () {
        $('#new-tweet').slideToggle("slow"); // toggles the new-tweet off and on
        $('#text-input').focus().select(); // auto-selects the text area
    });

});