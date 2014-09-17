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
      $('.preview-player').html(oEmbed.html);
    });
  } else {
    //use embedly for youtube/others
    $('.preview-player a').embedly({
      key: '882df806ff8b4986ba1d940d681c60ff',
      query: {maxwidth:530}
    });
  }

  // Global Generic Player control actions on click
  $(".main-container-outer").on("click", ".js-onclick-player-upvote-button", function(e){
    if($(this).hasClass("player-upvote-active")){
      $(this).removeClass("player-upvote-active");
      playerRemoveUpvoteCurrentPlayingSong();
    } else {
      $(this).addClass("player-upvote-active");
      playerUpvoteCurrentPlayingSong();
    }
    //When new song loads we always clear active state then set it based on song
    e.preventDefault();
  });

  $(".main-container-outer").on("click", ".js-onclick-player-playlist-button", function(e){
    if($(this).hasClass("player-playlist-active")){
      $(this).removeClass("player-playlist-active");
      playerUnplaylistCurrentPlayingSong();
    } else {
      $(this).addClass("player-playlist-active");
      playerPlaylistCurrentPlayingSong();
    }
    e.preventDefault();
  });

  // Iframe real time player
  var youtubePlayerLoaded = false;
  var arrayOfSongs = [];
  buildArrayOfSongs();

  $(".main-container-outer").on("click", ".js-get-player-link", function(){
    if ($(this).closest(".song").hasClass("song-active")){
      if($(this).find(".js-mini-song-control").hasClass("fa-pause")){
        $(".js-pause-button").click();
      } else {
        $(".js-play-button").click();
      }
    } else {
      var linkUrl = $(this).attr("data-href");
      var submission_id = $(this).attr('data-submission-id');
      setCurrentSongPlayingId(submission_id);
      var newPlayIndex = getSongToPlayIndex(linkUrl);

      // Checks if newPlayIndex doesnt exist then rebuilds the array to refresh it
      if (!(newPlayIndex > 0)) {
        buildArrayOfSongs();
        newPlayIndex = getSongToPlayIndex(linkUrl);
      }
      $(".js-player-replace-target").attr("data-playing-index", newPlayIndex);

      checkLinkSource(linkUrl);
    }
  });

  function loadFirstSetOfSongs(){
    var firstSongLink = arrayOfSongs[0];

  }

  function getSongToPlayIndex(link){
    var songToPlayIndex;
    var songArrayLength = arrayOfSongs.length;
    for (var i = 0; i < songArrayLength; i++){
      if(arrayOfSongs[i]["songLink"] == link){
        songToPlayIndex = i;
        return songToPlayIndex;
      }
    }
  }
  
  //create array of songs, this needs to be refreshed/improved as we load more in the pagination stage
  function buildArrayOfSongs(){
    arrayOfSongs = [];
    $(".js-get-player-link").each(function(i, obj){
      var songLink = $(obj).data("href");
      var songSubmissionId = $(obj).data("submission-id");
      var songLinkWithId = {};
      songLinkWithId["songLink"] = songLink;
      songLinkWithId["submissionId"] = songSubmissionId;
      arrayOfSongs.push(songLinkWithId);
    });
  }

  function checkLinkSource(link){
    var a = document.createElement('a');
    a.href = link;
    var domain = a.hostname.replace('www.', '');
    $(".js-player-source").removeClass("js-youtube-player-mode");
    $(".js-player-source").removeClass("js-soundcloud-player-mode");
    var currentPlayingIndex = $(".js-player-current-submission-index").attr("data-playing-index");
    var currentPlayingSubmissionId = arrayOfSongs[currentPlayingIndex].submissionId;
    setCurrentSongPlayingId(currentPlayingSubmissionId);
    setCurrentSongPlayingBackgroundColorActive();
    setCurrentSongPlayingMiniToPause();
    // Check and set upvote and playlist state based on song
    setPlayerActionStates();
    $.ajax({
      url: '/submission_counts/' + currentPlayingSubmissionId,
      type: 'put'
    });
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
    } else if (domain == "youtu.be"){
      shortURL = link.split("/")[3];
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
        // Check global state if this is first load video, dont auto play, otherwise go for it.
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
        } else if (currentState == 1) {
          $(".js-hide-show-player").show();
          $(".js-play-button").addClass("hidden-view");
          $(".js-pause-button").removeClass("hidden-view");
        } else if (currentState == 2) {
          $(".js-pause-button").addClass("hidden-view");
          $(".js-play-button").removeClass("hidden-view");
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
            togglePlayPause();
          });
          widget.bind(SC.Widget.Events.PAUSE, function() {
            togglePlayPause();
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
    var currentPlayIndex = parseInt($(".js-player-replace-target").attr("data-playing-index"));
    var newPlayIndex;
    if (currentPlayIndex + 1 >= arrayOfSongs.count) {
      newPlayIndex = 0; //neutralize
    } else {
      newPlayIndex = currentPlayIndex + 1;
    }
    var nextSongLink = arrayOfSongs[newPlayIndex].songLink;
    $(".js-player-replace-target").attr("data-playing-index", newPlayIndex);
    checkLinkSource(nextSongLink);
  }

  function loadPreviousSongInQueue(){
    // Need to check for when we are on the last song
    //Check array if next song exists
    // If next song does not exist, go back to start of array
    var currentPlayIndex = parseInt($(".js-player-replace-target").attr("data-playing-index"));
    var newPlayIndex;
    if (currentPlayIndex > 0) {
      newPlayIndex = currentPlayIndex - 1;
    } else {
      newPlayIndex = 0;
    }
    var nextSongLink = arrayOfSongs[newPlayIndex].songLink;
    $(".js-player-replace-target").attr("data-playing-index", newPlayIndex);
    checkLinkSource(nextSongLink);
  }

  function togglePlayPause(){
    if( $(".js-pause-button").hasClass("hidden-view") ) {
      $(".js-play-button").addClass("hidden-view");
      $(".js-pause-button").removeClass("hidden-view");
      setCurrentSongPlayingMiniToPause();
    } else {
      $(".js-play-button").removeClass("hidden-view");
      $(".js-pause-button").addClass("hidden-view");
      setCurrentSongPlayingMiniToPlay();
    }
  }

  function setCurrentSongPlayingId(submission_id){
    $(".js-player-current-submission-index").attr("data-current-song-id", submission_id);
  }

  function setCurrentSongPlayingBackgroundColorActive() {
    removeActiveSongBackground();
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').closest(".song").addClass("song-active");
  }

  function setCurrentSongPlayingMiniToPause(){
    resetMiniPlayingControls();
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').find(".js-mini-song-control").removeClass("fa-play-circle").addClass("fa-pause").addClass("song-mini-pause");
  }

  function setCurrentSongPlayingMiniToPlay(){
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').find(".js-mini-song-control").removeClass("fa-pause").removeClass("song-mini-pause").addClass("fa-play-circle");
  }

  function resetMiniPlayingControls(){
    $(".js-mini-song-control").removeClass("fa-pause").removeClass("song-mini-pause").addClass("fa-play-circle");
  }

  function removeActiveSongBackground(){
    $(".song-active").removeClass("song-active");
  }

  function playerUpvoteCurrentPlayingSong(){
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').closest(".js-arrow-up").click();
    if ($(".js-loggedout-arrow-up").length > 0){
      $(".js-loggedout-arrow-up")[0].click(); //For logged out case
    }
    $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-upvoted", "true");
  }

  function playerRemoveUpvoteCurrentPlayingSong(){
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').closest(".js-arrow-up").click();
    $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-upvoted", "false");
  }

  function playerPlaylistCurrentPlayingSong() {
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').closest(".js-favorite-trigger").click();
    if ($(".js-loggedout-favorite-trigger").length > 0){
      $(".js-loggedout-favorite-trigger")[0].click(); //For logged out case
    }
    $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-favorited", "true");
    $(".js-player-playlist-icon").removeClass("fa-plus").addClass("fa-minus");
    $(".js-player-playlist-icon").addClass("player-playlist-icon-vertical-align");
  }

  function playerUnplaylistCurrentPlayingSong(){
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    $('[data-submission-id="' + songId + '"]').closest(".js-unfavorite-trigger").click();
    $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-favorited", "false");
    $(".js-player-playlist-icon").removeClass("fa-minus").addClass("fa-plus");
    $(".js-player-playlist-icon").removeClass("player-playlist-icon-vertical-align");
  }

  function setPlayerActionStates(){
    resetPlayerActionStates();
    var songId = $(".js-player-current-submission-index").attr("data-current-song-id");
    var songWasUpvoted = $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-upvoted");
    if (songWasUpvoted == "true") {
      $(".js-onclick-player-upvote-button").addClass("player-upvote-active");
    }

    var songWasPlaylisted = $('[data-submission-id="' + songId + '"]').closest(".js-submission-link").attr("data-user-favorited");
    if (songWasPlaylisted == "true") {
      $(".js-onclick-player-playlist-button").addClass("player-playlist-active");
      $(".js-player-playlist-icon").removeClass("fa-plus").addClass("fa-minus");
      $(".js-player-playlist-icon").addClass("player-playlist-icon-vertical-align");
    }
  }

  function resetPlayerActionStates(){
    $(".player-upvote-active").removeClass("player-upvote-active");
    $(".player-playlist-active").removeClass("player-playlist-active");
    $(".js-onclick-player-playlist-button").find(".js-player-playlist-icon").removeClass("fa-minus").removeClass("fa-plus").addClass("fa-plus");
  }

});