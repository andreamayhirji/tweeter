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
console.log('HEY IM THE CHAR COUNT!',charCount);
        if (totalChar <= 0) {
            $(".counter").addClass("counter-negative")
        } else {
            $(".counter").removeClass("counter-negative")
        }
    });

});