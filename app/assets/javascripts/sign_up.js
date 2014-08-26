function addFileNameToPage(){
  var filename = $(".js-get-file-name").val().split('\\').pop();
  if (filename != "") {
    $(".js-get-file-name").hide();
    $(".js-add-filename").text(filename);
    $(".js-add-filename").append("<span class='close-icon'>&#10006;</span>");
    $(".js-add-filename").show();
  }
}


function hideFileNameHolder(){
  $(".js-hide-avatar-added-text").hide();
  $(".js-get-file-name").show();
}