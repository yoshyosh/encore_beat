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
  var youtubePlayerLoaded = false;
  $(".js-get-player-link").on("click", function(){
    var linkUrl = $(this).attr("data-href");
    checkLinkSource(linkUrl);
  });

  function checkLinkSource(link){
    var a = document.createElement('a');
    a.href = link;
    var domain = a.hostname.replace('www.', '');
    $(".js-player-source").removeClass("js-youtube-player-mode");
    $(".js-player-source").removeClass("js-soundcloud-player-mode");
    if (domain == "soundcloud.com") {
      // build soundcloud iframe
      $(".js-player-source").addClass("js-soundcloud-player-mode");
      buildSoundCloudFrame(link);
    } else if (domain == "youtube.com" || domain == "youtu.be") {
      // get the short code of this
      $(".js-player-source").addClass("js-youtube-player-mode");
      var shortCode = getYoutubeShortCode(link);
      // Show youtube iframe
      // build youtube iframe
      $("#sc-widget").remove();
      showYoutubePlayer();
      loadYoutubeIframe(shortCode);
    }
  }

  function getYoutubeShortCode(link) {
    var a = document.createElement('a');
    a.href = link;
    var domain = a.hostname.replace('www.', '');
    var shortURL;
    if (domain == "youtube.com") {
      shortURL = link.split("?v=")[1];
    } else {
      shortURL = link.split("/")[1];
    }
    return shortURL;
  }

  // Youtube player
  var player;
  function loadYoutubeIframe(videoId){
    if (!youtubePlayerLoaded) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      youtubePlayerLoaded = true;

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.

      window.onYouTubeIframeAPIReady = function(){
        console.log("on youtube iframe api ready loaded");
        player = new YT.Player('player', {
          height: '115',
          width: '200',
          videoId: videoId,
          // playerVars: {
          //   controls: 0
          // },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
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

    } else {
      loadNextSong(videoId);
    }

    // Player controls
    turnOnYoutubePlayerControls();

    function loadNextSong(){
      //Check array if next song exists
      // If next song does not exist, go back to start of array
      // also if player exists in dom just load video, otherwise recreate a new player iframe to replace soundclouds
      // we will need to store state on the container rather than the player because of this
      player.loadVideoById(videoId);
    }

    function turnOnYoutubePlayerControls(){
      $(".js-youtube-player-mode .js-play-button").off();
      $(".js-youtube-player-mode .js-play-button").on("click", function(e){
        player.playVideo();
        e.preventDefault();
      });

      $(".js-youtube-player-mode .js-pause-button").off();
      $(".js-youtube-player-mode .js-pause-button").on("click", function(e){
        player.pauseVideo();
        e.preventDefault();
      });

      $(".js-youtube-player-mode .js-next-button").off();
      $(".js-youtube-player-mode .js-next-button").on("click", function(e){
        loadNextSong();
        e.preventDefault();
      });
    }
  }



  // Sound cloud player
  function buildSoundCloudFrame(link){
    var initialSongFrame = createSoundcloudIframe(link);
    hideYoutubePlayer();
    $(".js-player-replace-target").append(initialSongFrame);
    var nextSongLink = "https://soundcloud.com/anjunadeep/16-bit-lolitas-deep-in-my-soul-1";

    var widgetIframe = document.getElementById('sc-widget'),
            widget   = SC.Widget(widgetIframe);
    
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
        loadNextScSong(nextSongLink);
    });

      //load in new song
      $(".js-soundcloud-player-mode .js-next-button").off();
      $(".js-soundcloud-player-mode .js-next-button").on("click", function(e){
          loadNextScSong(nextSongLink);
          e.preventDefault();
      });

      //pause song
      $(".js-soundcloud-player-mode .js-pause-button").off();
      $(".js-soundcloud-player-mode .js-pause-button").on("click", function(e){
          widget.pause();
          e.preventDefault();
      });

      //play song
      $(".js-soundcloud-player-mode .js-play-button").off();
      $(".js-soundcloud-player-mode .js-play-button").on("click", function(e){
          widget.play();
          e.preventDefault();
      });
          
      function loadNextScSong(songUrl){
         var autoPlayUrl = songUrl + "&auto_play=true";
         widget.load(autoPlayUrl);
      }

  }


  function createSoundcloudIframe(link){
    var songFrame = document.createElement('iframe');
    var songLinkPrefix = "https://w.soundcloud.com/player/?url=";
    songFrame.src = songLinkPrefix + link + "&auto_play=true";
    songFrame.width = 200;
    songFrame.height = 166;
    songFrame.scrolling = "no";
    songFrame.style["border"] = "none";
    songFrame.id = "sc-widget";
    return songFrame;
  }

  function hideYoutubePlayer(){
    $("iframe#player").hide();
  }

  function showYoutubePlayer(){
    $("iframe#player").show();
  }

});