$(document).ready(function () {
    let id = 0;
    let total = 0;
    let search = ''
    const arr = ['beefbiriyani', 'beefshavarma', 'biriyani', 'Choclatecake', 'dosa', 'hyderabadbiriyani', 'icecream', 'juice', 'pizza', 'shavarma']
    $('#search').on('keydown', function (event) {
        search += event.key;
        if (!(search === '')) {
            let searchval = $('#search').val();
            arr.forEach(element => {
                if (element.toLowerCase().includes(searchval) === false) {
                    $('#' + element).parent().hide();
                } else {
                    // console.log($('#search').val())
                    $('#' + element).parent().show();
                }
            });
        }
    });
    $('aside').show();
    $('.fa-shopping-cart').on('click', function () {
        $('aside').toggle();
    })
    $('.btn').one('click', function (event) {
        let cartArray = [];
        let current = $(event.target.parentElement);
        id += 1;
        element = current.find('h2').text()
        $('.cart').after('<div id ="cartitem' + id + '" class ="CartItem"> ');
        $('#cartitem' + id).append('<div>' + element + '</div>');
        $('#cartitem' + id).append('<div class="quality"><button class="minus" id="min' + id + '" >-</button><input id="val' + id + '" class="value" type="number" value= 1><button class="pluse" id="plu' + id + '">+</button></div>');
        $('#cartitem' + id).append('<div>' + current.find('.price').text() + '</div>');
        $('#cartitem' + id).append('</div>');
        let count = 1;
        let priceid = Number(($(this).siblings('.price')).text().slice(1))

        total += priceid
        $('.amount').html(total)
        $(`#plu${id}`).on('click', function (e) {
            let plusid = ($(this).siblings('input')).attr('id')
            console.log(($(this).siblings('input')).attr('id'));
            let price = event.target.parentElement.parentElement
            let count = Number(($(this).siblings('input')).val())
            count += 1
            let num = ($(price).text().slice(-3))
            let totalprice = Number(num.trim()) * count
            let cartid = $(price).attr('id')
            total += priceid
            $('#' + plusid).val(count);
            $('.amount').html(total)
        });
        $(`#min${id}`).on('click', function (e) {
            var countval = ($(this).siblings('input')).val()
            console.log($(this).siblings('input'));
            if (countval > 1) {
                let valueid = ($(this).siblings()).attr('id')
                let count = ($(this).siblings()).val()
                countval -= 1
                $('#' + valueid).val(countval);
                total -= priceid
                $('.amount').html(total)

            } else {
                let price = event.target.parentElement.parentElement
                let cartid = $(price).attr('id')
                let valueid = ($(this).siblings()).attr('id')
                console.log(($("#" + cartid + " div:last-child").text()).slice(2));

                $('#' + valueid).val(countval);
                total -= priceid
                $('.amount').html(total)
                console.log(e.target.parentElement.parentElement);
                $(e.target.parentElement.parentElement).hide();
            }

        });
    });

});