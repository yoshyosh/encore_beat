$(document).ready(function() {

  $(".alert").delay(3000).fadeOut(1000);
  $(".alert").on("click", function(){
    $(this).remove();
  });

  $('body').on('click', '.song-title-link a.js-count-mobile-click', function() {
    var submission_id = $(this).attr('data-submission-id');

    $.ajax({
      url: '/submission_counts/' + submission_id,
      type: 'put'
    });
  })
})
