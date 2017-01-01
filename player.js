window.addEventListener('load',function() {

  video = document.getElementById('video');
  playButton = document.getElementById('play-button');
  pauseScreen = document.getElementById('screen');
  screenButton = document.getElementById('screen-button');
  progressbarContainer = document.getElementById('progressbar-container');
  progressbar = document.getElementById('progressbar');
  timeField = document.getElementById('time-field');
  soundButton = document.getElementById('sound-button');
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');
  fullscreenButton = document.getElementById('fullscreen-button');
  video.load();
  video.addEventListener('canplay',function() {

    playButton.addEventListener('click',playOrPause, false);
    progressbarContainer.addEventListener('click',skip, false);
    updatePlayer();
    soundButton.addEventListener('click', muteOrUnmute, false);
    sbarContainer.addEventListener('click', changeVolume, false);
    fullscreenButton.addEventListener('click', fullscreen, false);
    screenButton.addEventListener('click', playOrPause, false)

  }, false);

}, false);

function playOrPause() {
  if(video.paused) {
    video.play();
    playButton.src = 'images/pause.png';
    update = setInterval(updatePlayer,30);
    pauseScreen.style.display = 'none';

  } else {
    video.pause();
    playButton.src = 'images/play.png';
    window.clearInterval(update);
    pauseScreen.style.display = 'block';
    screenButton.src = 'images/play.png';
  }
}

function updatePlayer() {
  var percentage = (video.currentTime/video.duration)*100;
  progressbar.style.width=percentage+'%';
  timeField.innerHTML = getFormattedTime();
  if(video.ended) {
    window.clearInterval(update);
    playButton.src = 'images/replay.png';
    pauseScreen.style.display = 'block';
    screenButton.src = 'images/replay.png';
  } else if (video.paused) {
    playButton.src = 'images/play.png';
    screenButton.src = 'images/play.png';
  }

}

function skip(event) {
  var mouseX = event.pageX - progressbar.offsetLeft;
  var width = window.getComputedStyle(progressbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length-2));
  video.currentTime = (mouseX/width)*video.duration;
  updatePlayer();
}

function getFormattedTime() {
  var seconds = Math.round(video.currentTime);
  var minutes = Math.floor(seconds/60);
  if(minutes > 0) seconds -= minutes*60;
  if(seconds.toString().length===1) seconds = '0'+seconds;

  var totalSeconds = Math.round(video.duration);
  var totalMinutes = Math.floor(totalSeconds/60);
  if(totalMinutes > 0) totalSeconds -= totalMinutes*60;
  if(totalSeconds.toString().length===1) totalSeconds = '0'+totalSeconds;

  return minutes+':'+seconds+' / '+totalMinutes+':'+totalSeconds;
}


function muteOrUnmute() {
  if (!video.muted) {
    video.muted = true;
    soundButton.src = 'images/mute.png';
    sbar.style.display='none';
  } else {
    video.muted =  false;
    soundButton.src = 'images/sound.png';
    sbar.style.display='block';
  }
}

function changeVolume(event) {
    var mouseX = event.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length-2));

    video.volume = (mouseX/width);
    sbar.style.width = (mouseX/width)*100+'%';
    video.muted =  false;
    soundButton.src = 'images/sound.png';
    sbar.style.display='block';
}


function fullscreen() {
  if(video.requestFullscreen) {
    video.requestFullscreen();
  } else if(video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if(video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  } else if(video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}
