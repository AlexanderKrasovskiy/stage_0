// IMPORTS
import tracks from './support/tracks.js';


// CONSTANTS
const audio = document.querySelector('audio');
const bgImg = document.querySelector('.bg-image');
const coverImg = document.querySelector('.cover-img');

const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward');
const backwardBtn = document.querySelector('.backward');

const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');

const durationTime = document.querySelector('.duration-time');
const currentTime = document.querySelector('.current-time');
const progressSlider = document.querySelector('.progress-bar');

const volumeOutput = document.querySelector('.volume-output');
const volumeSlider = document.querySelector('.volume-slider')
const volumeBtn = document.querySelector('.volume-btn');


// STATE
let isPlaying = false;
let playNum = 0;


// EVENT LISTENERS
playBtn.addEventListener('click', playAudio);

audio.addEventListener('loadedmetadata', () => {
  durationTime.innerText = countTime(audio.duration);
  progressSlider.max = Math.floor(audio.duration);
});

forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

progressSlider.addEventListener('input', setProgress);

audio.addEventListener('ended', nextSong);

volumeBtn.addEventListener('click', muteSound);

volumeSlider.addEventListener('input', setVolume);


// FUNCTIONS
function playAudio() {
  if (isPlaying) {
    audio.pause();
    playBtn.classList.remove('play');
    coverImg.classList.remove('play');
    isPlaying = false;
  } else {
    audio.play();
    playBtn.classList.add('play');
    coverImg.classList.add('play');
    isPlaying = true
  }
};

loadSong(tracks[playNum]);

function loadSong(songObj) {
  songArtist.innerText = songObj.artist;
  songTitle.innerText = songObj.title;
  bgImg.src = `./assets/img/${songObj.cover}`;
  coverImg.src = `./assets/img/${songObj.cover}`;
  audio.src = `./assets/audio/${songObj.audio}`;
  currentTime.innerText = '0:00';
  isPlaying = false;
};

function countTime(num) {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num % 60);
  let textMin = ('0' + min).slice(-1);
  let textSec = ('00' + sec).slice(-2);
  return `${textMin}:${textSec}`
};

function prevSong() {
  playNum--;
  if (playNum < 0) playNum = tracks.length - 1;
  loadSong(tracks[playNum]);
  playAudio();
};

function nextSong() {
  playNum++;
  if (playNum > (tracks.length - 1)) playNum = 0;
  loadSong(tracks[playNum]);
  playAudio();
};

function updateProgress() {
  progressSlider.value = Math.floor(audio.currentTime);
  currentTime.innerText = countTime(Math.floor(audio.currentTime));
};

function setProgress(e) {
  audio.currentTime = e.target.valueAsNumber;
};

function muteSound(e) {
  let classList = e.target.classList;
  if (classList.contains('muted')) {
    classList.remove('muted')
    audio.muted = false
  } else {
    classList.add('muted')
    audio.muted = true
  }
};

function setVolume(e) {
  volumeOutput.innerText = `${e.target.valueAsNumber}%`;
  audio.volume = e.target.valueAsNumber / 100;
};