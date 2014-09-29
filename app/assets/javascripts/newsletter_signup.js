$(document).ready(function(){
  $('.js-newsletter-signup-form').on('submit', function(e){ 
    e.preventDefault();
    var email = $('.newsletter-callout #email').val()
    var action = '/subscriptions'

    $.ajax({
      url: action,
      type: 'POST',
      data: { email: email },
      complete: function ( data ) {
        $('.newsletter-presubscribe').toggle();
        $('.newsletter-success').fadeToggle(700);
      }
    });
  })
})
