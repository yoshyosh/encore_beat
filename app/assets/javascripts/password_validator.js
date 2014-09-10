$(document).ready(function(){
  $('#password_confirmation, #password').keyup(function(){
    var confirmPassword = $('#password_confirmation').val(),
        helperText = 'Passwords must match',
        firstPassword = $('#password').val(),
        helper = $('.password-helper'),
        button = $('.primary-action-button')

    if (confirmPassword.length > 0) {
      if (confirmPassword !== firstPassword) {
        helper.html(helperText);
        button.prop('disabled', true);
      }
      else {
        helper.html('');
        button.prop('disabled', false);
      }
    }
    else {
      helper.html('');
    }
  });
})