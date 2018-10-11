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
            alert('TOO MANY CHARACTERS!'); //TODO: the alert keeps popping up as it's being deleted.
            $("#submitTweet").attr("disabled", true);
        } else {
            $(".counter").removeClass("counter-negative")
            $("#submitTweet").attr("disabled", false);
        }
    });

});