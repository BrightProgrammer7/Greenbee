$(document).ready(function() {
    initWorkCarousel();
    initSlideInMenu();
    initUnderline();
    initForm();
    initMenu();
    initSmooth();
    initLazyLoad();
    // initFadeClass();

    // function initFadeClass() {
    //     var imgSrc = $('.case_study_look_feel img');
    //     if(imgSrc.length){
    //         imgSrc.addClass('fade_in');
    //     }
    // }

    function initWorkCarousel() {
        $('.work_carousel_ca').owlCarousel({
            loop:true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            autoplayTimeout:9000,
            // nav:true,
            // dots: true,
            smartSpeed: 1200,
            items: 1,
            onInitialized: startProgressBar,
            onTranslate: resetProgressBar,
            onTranslated: startProgressBar

            
              
            
        });

        var prev= $('.carousel_nav_controls.carousel_nav_left');
        var next = $('.carousel_nav_controls.carousel_nav_right')

        prev.on('click', function() {
            $('.work_carousel_ca').trigger('prev.owl.carousel')
        });

        next.click(function() {
            $('.work_carousel_ca').trigger('next.owl.carousel')
        });


    }

    function startProgressBar() {
        // apply keyframe animation
        $(".slide_progress").css({
          width: "100%",
          transition: "width 9000ms"
        });
      }
      
      function resetProgressBar() {
        $(".slide_progress").css({
          width: 0,
          transition: "width 0s"
        });
      }

    function initSlideInMenu() {
        var btn_trig = $('#menu_trigger');
        var menu_left = $('.main_navigation');
        var bdy = $('body');

        btn_trig.on('click', function(e) {
            e.stopPropagation();
            menu_left.toggleClass('show_menu_left');
            bdy.toggleClass('margin_left_menu');
        });

        $(document).click(function() {
            menu_left.removeClass('show_menu_left');
            bdy.removeClass('margin_left_menu');
        });

        if(menu_left.hasClass('show_menu_left')) {
            $(document).mouseover(function(){
                $('body').style.cursor = "wait";
            });
        }
    }

    function initUnderline() {
        $('.product_features h3').addClass('underline');
        $('blockquote').addClass('underline');
        $(".underline").each(function() {
            var underlinedObject = $(this);
            var underlinedText = $(this).text();
            var seperatedText = underlinedText.split(" ");
        
            underlinedObject.addClass("underline-con");
            underlinedObject.removeClass("underline");
            underlinedObject.text("");
            var seperatedTextLength = seperatedText.length;
        
            for (var i = 0; i < seperatedTextLength; i++) {
                if (i != seperatedText.length-1) {
                    underlinedObject.append("<span class=\"underline\">" + seperatedText[i] + "&nbsp;" + "</span>");
                } else {
                    underlinedObject.append("<span class=\"underline\">" + seperatedText[i] + "</span>");
                }
            }
        });

    }

    function initForm() {
        var demo_form = $('#form_for_demo');
        var btn_demo = $('#btn_demo');
        var consult_form = $('#form_for_consultation');
        var btn_close_consultation = $('#btn_close_consultation');
        var btn_consult_home = $('#consult_btn_home');
        var btn_inquiry_product = $('#btn_inquiry_product');
        var productInquiryForm = $('#form_for_product_inquiry');
        var CollaborateForm = $('#form_for_collaboration');
        var btn_collaborate = $('#btn_collaborate');
        var btn_close_demo = $('#btn_close_demo');
        var overlay = $('.overlay_dark__');
        demo_form.hide();
        consult_form.hide();
        overlay.hide();

        
        btn_consult_home.on('click', function() {
            consult_form.slideDown(300);
            overlay.fadeIn();
        });

        btn_close_consultation.on('click', function(){
            consult_form.slideUp();
            overlay.fadeOut();
        });

        btn_collaborate.on('click', function() {
            CollaborateForm.slideDown();
            overlay.fadeIn();
        });

        $('#btn_close_collaborate').on('click', function() {
            CollaborateForm.slideUp();
            overlay.fadeOut();
        });

        btn_demo.on('click', function() {
            demo_form.slideDown();
            demo_form.addClass('active');
            overlay.fadeIn();
        });

        overlay.on('click', function() {
            demo_form.slideUp();
            $(this).fadeOut();
            CollaborateForm.slideUp();
            consult_form.slideUp();
        });

        btn_close_demo.on('click', function() {
            demo_form.slideUp();
            overlay.fadeOut();
            productInquiryForm.slideUp();
        });

        $(document).on('keyup', function(e) {
            if(e.keyCode == 27) {
                console.log('bttntntttnntt');
                demo_form.slideUp();
                productInquiryForm.slideUp();
                overlay.fadeOut();
            }
        });

        //product inquiry form
        if(btn_inquiry_product.length) {
            $('#btn_inquiry_product').on('click', function() {
                productInquiryForm.slideDown();
                overlay.fadeIn();
            });
            
            overlay.on('click', function(){
                $(this).fadeOut();
                productInquiryForm.slideUp();
            });
        }
        
        $('#btn_close_inquiry').on('click', function() {
            overlay.fadeOut();
            productInquiryForm.slideUp();

        });
    }

    function initMenu() {
        if(window.innerWidth < 768) {
            var prevScrollpos = window.pageYOffset;
            console.log(prevScrollpos);
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        $('.featured_logo').style.top = "0";
                        console.log('it is here');
                    } else {
                        $('.featured_logo').style.top = "-50px";
                    }
                    prevScrollpos = currentScrollPos;
            }
        }
    }

    function initSmooth() {
        const faders = document.querySelectorAll('.fade_in');
        const sliders = document.querySelectorAll('.slide_in');
        const appearOptions = {
            threshold: 0,
            rootMargin: "0px 0px -50px 0px"
        };
        const appearOnScroll = new IntersectionObserver(function(
            entries,
            appearOnScroll
        ){
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                }else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            })
        },
        appearOptions)
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

        sliders.forEach(slider => {
            appearOnScroll.observe(slider);
        });
    }

    function initLazyLoad() {
        const images = document.querySelectorAll('.lazy_load');

        function preloadImage(img) {
            const src = img.getAttribute('src');
            console.log(src);
            if(!src) {
                return;
            }
            
            img.src = src;
            
        }
        const imgOptions = {
            threshold: 1,
            rootMargin: '0px 0px 300px 0px'
        };
        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    return;
                }else {
                    preloadImage(entry.target);
                    imgObserver.unobserve(entry.target);

                }
            })
        }, imgOptions);

        images.forEach(image => {
            imgObserver.observe(image);
        });



    }

   
});


$(window).on('scroll', function() {
    var prevScrollpos = window.pageYOffset;
    console.log(prevScrollpos);
    if(window.innerWidth < 768) {
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    $('.featured_logo').css({"top": "-30px"});
                    console.log('it is here');
                } else {
                    $('.featured_logo').css({"top": "-80px"});
                }
                prevScrollpos = currentScrollPos;
        }
    }
});


