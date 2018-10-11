/* character counter */

// console.log('this is a test');

$(document).ready(function () {

    let tweetText = document.querySelector(".new-tweet textarea");
    const maxChar = 140;

    $(tweetText).on("input", function (event) {
        const inputText = $(this).val();
        const charCount = inputText.length;
        const totalChar = maxChar - charCount;
        $(".counter").text(totalChar);
        if (totalChar <= 0) {
            $(".counter").addClass("counter-negative")
            $("#new-tweet").find('.error').slideDown();
            $("#submitTweet").attr("disabled", true);
        } else {
            $(".counter").removeClass("counter-negative");
            $("#submitTweet").attr("disabled", false);
            $("#new-tweet").find('.error').slideUp();
        }
    });

});