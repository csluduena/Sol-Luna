const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = playPauseBtn.querySelector('i');
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.fa-volume-down');

// Variable para controlar el estado de reproducción
let isPlayAttemptInProgress = false;

// Establecer volumen inicial al 30%
audioPlayer.volume = 0.3;
volumeSlider.value = 30;

// Control de volumen
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audioPlayer.volume = value / 100;
    
    if (value > 50) {
        volumeIcon.className = 'fas fa-volume-up';
    } else if (value > 0) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-mute';
    }
});

async function togglePlay() {
    if (isPlayAttemptInProgress) return; // Prevenir múltiples intentos
    
    isPlayAttemptInProgress = true;
    
    try {
        if (audioPlayer.paused) {
            // Asegurarse de que el tiempo de reproducción esté al inicio
            if (audioPlayer.currentTime === audioPlayer.duration) {
                audioPlayer.currentTime = 0;
            }
            
            await audioPlayer.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    } catch (error) {
        console.log('Error en la reproducción:', error);
        // Restablecer el estado visual
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    } finally {
        isPlayAttemptInProgress = false;
    }
}

// Manejar el final de la reproducción
audioPlayer.addEventListener('ended', () => {
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
});

// Asegurarse de que la música comience pausada
window.addEventListener('DOMContentLoaded', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
});

// Manejar errores de audio
audioPlayer.addEventListener('error', (e) => {
    console.log('Error en el audio:', e);
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}); 