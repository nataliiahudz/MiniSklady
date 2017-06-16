
$(document).ready(function() {

		
    // $('a.scrollto').click(function(e) {
    //     e.preventDefault();
    //     var sectId = $(this).attr('href');
    //     $('html, body').animate({
    //         scrollTop: $(sectId).offset().top
    //     }, 700);
    // }); 


    $('a.scrollto').bind('click.smoothscroll',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });




    $('.modal_open').click(function(){
        var form=$(this).data('form');
        if (form=='otrymSklad'){
            $('.modal_head').html("ОТРИМАТИ СКЛАД")
            $('.modal_write').html("Залишіть свої контакти, щоб отримати склад")
            $('.modal_submit').val("Отримати склад");
        }
        if (form=='orendaKomirky'){
            $('.modal_head').html("ОРЕНДУВАТИ КОМІРКУ")
            $('.modal_write').html("Залишіть свої контакти, щоб орендувати комірку")
            $('.modal_submit').val("Орендувати комірку");
        }
        if (form=='bron'){
            $('.modal_head').html("ЗАБРОНЮВАТИ ВЖЕ")
            $('.modal_write').html("Залишіть свої контакти, щоб забронювати склад за акційною ціною")
            $('.modal_submit').val("Забронювати вже");
        }
        if (form=='otrymZnyzku'){
            $('.modal_head').html("ОТРИМАТИ ЗНИЖКУ")
            $('.modal_write').html("Залишіть свої контакти, щоб отримати знижку")
            $('.modal_submit').val("Отримати знижку");
        }
        if (form=='kontakty'){
            $('.modal_head').html("ЗАЛИШИТИ КОНТАКТИ")
            $('.modal_write').html("Залишіть свої контакти і наш менеджер з Вами зв'яжеться")
            $('.modal_submit').val("Отримати склад");
        }
        $('.modalWindow').show();
    });

    $('.modal_close').click(function(){
        $('.modalWindow').hide();
    })


    var msgSuccess = '<h3>Дякуємо!</h3><p>Ваш запит відправлено!</p>';
    var msgError = '<h3>Помилка!</h3> Проблеми з відправкою!<p>Скористайтесь іншими способами зв\'язку!</p>';
    var msgMissing = '<h3>Помилка!</h3><p>Не всі обовязкові поля заповнено!</p>';

    $('form.ajf').on('submit', function(e) {
    e.preventDefault();
    var infomsg = $('.info-message');

    var name = $(this).find('#name').val();
    var phone = $(this).find('#phone').val();
    var message = $(this).find('#message').val();
    var type = $(this).find('input[type="submit"]').val();


    if(phone == '') {
        infomsg.addClass('er').html(msgMissing);
        setTimeout (function() {
            infomsg.removeClass('er');
        }, 1500);
    } else {
        $.ajax({
            type:'POST',
            url: '/modules/ord/sender.php?c=ajax',
            data: { name: name, phone: phone, type: type, message: message },
            dataType: "json",
            beforeSend: function(jqXHR, settings) {         
                    $('.modal').css({ "opacity": "0.3" });
                },
            success: function (response) {
                $('.modal').css({ "opacity": "1" });
                if (response.status == 'error') {
                     infomsg.addClass('er').html(msgError);
                     console.log(response);
                     setTimeout (function() {
                        infomsg.removeClass('er').html('');
                     }, 1500);
                } else if (response.status == 'success') {
                    infomsg.addClass('ok').html(msgSuccess);
                    console.log(response);
                    setTimeout (function() {
                        infomsg.removeClass('ok').html('');
                    }, 1500);
                    $('.modal').hide();
                }           
            },
            error: function (response) {
                $('.modal').css({ "opacity": "1" });
                infomsg.addClass('er').html(msgError);
                console.log(response);
                setTimeout (function() {
                    infomsg.removeClass('er').html('');
                }, 1500);
            }
        });
    }
});


    
});