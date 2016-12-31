window.addEventListener('load',function() {

  video = document.getElementById('video');
  playButton = document.getElementById('play-button');
  progressbarContainer = document.getElementById('progressbar-container');
  progressbar = document.getElementById('progressbar');
  timeField = document.getElementById('time-field');
  soundButton = document.getElementById('sound-button');
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');

  video.load();
  video.addEventListener('canplay',function() {

    playButton.addEventListener('click',playOrPause, false);
    progressbarContainer.addEventListener('click',skip, false);
    updatePlayer();
    soundButton.addEventListener('click', muteOrUnmute, false);
    sbarContainer.addEventListener('click', changeVolume, false);

  }, false);

}, false);

function playOrPause() {
  if(video.paused) {
    video.play();
    playButton.src = 'images/pause.png';
    update = setInterval(updatePlayer,30);
  } else {
    video.pause();
    playButton.src = 'images/play.png';
    window.clearInterval(update);
  }
}

function updatePlayer() {
  var percentage = (video.currentTime/video.duration)*100;
  progressbar.style.width=percentage+'%';
  timeField.innerHTML = getFormattedTime();
  if(video.ended) {
    window.clearInterval(update);
    playButton.src = 'images/replay.png';
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
  } else {
    video.muted =  false;
    soundButton.src = 'images/sound.png';
  }
}

function changeVolume(event) {
    var mouseX = event.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length-2));

    video.volume = (mouseX/width);
    sbar.style.width = (mouseX/width)*100+'%';
}
