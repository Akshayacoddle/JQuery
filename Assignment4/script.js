$(document).ready(function () {
    let id = 0;
    let total = 0;
    let search = ''
    const arr = ['beefbiriyani', 'beefshavarma', 'biriyani', 'Choclatecake', 'dosa', 'hyderabadbiriyani', 'icecream', 'freshjuice', 'pizza', 'shavarma']
    $('#search').on('input', function (event) {
        search += event.key;
        let searchval = $('#search').val().toLowerCase();
        if (!(search === '')) {
            arr.forEach(element => {
                if (element.toLowerCase().includes(searchval) === false) {
                    $('#' + element).parent().hide();
                } else {
                    $('#' + element).parent().show();
                }
            });
        }
    });
    $('aside').hide();
    $('.fa-shopping-cart').on('click', function () {
        $('aside').toggle();
    })
    $('.btn').one('click', function (event) {
        let current = $(event.target.parentElement);
        id += 1;
        element = current.find('h2').text()
        $('.cart').after('<div id ="cartitem' + id + '" class ="CartItem"> ');
        $('#cartitem' + id).append('<div>' + element + '</div>');
        $('#cartitem' + id).append('<div class="quality"><button class="minus" id="min' + id + '" >-</button><input id="val' + id + '" class="value" type="number" value= 1><button class="pluse" id="plu' + id + '">+</button></div>');
        $('#cartitem' + id).append('<div>' + current.find('.price').text() + '</div>');
        $('#cartitem' + id).append('</div>');
        let priceid = Number(($(this).siblings('.price')).text().slice(1))
        total += priceid
        $('.amount').html(total)
        $(`#plu${id}`).on('click', function (e) {
            let plusid = ($(this).siblings('input')).attr('id')
            let count = Number(($(this).siblings('input')).val())
            count += 1
            total += priceid
            $('#' + plusid).val(count);
            $('.amount').html(total)
        });
        $(`#min${id}`).on('click', function (e) {
            var countval = ($(this).siblings('input')).val()
            console.log($(this).siblings('input'));
            if (countval > 1) {
                let valueid = ($(this).siblings()).attr('id')
                countval -= 1
                $('#' + valueid).val(countval);
                total -= priceid
                $('.amount').html(total)

            } else {
                let price = event.target.parentElement.parentElement
                let valueid = ($(this).siblings()).attr('id')
                $('#' + valueid).val(countval);
                total -= priceid
                $('.amount').html(total)
                $(e.target.parentElement.parentElement).hide();
            }

        });
    });

});