document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.music-player .fa-play');
    const audioPlayer = new Audio('audio/una-lagrima-que-dar.mp3'); // Ruta a tu archivo de audio
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

        audioPlayer.addEventListener('ended', () => {
            isPlaying = false;
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        });
    }

    // Puedes añadir más interactividad aquí, como:
    // - Abrir enlaces de las plataformas en nuevas pestañas.
    // - Mostrar/ocultar secciones con efectos.
    // - Validación de formularios si agregas uno.
});
