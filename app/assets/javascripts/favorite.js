$(document).ready(function(){
  $('body').on('click', '.js-favorite-trigger', function(e) {
    e.preventDefault();
    $(this).html('<i class="fa fa-star"></i> <span class="longform-text">Favorited</span>');
    $(this).addClass('js-unfavorite-trigger');
    $(this).removeClass('js-favorite-trigger');

    $.ajax({
      url: '/favorites',
      data: { submission_id: $(this).attr('data-submission-id') },
      type: 'post'
    });
  });

  $('body').on('click', '.js-unfavorite-trigger', function(e) {
    e.preventDefault();
    $(this).html('<i class="fa fa-star-o"></i> <span class="longform-text">Favorite</span>');
    $(this).addClass('js-favorite-trigger');
    $(this).removeClass('js-unfavorite-trigger');

    $.ajax({
      url: '/favorites/1',
      data: { submission_id: $(this).attr('data-submission-id') },
      type: 'delete'
    });
  });
})