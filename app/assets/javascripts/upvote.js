$(document).ready(function(){
  $('body').on('click', '.js-arrow-up', function() {
    var clicked = $(this).hasClass('clicked');
    var songId = $(this).attr('data-submission-id');
    var counter = $('.vote-count[data-count-id=' + songId + ']');
    var currentCount = parseInt(counter.text());

    if (clicked) {
      // state has not yet updated, so we use the inverse. Deduct if state is "currently" clicked
      counter.text(currentCount - 1);
      $(this).closest(".js-submission-link").attr("data-user-upvoted", "false");
      $(".js-onclick-player-upvote-button").removeClass("player-upvote-active");
      $(this).removeClass('clicked');
    }
    else {
      counter.text(currentCount + 1)
      $(this).closest(".js-submission-link").attr("data-user-upvoted", "true");
      $(".js-onclick-player-upvote-button").addClass("player-upvote-active");
      $(this).addClass('clicked');
    }

    $.ajax({
      data: {submission_id: songId, upvoted: !clicked },
      url: '/upvotes',
      type: 'post',
      dataType: 'json'
    });
  })
})