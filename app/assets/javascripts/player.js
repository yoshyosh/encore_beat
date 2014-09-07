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
    //TODO: Breaks with duplicate links
    var newPlayIndex = arrayOfSongs.indexOf(linkUrl);
    $(".js-player-replace-target").attr("data-play-index", newPlayIndex);
    checkLinkSource(linkUrl);
  });

  //create array of songs, this needs to be refreshed/improved as we load more in the pagination stage
  var arrayOfSongs = [];
  $(".js-get-player-link").each(function(i, obj){
    var songLink = $(obj).data("href");
    arrayOfSongs.push(songLink);
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
      loadSoundCloudFrame(link);
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
          playerVars: {
            controls: 0
          },
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
        if (currentState == 0) {
          loadNextSongInQueue();
        } else if (currentState == 1 || 3) {
          $(".js-hide-show-player").show();
        }
      }

    } else {
      // If we already loaded youtube and we want to put in another link, we can just use the loadVideoById method
      loadNextSong(videoId);
    }

    // Player controls
    turnOnYoutubePlayerControls();

    function loadNextSong(){
      player.loadVideoById(videoId);
    }

    function turnOnYoutubePlayerControls(){
      $(".js-youtube-player-mode .js-play-button").off();
      $(".js-youtube-player-mode .js-play-button").on("click", function(e){
        player.playVideo();
        togglePlayPause();
        e.preventDefault();
      });

      $(".js-youtube-player-mode .js-pause-button").off();
      $(".js-youtube-player-mode .js-pause-button").on("click", function(e){
        player.pauseVideo();
        togglePlayPause();
        e.preventDefault();
      });

      $(".js-youtube-player-mode .js-next-button").off();
      $(".js-youtube-player-mode .js-next-button").on("click", function(e){
        loadNextSongInQueue();
        e.preventDefault();
      });

      $(".js-youtube-player-mode .js-previous-button").off();
      $(".js-youtube-player-mode .js-previous-button").on("click", function(e){
        loadPreviousSongInQueue();
        e.preventDefault();
      });
    }
  }



  // Sound cloud player
  function loadSoundCloudFrame(link){
    var initialSongFrame = createSoundcloudIframe(link);
    hideYoutubePlayer();
    $("#sc-widget").remove();
    $(".js-player-replace-target").append(initialSongFrame);

    var widgetIframe = document.getElementById('sc-widget'),
            widget   = SC.Widget(widgetIframe);
    
    widget.bind(SC.Widget.Events.READY, function() {
          widget.bind(SC.Widget.Events.PLAY, function() {
            $(".js-hide-show-player").show();
            $(".js-play-button").addClass("hidden-view");
            $(".js-pause-button").removeClass("hidden-view");
          });
          widget.bind(SC.Widget.Events.PAUSE, function() {
            $(".js-pause-button").addClass("hidden-view");
            $(".js-play-button").removeClass("hidden-view");
          });
    });
    
    //song ended
    widget.bind(SC.Widget.Events.FINISH, function(){
        loadNextSongInQueue();
    });

      //load in new song
      $(".js-soundcloud-player-mode .js-next-button").off();
      $(".js-soundcloud-player-mode .js-next-button").on("click", function(e){
        loadNextSongInQueue();
        e.preventDefault();
      });

      //load in previous song
      $(".js-soundcloud-player-mode .js-previous-button").off();
      $(".js-soundcloud-player-mode .js-previous-button").on("click", function(e){
        loadPreviousSongInQueue();
        e.preventDefault();
      });

      //pause song
      $(".js-soundcloud-player-mode .js-pause-button").off();
      $(".js-soundcloud-player-mode .js-pause-button").on("click", function(e){
          widget.pause();
          togglePlayPause();
          e.preventDefault();
      });

      //play song
      $(".js-soundcloud-player-mode .js-play-button").off();
      $(".js-soundcloud-player-mode .js-play-button").on("click", function(e){
          widget.play();
          togglePlayPause();
          e.preventDefault();
      });

  }


  function createSoundcloudIframe(link){
    var songFrame = document.createElement('iframe');
    var songLinkPrefix = "https://w.soundcloud.com/player/?url=";
    songFrame.src = songLinkPrefix + link + "&auto_play=true";
    songFrame.width = 200;
    songFrame.height = 115;
    songFrame.scrolling = "no";
    songFrame.style["border"] = "none";
    songFrame.id = "sc-widget";
    return songFrame;
  }

  function hideYoutubePlayer(){
    $("iframe#player").hide();
    if(player){
      player.stopVideo();
    }
  }

  function showYoutubePlayer(){
    $("iframe#player").show();
  }

  function loadNextSongInQueue(){
    // Need to check for when we are on the last song
    //Check array if next song exists
    // If next song does not exist, go back to start of array
    var currentPlayIndex = parseInt($(".js-player-replace-target").attr("data-play-index"));
    var newPlayIndex;
    if (currentPlayIndex + 1 >= arrayOfSongs.count) {
      newPlayIndex = 0; //neutralize
    } else {
      newPlayIndex = currentPlayIndex + 1;
    }
    var nextSongLink = arrayOfSongs[newPlayIndex];
    $(".js-player-replace-target").attr("data-play-index", newPlayIndex);
    checkLinkSource(nextSongLink);
  }

  function loadPreviousSongInQueue(){
    // Need to check for when we are on the last song
    //Check array if next song exists
    // If next song does not exist, go back to start of array
    var currentPlayIndex = parseInt($(".js-player-replace-target").attr("data-play-index"));
    var newPlayIndex;
    if (currentPlayIndex > 0) {
      newPlayIndex = currentPlayIndex - 1;
    } else {
      newPlayIndex = 0;
    }
    var nextSongLink = arrayOfSongs[newPlayIndex];
    $(".js-player-replace-target").attr("data-play-index", newPlayIndex);
    checkLinkSource(nextSongLink);
  }

  function togglePlayPause(){
    if( $(".js-pause-button").hasClass("hidden-view") ) {
      $(".js-play-button").addClass("hidden-view");
      $(".js-pause-button").removeClass("hidden-view");
    } else {
      $(".js-play-button").removeClass("hidden-view");
      $(".js-pause-button").addClass("hidden-view");
    }
  }

});