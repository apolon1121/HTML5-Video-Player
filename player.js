window.addEventListener('load',function() {

  video = document.getElementById('video');
  playButton = document.getElementById('play-button');

  playButton.addEventListener('click',playOrPause, false);



}, false);

function playOrPause() {
  if(video.paused) {
    video.play();
    playButton.src='images/pause.png';
  } else {
    video.pause();
    playButton.src='images/play.png';
  }
}
