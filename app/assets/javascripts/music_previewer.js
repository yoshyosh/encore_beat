$(document).ready(function(){
	
	$(".js-paste-music-previewer").on('paste', function(){
		var element = this;
		setTimeout(function(){
			var pastedText = $(element).val();
			requestMusicData(pastedText);
			//TODO: Make sure we have http(s) in front of create url
		}, 100);
	});

});

function requestMusicData(link){
	//TODO: Refactor in the case we accept other music sites/links
	var a = document.createElement('a');
	a.href = link;
	var domain = a.hostname.replace('www.', '');
	if (domain == "soundcloud.com") {
		var musicRequestUrl = createSoundcloudRequestLink(link);
		getSoundCloudMusicData(musicRequestUrl);
		buildAndShowSpinner();
		$(".js-music-preview-box").show();
		$(".js-show-field").show();
	} else if (domain == "youtube.com" || domain == "youtu.be") {
		var musicRequestUrl = createYoutubeRequestLink(link);
		getYoutubeMusicData(musicRequestUrl);
		buildAndShowSpinner();
		$(".js-music-preview-box").show();
		$(".js-show-field").show();
	} else {
		alert("Please use a YouTube or Soundcloud link");
	}
}

function createYoutubeRequestLink(url){
	var API_BASE_URL = "http://gdata.youtube.com/feeds/api/videos/"
	var API_END_URL = "?v=2&prettyprint=true&alt=jsonc"
	//TODO: Need to parse further in the case that the youtube link has more params after video
	var shortURL = getYoutubeShortCode(url);
	var apiURL = API_BASE_URL + shortURL + API_END_URL
	return apiURL;
}

function createSoundcloudRequestLink(url){
	var API_BASE_URL = "http://api.soundcloud.com/resolve.json?url="
	var API_END_URL = "&client_id=b41a9fd723e39fb6a7cd6c91ba3b7922"
	var apiURL = API_BASE_URL + url + API_END_URL
	return apiURL;
}

function getSoundCloudMusicData(url){
	$.getJSON(url, function(data) {
		var title = getSoundcloudTitle(data);
		var thumbnail = getSoundcloudThumbnailUrl(data);
		addToHtmlPreviewBox(title, thumbnail);
		//Need a failure retry etc
	});
}

function getYoutubeMusicData(url){
	console.log(url);
	$.getJSON(url, function(data) {
		console.log(data);
		var title = getYoutubeTitle(data);

		var thumbnail = getYoutubeThumbnailUrl(data);
		addToHtmlPreviewBox(title, thumbnail);
		//Need a failure retry etc
	});
}

function addToHtmlPreviewBox(title, thumbnail){
	var imgAndTitleHtml = "<img src='" + thumbnail + "' />" + "<p>" + title + "</p>";
	$(".js-music-preview-box").html(imgAndTitleHtml);
}

function getYoutubeShortCode(link) {
	var a = document.createElement('a');
	a.href = link;
	var domain = a.hostname.replace('www.', '');
	var shortURL;
	if (domain == "youtube.com") {
		shortURL = link.split("?v=")[1];
	} else if (domain == "youtu.be") {
		shortURL = link.split("/")[3];
	}
	return shortURL;
}

function getSoundcloudTitle(data){
	return data.title;
}

function getSoundcloudThumbnailUrl(data){
	return data.artwork_url
}

function getYoutubeTitle(data){
	return data.data.title;
}

function getYoutubeThumbnailUrl(data){
	return data.data.thumbnail.sqDefault;
}

function buildAndShowSpinner(){
	var spinner = "<div class='spinner js-spinner'>" + "<div class='rect1'></div>" + "<div class='rect2'></div>" + "<div class='rect3'></div>" + "<div class='rect4'></div>" + "<div class='rect5'></div>" + "</div>"
	$(".js-show-spinner").html(spinner);
}