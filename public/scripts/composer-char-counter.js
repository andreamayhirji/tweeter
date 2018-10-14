/* character counter */


$(document).ready(function () {

    let tweetText = document.querySelector(".new-tweet textarea");
    const maxChar = 140;

    $(tweetText).on("input", function (event) {
        const inputText = $(this).val();
        const charCount = inputText.length;
        const totalChar = maxChar - charCount;
        $(".counter").text(totalChar);

        //if character count is over 140 characters (lower than 0, since we are counting down)
        if (totalChar <= 0) {
            $(".counter").addClass("counter-negative") //turns counter red
            $("#new-tweet").find('#max-error').slideDown(); //max-error message appears
            $("#submitTweet").attr("disabled", true); //disable the tweet button
        } else {
            $(".counter").removeClass("counter-negative"); //turns counter back to normal
            $("#submitTweet").attr("disabled", false); //enables the tweet button
            $("#new-tweet").find('#max-error').slideUp(); //max-error message deisappears
            $("#new-tweet").find('#empty-error').slideUp(); //empty-error message disappers
        }
    });

});