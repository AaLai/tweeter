

$(document).ready(function() {

  $(".new-tweet textarea").on('keyup', function(event)
  {
    var value = 140 - $(this).val().length;
    $(this).siblings('.counter').text(value);
    if (value < 0) {
      $(this).siblings('.counter').addClass("red");
    } else {
      $(this).siblings('.counter').removeClass("red");
    }
  });

});