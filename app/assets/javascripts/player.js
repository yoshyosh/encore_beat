$(document).ready(function(){

  // Comments page player
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

  // Iframe real time player

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  var arrayOfSongIds = ["J6sRmvwSHQA", "J6sRmvwSHQA", "J6sRmvwSHQA"];

  //loadYoutubeIframe();
  function loadYoutubeIframe(videoId){
    window.onYouTubeIframeAPIReady = function(){
      player = new YT.Player('player', {
        height: '115',
        width: '200',
        videoId: 'M7lc1UVf-VE',
        // playerVars: {
        //   controls: 0
        // },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    //Set current id on player
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    // Check here whether to show play or pause button
    // -1 = unstarted
    // 0 = ended
    // 1 = playing
    // 2 = paused
    // 3 = buffering
    var currentState = player.getPlayerState();
    console.log(currentState);
    if (currentState == 0) {
      loadNextSong();
    }

  }

  // Player controls
  // $("#play-button").on("click", function(){
  //   player.playVideo();
  // });

  // $("#stop-button").on("click", function(){
  //   player.pauseVideo();
  // });

  // $("#next-button").on("click", function(){
  //   loadNextSong();
  // });

  function loadNextSong(){
    //Check array if next song exists
    // If next song does not exist, go back to start of array
    // also if player exists in dom just load video, otherwise recreate a new player iframe to replace soundclouds
    // we will need to store state on the container rather than the player because of this
    player.loadVideoById("J6sRmvwSHQA");
  }

  // Sound cloud player
      var songFrame = document.createElement('iframe');
    songFrame.src = "https://w.soundcloud.com/player/?url=https://soundcloud.com/dvbbs/dvbbs-joey-dale-deja-vu-ft-delora-available-september-19&auto_play=true";
    songFrame.width = 200;
    songFrame.height = 166;
    songFrame.scrolling = "no";
    songFrame.style["border"] = "none";
    songFrame.id = "sc-widget";

    $("#player").html(songFrame);

    var widgetIframe = document.getElementById('sc-widget'),
            widget       = SC.Widget(widgetIframe);
    
    widget.bind(SC.Widget.Events.READY, function() {
          widget.bind(SC.Widget.Events.PLAY, function() {
            // get information about currently playing sound
            widget.getCurrentSound(function(currentSound) {
              //alert('sound ' + currentSound.get('') + 'began to play');
            });
          });
          // get current level of volume
          widget.getVolume(function(volume) {
            console.log('current volume value is ' + volume);
          });
          // set new volume level
          widget.setVolume(50);
          // get the value of the current position
    });
    
    //song ended
    widget.bind(SC.Widget.Events.FINISH, function(){
        loadNextScSong();
    });

  //load in new song
  $(".js-sc-next-button").on("click", function(){
      loadNextScSong();
  });

  //pause song
  $(".js-sc-pause-button").on("click", function(){
      widget.pause();
  });

  //play song
  $(".js-sc-play-button").on("click", function(){
      widget.play();
  });
      
  function loadNextScSong(){
     widget.load("https://soundcloud.com/anjunadeep/16-bit-lolitas-deep-in-my-soul-1&auto_play=true");
  }

});