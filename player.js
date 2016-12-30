window.addEventListener('load',function() {

  video = document.getElementById('video');
  playButton = document.getElementById('play-button');
  progressbarContainer = document.getElementById('progressbar-container');
  progressbar = document.getElementById('progressbar');
  video.load();
  video.addEventListener('canplay',function() {

    playButton.addEventListener('click',playOrPause, false);
    progressbarContainer.addEventListener('click',skip, false);

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
}
