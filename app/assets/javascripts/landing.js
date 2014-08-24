$(document).ready(function() {
  $('.song-details-container').on('click', '.song-list-title a', function() {
    var submission_id = $(this).attr('data-submission-id')

    $.ajax({
      url: '/submission_counts/' + submission_id,
      type: 'put'
    });
  })
})