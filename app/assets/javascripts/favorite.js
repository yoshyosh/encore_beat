$(document).ready(function(){
  $('body').on('click', '.js-favorite-trigger', function(e) {
    e.preventDefault();
    $(this).html('<i class="fa fa-minus"></i> Playlist');
    $(this).addClass('js-unfavorite-trigger');
    $(this).removeClass('js-favorite-trigger');

    $(this).closest(".js-submission-link").attr("data-user-favorited", "true");
    $(".js-onclick-player-playlist-button").addClass("player-playlist-active");
    $(".js-player-playlist-icon").removeClass("fa-plus").addClass("fa-minus");
    $(".js-player-playlist-icon").addClass("player-playlist-icon-vertical-align");

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

    $(this).closest(".js-submission-link").attr("data-user-favorited", "false");
    $(".js-onclick-player-playlist-button").removeClass("player-playlist-active");
    $(".js-player-playlist-icon").removeClass("fa-minus").addClass("fa-plus");
    $(".js-player-playlist-icon").removeClass("player-playlist-icon-vertical-align");

    $.ajax({
      url: '/favorites/1',
      data: { submission_id: $(this).attr('data-submission-id') },
      type: 'delete'
    });
  });


});