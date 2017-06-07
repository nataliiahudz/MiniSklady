
$(document).ready(function() {
		
    $('a.scrollto').click(function(e) {
    e.preventDefault();
    var sectId = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(sectId).offset().top
    }, 700);
    });

    
});