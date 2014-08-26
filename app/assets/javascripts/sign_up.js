$(".js-get-file-name").on("change", function(){
  console.log("changed");
  var filename = $(this).val().split('\\').pop();
  console.log(filename);
});