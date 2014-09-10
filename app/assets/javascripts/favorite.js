$(document).ready(function(){
  $('body').on('click', '.js-favorite-trigger', function(e) {
    e.preventDefault();
    $(this).html('<i class="fa fa-minus"></i> Playlist');
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
    $(this).html('<i class="fa fa-plus"></i> Playlist');
    $(this).addClass('js-favorite-trigger');
    $(this).removeClass('js-unfavorite-trigger');

    $.ajax({
      url: '/favorites/1',
      data: { submission_id: $(this).attr('data-submission-id') },
      type: 'delete'
    });
  });
})