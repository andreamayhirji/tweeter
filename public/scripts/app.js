/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* hard-coded user data */
$(document).ready(function () {
    
    const newTweetData = {

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
    }

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
    
    //this function has a side effect
    function renderTweetToPage($tweet) {
        //find appropriate spot to add tweet.
        //add tweet there.
        $("#tweets").prepend($tweet);   
    }
    
    
    var $newTweet = createTweetElement(newTweetData);
    
    renderTweetToPage($newTweet);



    //*DONT FORGET
    // Test / driver code (temporary)
    //console.log($tweet); // to see what it looks like
    //$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


});