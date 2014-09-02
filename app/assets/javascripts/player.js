$(document).ready(function(){
  var url = $(".preview-player a").attr("href");
  var a = document.createElement('a');
  a.href = url;
  var domain = a.hostname.replace('www.', '');
  if (domain == "soundcloud.com") {
    SC.initialize({
      client_id: '4d740aa98f12f6c36eefa84839fffdd9'
    });
    var track_url = url + '?maxheight=166';
    SC.oEmbed(track_url, { auto_play: false }, function(oEmbed) {
      console.log('oEmbed response: ' + oEmbed.html);
      $('.preview-player').html(oEmbed.html);
    });
  } else {
    //use embedly for youtube/others
    $('.preview-player a').embedly({
      key: '882df806ff8b4986ba1d940d681c60ff',
      query: {maxwidth:530}
    });
  }
});