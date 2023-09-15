$(document).ready(function () {
  $('aside').hide();
  $('.fa-shopping-cart').on('click', function () {
    $('aside').toggle();
  })
  let item = 1;
  let id = 0;
  let k = 0;
  let total = 0;
  let search = ''
  const arr = []
  let limit = 3;
  let start = 0;
  if (id == 0) {
    LoadProduct(limit, start)
  }
  function LoadProduct(start, limit) {
    $.ajax({
      url: "https://dummyjson.com/products",
      method: 'GET',
      success: function (data) {
        $.each(data.products, function (e) {

          if (item <= start && id < 30) {
            let datas = data.products[id];
            console.log(datas['title'])
            item++;
            let discount = 0;
            let disprice = 0;
            $('.container').append('<div class="item" id="' + id + '">')
            $(`#${id}`).append('<div class="col1" id="col11' + id + '">')
            $(`#col11${id}`).append(`<div class="row1" id='row1${id}'><img src="${datas['thumbnail']}" alt="image" title ="image"></div>`)
            $(`#col1${id}`).append('</div>')
            $(`#${id}`).append('<div class="col2"  id="col2' + id + '">')
            $(`#col2${id}`).append(`<div class="title">${datas['title']}</div>`)
            $(`#col2${id}`).append('<div class="row2" id="row2' + id + '">')
            $(`#row2${id}`).append(`<div class="row21"><img src="${datas['images'][0]}" alt=""></div>`)
            $(`#row2${id}`).append(`<div class="row21"><img src="${datas['images'][1]}" alt=""></div>`)
            $(`#row2${id}`).append(`<div class="row21"><img src="${datas['images'][2]}" alt=""></div>`)
            $(`#row2${id}`).append(`<div class="row21"><img src="${datas['images'][3]}" alt=""></div>`)
            $(`#col2${id}`).append('</div>')
            $(`#col2${id}`).append(`<div class="descr">${datas['description']}</div>`)
            $(`#col2${id}`).append(`<div class="brand">${datas['brand']}</div>`)
            $(`#col2${id}`).append('<div class="pd" id="pd' + id + '">')
            $(`#pd${id}`).append(`<div class="price">Price :${datas['price']}</div>`)
            discount = (datas['price'] * datas['discountPercentage']) / 100;
            disprice = Math.round(datas['price'] - discount)
            $(`#pd${id}`).append(`<div class="discount">Discount Price:${disprice}</div>`)
            $(`#col2${id}`).append('</div>')
            $(`#col2${id}`).append('<div class="rs" id="rs' + id + '">')
            $(`#rs${id}`).append(`<div class="rating">Rating :${datas['rating']}</div>`)
            $(`#rs${id}`).append(`<div class="stock">Stock :${datas['stock']}</div>`)
            $(`#col2${id}`).append('<button class="btn" id="btn' + id + '">Add to Cart</button>')
            $(`#col2${id}`).append('</div>')
            $(`#${id}`).append('</div>')
            $('.container').append('</div>')
            ++id
            arr.push(datas['title'])

          }

        })

        $("#dropdownprice").on("change", function (e) {
          var sortDirection = $(this).val();
          var products = $('.item');
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

          } else if (sortDirection === 'Rating') {
            products.sort(function (a, b) {
              var firstval = parseFloat($(".rating", a).text().slice(8));
              var secondval = parseFloat($(".rating", b).text().slice(8))
              return secondval - firstval;
            });
          }

          $(".container").html(products);
        });
        $("#categorydrop").on("click", function (e) {
          $.each(data.products, function (event) {
            if (this['category'] === e.target.value) {
              console.log($('#' + event));
              $('#' + event).show();
            } else if (e.target.value === 'Category') {
              $('.item').show()
            }
            else {
              $('#' + event).hide();
            }
          })
        })
      }
    });
  }
  $('.container').on('click', '.btn', function (event) {
    console.log($(event.target).attr('id'));
    let current = $(event.target.parentElement);
    k += 1;
    element = current.find('.title').text()
    $('.cart').after('<div id ="cartitem' + k + '" class ="CartItem"> ');
    $('#cartitem' + k).append('<div>' + element + '</div>');
    $('#cartitem' + k).append('<div class="quality"><button class="minus" id="min' + k + '" >-</button><input id="val' + k + '" class="value" type="number" value= 1><button class="pluse" id="plu' + k + '">+</button></div>');
    $('#cartitem' + k).append('<div class="cartprice">' + current.find('.discount').text().slice(15) + '</div>');
    $('#cartitem' + k).append('</div>');
    $(this).prop('disabled', true)
    console.log(Number(current.find('.discount').text().slice(15)));
    let priceid = Number(current.find('.discount').text().slice(15))
    total += priceid
    $('.amount').html(total)
    $(`#plu${k}`).on('click', function (e) {
      let plusid = ($(this).siblings('input')).attr('id')
      let count = Number(($(this).siblings('input')).val())
      count += 1
      total += priceid
      $('#' + plusid).val(count);
      $('.amount').html(total)
    });
    $(`#min${k}`).on('click', function (e) {
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
        $(e.target.parentElement.parentElement).hide();
      }

    });
  });
  $('#search').on('input', function (event) {
    console.log(arr);
    search += event.key;
    let searchval = $('#search').val().toLowerCase();

    if (!(search === '')) {
      console.log(searchval);
      let flag = 1;
      arr.forEach(element => {
        console.log(element);
        flag++;
        if (element.toLowerCase().includes(searchval) === false) {
          var index = arr.indexOf(element);
          console.log(index);
          $('#' + index).hide()
        }
        else if (element.toLowerCase().includes(searchval) === true) {
          var index = arr.indexOf(element);
          console.log(index);
          $('#' + index).show()
        }
      });
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() >= $('.container').height() - $(window).height()) {
      limit += 3
      start += limit;
      setTimeout(() => {
        LoadProduct(limit, start);
        console.log("Delayed for 1 second.");
      }, "1000");

    }
  })
})
