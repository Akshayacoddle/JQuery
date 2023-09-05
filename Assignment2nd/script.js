$(document).ready(function () {

    const images = ['images/book1.jpg', 'images/book2.jpg', 'images/book3.jpg', 'images/book4.jpg', 'images/book5.jpg'];

    $(".container").attr("data-interval", "100");
    $("#radio1").click(function () {
        $("img").attr("src", 'images/book1.jpg')
    })
    $("#radio2").click(function () {
        $("img").attr("src", 'images/book2.jpg')
    })
    $("#radio3").click(function () {
        $("img").attr("src", 'images/book3.jpg')
    })
    $("#radio4").click(function () {
        $("img").attr("src", 'images/book4.jpg')
    })
    $("#radio5").click(function () {
        $("img").attr("src", 'images/book5.jpg')
    })
    var myVar = setInterval(myTimer, 2000);
    let count = 0;
    function myTimer() {
        count += 1
        if (count <= 5) {
            $("#radio" + count).prop('checked', true)
            $("img").attr("src", 'images/book' + count + '.jpg');
        }
        else {
            $('input[type = "radio"]').prop('checked', false)
            count = 0;
        }

    }



});