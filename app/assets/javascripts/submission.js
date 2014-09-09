$(document).ready(function(){
  $('body').on('click', '.approval-criteria-link', function(e) {
    e.preventDefault();
    $('.approval-criteria').fadeToggle(600);
  });
})