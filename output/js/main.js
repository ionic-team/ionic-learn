$(function() {
  var $container = $('.container');
  var $getIonic = $('.get-ionic-wrapper');
  var viewedCta = localStorage.getItem('viewedCta');


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

  if (!viewedCta) {
    $('.get-ionic-wrapper').removeClass('viewed');
  }

  $(document).on('click', '.close-cta', function(e) {
    $('.get-ionic-wrapper').addClass('viewed');
    localStorage.setItem('viewedCta', true);
  });

  $(document).on('click', '.get-ionic', function(e) {
    localStorage.setItem('viewedCta', true);
    $('.get-ionic-wrapper').hide();
  });

  $('span.difficulty').tooltip({});
});
