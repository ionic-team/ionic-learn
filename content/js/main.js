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
    if ($(this).hasClass('expanded')) {
      $('footer.main nav')
      .addClass('animated fadeOutLeft')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { $(this).removeClass('expanded'); });

    } else {
      $('footer.main nav').addClass('expanded animated fadeInLeft');
    }
    $(this, '.expand-wrapper .expand').toggleClass('expanded');
  });

  $('footer.main nav').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
    $(this).removeClass('animated fadeInLeft fadeOutLeft');
  });


  if (viewedCta) {
    $('.get-ionic-wrapper').hide();
  } else {
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

  $('.email-digest').on('submit', function(e) {
    e.preventDefault();
    var $this = $(this)

    $this.fadeOut()
    $this.find('input[type=submit]').attr('disabled', 'disabled')
    var dfd = $.getJSON($this.attr('action') + "?callback=?", $this.serialize())

    dfd.done(function(res) {
      $this.promise().done(function() {
        $('.email-digest-success').fadeIn()
      })
    })
  })
});
