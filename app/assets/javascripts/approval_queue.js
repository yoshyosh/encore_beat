$(document).ready(function(){
  $('.admin-approvals').on('click', '.approve-submission', function(){
    var submissionId = $(this).attr("data-submission-id");
    var submissionContainer = $('.song[data-submission-id=' + submissionId + ']');

    $(submissionContainer).css('background-color', '#87D37C');
    $(submissionContainer).fadeOut(1000);
  })

  $('.admin-approvals').on('click', '.reject-submission', function(){
    var submissionId = $(this).attr("data-submission-id");
    var submissionContainer = $('.song[data-submission-id=' + submissionId + ']');

    $(submissionContainer).css('background-color', '#E26A6A');
    $(submissionContainer).fadeOut(1000);
  })
})
