document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.music-player .fa-play');
    // Asegúrate de tener un archivo de audio en la ruta 'audio/una-lagrima-que-dar.mp3'
    const audioPlayer = new Audio('audio/una-lagrima-que-dar.mp3'); 
    let isPlaying = false;

    if (playButton) {
        playButton.addEventListener('click', () => {
            if (isPlaying) {
                audioPlayer.pause();
                playButton.classList.remove('fa-pause');
                playButton.classList.add('fa-play');
            } else {
                audioPlayer.play();
                playButton.classList.remove('fa-play');
                playButton.classList.add('fa-pause');
            }
            isPlaying = !isPlaying;
        });

        // Resetea el botón cuando la canción termina
        audioPlayer.addEventListener('ended', () => {
            isPlaying = false;
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        });
    }
});
