const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playlist = document.getElementById('playlist');

const songs = [
    { title: 'Greedy', artist: 'Tate McRae', src: 'songs/greedy.mp3', cover: 'covers/greedy.jpg' },
    { title: 'Havana', artist: 'Camila Cabello', src: 'songs/havana.mp3', cover: 'covers/havana.jpg' },
    { title: 'Out of My League', artist: 'Fitz and The Tantrums', src: 'songs/outofmyleague.mp3', cover: 'covers/out_of_my_league.jpg' },
    { title: 'South of the Border', artist: 'Ed Sheeran', src: 'songs/southoftheborder.mp3', cover: 'covers/south_of_the_border.jpg' },
    { title: 'Espresso', artist: 'Sabrina Carpenter', src: 'songs/espresso.mp3', cover: 'covers/espresso.jpg' },
    { title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', src: 'songs/iwannabeyours.mp3', cover: 'covers/i_wanna_be_yours.jpg' },
];

let currentSongIndex = 0;
let isPlaying = false;

// Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
    document.body.style.setProperty('--background-image', `url(${song.cover})`);
    document.body.style.backgroundImage = `url(${song.cover})`;
}

function updatePlaylist() {
    const items = playlist.querySelectorAll('li');
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSongIndex) {
            item.classList.add('active');
        }
    });
}

loadSong(songs[currentSongIndex]);
updatePlaylist();

// Play or pause the song
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Play the song
function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
}

// Pause the song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
}

// Update progress bar
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress
progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Previous song
prevBtn.addEventListener('click', prevSong);

// Next song
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    updatePlaylist();
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    updatePlaylist();
    playSong();
}

// Playlist click
playlist.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentSongIndex = Array.from(playlist.children).indexOf(e.target);
        loadSong(songs[currentSongIndex]);
        updatePlaylist();
        playSong();
    }
});
