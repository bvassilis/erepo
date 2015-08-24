/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(".navbar-toggle").click(function() {
    $(".navbar-toggle i").toggleClass("fa-bars");
    $(".navbar-toggle i").toggleClass("fa-times");
});

// delivery or pickup radio
$(function(){
    $('.search .options .deliver a').on('click', function(){
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#'+tog).prop('value', sel);
        
        $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    });
});


// rotate background homepage css images
$(function(){
    function changeBackgoundImg(count) {
        $('header.intro.home').css({'background-image':'url(./img/HP_' + count + '_food_1920x800.jpg)'});
    }
    var j = (new Date().getTime() % 4) + 1;
    changeBackgoundImg(j);
    setInterval(function(){
        j++;
        if(j>4) {
            j=1;
        }
        changeBackgoundImg(j);
    }, 800000);
});

// rotate background restaurant css images
$(function(){
    function changeBackgoundImg(count) {
        $('header.intro.restaurants').css({'background-image':'url(./img/HP_' + count + '_rest.jpg)'});
    }
    var j = (new Date().getTime() % 4) + 1;
    changeBackgoundImg(j);
    setInterval(function(){
        j++;
        if(j>4) {
            j=1;
        }
        changeBackgoundImg(j);
    }, 800000);
});