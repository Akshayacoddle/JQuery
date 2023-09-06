$(document).ready(function () {
    let count2 = 0;
    let count = 0;
    $('<button id="head" class="btn-styled" type="button">Clik to view heading</button>').appendTo('body');
    $("#head").on('click', function () {
        count += 1;
        if (count === 1) {
            $('<h1>Welcome to JQuery</h1>').appendTo('body');
        } else if (count === 2) {
            $('<img id="js" src="images/javascript.jpg" alt="image">').appendTo('body')
            $('<button id="img-btn" class="btn-styled" type="button">Clik to change</button>').appendTo('body');
            $('#img-btn').on('click', function () {
                if (count2 % 2 == 0) {
                    $('#js').attr("src", "images/jquery.jpg")
                    count2 += 1;
                } else if (count2 % 2 != 0) {
                    $('#js').attr("src", "images/javascript.jpg")
                    count2 += 1;
                }
            })
        }
    })
});