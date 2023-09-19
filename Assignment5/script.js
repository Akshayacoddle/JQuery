$(document).ready(function () {
    let k = 0;
    let total = 0;
    let item = 0;
    let id = 0;
    let arr = []
    let buttonId = ''
    let datas = 0
    let data;
    let eachItem;
    let limit = 3;
    let start = 0;

    $.getJSON("https://dummyjson.com/products", function (event) {
        data = event;
        eachItem = data.products;
        scrollTime(limit)
    })
    function DisplayItem(datas) {

        console.log(datas);
        let discount = 0;
        let disprice = 0;
        $('.container').append('<div class="item" id="' + datas['id'] + '">')
        $(`#${datas['id']}`).append('<div class="col1" id="col11' + datas['id'] + '">')
        $(`#col11${datas['id']}`).append(`<div class="row1" id='row1${datas['id']}'><img src="${datas['thumbnail']}" alt="image" title ="image"></div>`)
        $(`#col1${datas['id']}`).append('</div>')
        $(`#${datas['id']}`).append('<div class="col2"  id="col2' + datas['id'] + '">')
        $(`#col2${datas['id']}`).append(`<div class="title">${datas['title']}</div>`)
        $(`#col2${datas['id']}`).append('<div class="row2" id="row2' + datas['id'] + '">')
        $(`#row2${datas['id']}`).append(`<div class="row21"><img src="${datas['images'][0]}" alt=""></div>`)
        $(`#row2${datas['id']}`).append(`<div class="row21"><img src="${datas['images'][1]}" alt=""></div>`)
        $(`#row2${datas['id']}`).append(`<div class="row21"><img src="${datas['images'][2]}" alt=""></div>`)
        $(`#row2${datas['id']}`).append(`<div class="row21"><img src="${datas['images'][3]}" alt=""></div>`)
        $(`#col2${datas['id']}`).append('</div>')
        $(`#col2${datas['id']}`).append(`<div class="descr">${datas['description']}</div>`)
        $(`#col2${datas['id']}`).append(`<div class="brand">${datas['brand']}</div>`)
        $(`#col2${datas['id']}`).append('<div class="pd" id="pd' + datas['id'] + '">')
        $(`#pd${datas['id']}`).append(`<div class="price">Price :${datas['price']}</div>`)
        discount = (datas['price'] * datas['discountPercentage']) / 100;
        disprice = Math.round(datas['price'] - discount)
        $(`#pd${datas['id']}`).append(`<div class="discount">Discount Price:${disprice}</div>`)
        $(`#col2${datas['id']}`).append('</div>')
        $(`#col2${datas['id']}`).append('<div class="rs" id="rs' + datas['id'] + '">')
        $(`#rs${datas['id']}`).append(`<div class="rating">Rating :${datas['rating']}</div>`)
        $(`#rs${datas['id']}`).append(`<div class="stock">Stock :${datas['stock']}</div>`)
        $(`#col2${datas['id']}`).append('<button class="btn" id="btn' + datas['id'] + '">Add to Cart</button>')
        $(`#col2${datas['id']}`).append('</div>')
        $(`#${datas['id']}`).append('</div>')
        $('.container').append('</div>')

        ++id
        arr.push(datas['title'])
    }
    function scrollTime(limit) {
        for (let i = limit - 3; i < limit; i++) {
            datas = data.products[i]
            DisplayItem(datas)
        }
    }
    let pervious = 'category';
    $("#categorydrop").on("click", function (e) {
        $(window).unbind();
        $('.item').remove()
        let array = []
        if (pervious !== e.target.value) {
            for (let i = 0; i < data.products.length; i++) {
                productItem = data.products[i]
                let catg = productItem['category']
                if (catg === e.target.value) {
                    array.push(productItem)
                    let num = this;
                    console.log(productItem);
                    DisplayItem(productItem)

                    $('#' + (i + 1)).show();

                } else if (!((catg === e.target.value))) {
                    $('#' + (i + 1)).hide();

                }

            }
        }
    })
    $('#search').on('input', function (index) {
        $(window).unbind();
        $('.item').remove()
        if (!(search === '')) {
            let flag = 1;
            let searchval = $('#search').val().toLowerCase();
            for (let i = 0; i < data.products.length; i++) {
                flag++;
                console.log(index.target.value);
                productItem = data.products[i]
                let catg = productItem['title']
                console.log(catg);
                if (catg.toLowerCase().includes(searchval) === true) {
                    DisplayItem(productItem)
                }
            }
        }
        search += index.key;
    });
    $("#dropdownprice").on("change", function (e) {
        var sortDirection = $(this).val();
        var products = $('.item');
        console.log(data.products);
        if (sortDirection === 'High to Low') {
            products.sort(function (a, b) {
                var firstval = Number($(".price", a).text().slice(7));
                var secondval = Number($(".price", b).text().slice(7));
                return secondval - firstval;

            });
        } else if (sortDirection === 'Low to High') {

            products.sort(function (a, b) {
                var firstval = Number($(".price", a).text().slice(7));
                var secondval = Number($(".price", b).text().slice(7));
                return firstval - secondval;
            });

        }
        else if (sortDirection === 'Rating') {
            products.sort(function (a, b) {
                var firstval = parseFloat($(".rating", a).text().slice(8));
                var secondval = parseFloat($(".rating", b).text().slice(8))
                return secondval - firstval;
            });
        }

        $(".container").html(products);
    });
    let btnArray = [];
    $('.container').on('click', '.btn', function (event) {
        let i = 0;
        // console.log($(event.target).attr('id'));
        let btnid = $(event.target).attr('id')

        let current = $(event.target.parentElement);
        for (i = 0; i <= btnArray.length; i++) {
            if (btnArray[i] === btnid) {
                let cartitems = $(event.target.parentElement.parentElement.parentElement).find('.' + btnid);
                let cartitemsval = Number((cartitems.find('#' + btnid)).val()) + 1
                console.log(cartitems);
                cartitems.find('input').val(cartitemsval);
                i = 0;
                break

            }
        }
        if (i != 0) {
            k += 1;
            element = current.find('.title').text()
            buttonId = current.find('button').attr('id')
            $('.cart').after(`<div id ="cartitem${k}" class ="CartItem ${buttonId}"> `);
            $('#cartitem' + k).append('<div>' + element + '</div>');
            $('#cartitem' + k).append('<div class="quality"><button class="minus" id="min' + k + '" >-</button><input id=' + buttonId + ' class="value" type="number" value=' + 1 + '><button class="pluse" id="plu' + k + '">+</button></div>');
            $('#cartitem' + k).append('<div class="cartprice">' + current.find('.discount').text().slice(15) + '</div>');
            $('#cartitem' + k).append('</div>');
            btnArray.push(btnid)
        }
        priceid = Number(current.find('.discount').text().slice(15))
        total += priceid
        $('.amount').html(total)
    });
    $('.container').on('click', '.pluse', function (e) {
        let plusid = ($(this).siblings('input')).attr('id')
        let count = Number(($(this).siblings('input')).val())
        priceid = (Number(($(e.target.parentElement.parentElement).find('.cartprice')).text()));
        count += 1
        total += priceid
        $('#' + plusid).val(count);
        $('.amount').html(total)
    });
    $('.container').on('click', '.minus', function (e) {
        priceid = Number(($(e.target.parentElement.parentElement).find('.cartprice')).text())
        var countval = ($(this).siblings('input')).val()
        if (countval > 1) {
            let valueid = ($(this).siblings()).attr('id')
            countval -= 1
            $('#' + valueid).val(countval);
            total -= priceid
            $('.amount').html(total)

        } else {
            let valueid = ($(this).siblings()).attr('id')
            $('#' + valueid).val(countval);
            total -= priceid
            $('.amount').html(total)
            $(e.target.parentElement.parentElement).remove();
            console.log(btnArray);
            let removedCartItem = $(e.target.parentElement.parentElement).attr('class');
            let itemNum = removedCartItem.slice(9)
            for (let j = 0; j < btnArray.length; j++) {
                let element = btnArray[j]
                if (element.includes(itemNum)) {
                    btnArray.splice(btnArray.indexOf(element), 1)
                }
            }
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $('.container').height() - $(window).height()) {
            setTimeout(() => {
                limit += 3
                scrollTime(limit, start);
                console.log("Delayed for 1 second.");
            }, "500");

        }
    })
})

