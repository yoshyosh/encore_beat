$(document).ready(function(){
  $('.js-newsletter-signup-form').on('submit', function(e){ 
    e.preventDefault();
    var email = $('.newsletter-callout #email').val()
    var action = '/subscriptions'
    $('.newsletter-subscribe').val('Subscribing...')
    $('.newsletter-errors').html('')

    $.ajax({
      url: action,
      type: 'POST',
      data: { email: email },
      success: function ( data ) {
        $('.newsletter-presubscribe').toggle();
        $('.newsletter-success').fadeToggle(700);
      },
      error: function ( data ) {
        $('.newsletter-subscribe').val('Subscribe')
        $('.newsletter-errors').html(JSON.parse(data.responseText).message).toggle();
      }
    });
  })
})
