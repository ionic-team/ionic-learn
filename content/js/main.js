$(function() {
  var $container = $('.container');
  var $getIonic = $('.get-ionic');


  function setGetIonicPosition() {
    $getIonic.css({
      left: $container.css('margin-left')
    });

  }

  setGetIonicPosition();

  $(window).on('resize', setGetIonicPosition);

  $('.expand').on('click', function() {
    $('footer.main nav').toggleClass('expanded');
  });
});
