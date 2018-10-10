/* character counter */

// console.log('this is a test');

$(document).ready(function () {

    let tweetText = document.querySelector(".new-tweet textarea");

    $(tweetText).on("keyup", function (event) {
        const inputText = $(this).val();
        // return inputText.length;
        // console.log(inputText.length);
        const charCount = inputText.length;
        const maxChar = 140;
        const counter = maxChar - charCount;
        console.log(counter);

        if(counter >= 0) {
             
        } else {

        }

        //     if (charCount <= 140) {
        //         console.log(charCount)
        //         // return charCount;
        //     }
        // } else {
        //     console.log(maxChar - charCount)
        //     // return charCount - 140;
        // }


    });

    //$("span.counter")





});

// tweet-text