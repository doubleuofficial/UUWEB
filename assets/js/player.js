// Audio Player Engine Architecture for DoubleU Discography
document.addEventListener('DOMContentLoaded', () => {
  // Elements Cache Setup
  const audio = document.getElementById('audio-engine');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeLabel = document.getElementById('current-time');
  const durationTimeLabel = document.getElementById('duration-time');
  const muteBtn = document.getElementById('mute-btn');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');

  // Internal State Tracking
  let previousVolume = 0.8;

  // Convert raw track seconds into standard digital minutes/seconds readout
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Toggle Core Playback Engine Hardware State
  function togglePlay() {
    if (audio.paused) {
      audio.play()
        .then(() => updateUIState(true))
        .catch(err => console.warn("Playback initialization blocked by client security parameters:", err));
    } else {
      audio.pause();
      updateUIState(false);
    }
  }

  // UI Interactive Playback Icon Switcher
  function updateUIState(isPlaying) {
    if (!playIcon) return;
    if (isPlaying) {
      playIcon.setAttribute('data-lucide', 'pause');
      playIcon.classList.remove('translate-x-0.5');
      playPauseBtn.setAttribute('aria-label', 'Pause Track');
    } else {
      playIcon.setAttribute('data-lucide', 'play');
      playIcon.classList.add('translate-x-0.5');
      playPauseBtn.setAttribute('aria-label', 'Play Track');
    }
    // Force Lucide core to evaluate DOM and inject matching SVGs
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Monitor Track Playhead Realtime Changes
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const currentPercentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = currentPercentage;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  });

  // Hydrate Total Duration Constraints when Media Engine Resolves Stream
  audio.addEventListener('loadedmetadata', () => {
    durationTimeLabel.textContent = formatTime(audio.duration);
  });

  // User Timeline Slider Scrubber Mapping 
  progressBar.addEventListener('input', () => {
    if (!audio.duration) return;
    const targetTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = targetTime;
    currentTimeLabel.textContent = formatTime(targetTime);
  });

  // Handle Level Changes from Linear Volume Slider
  volumeSlider.addEventListener('input', (e) => {
    const targetVol = parseFloat(e.target.value);
    audio.volume = targetVol;
    audio.muted = (targetVol === 0);
    updateVolumeIcon(targetVol, audio.muted);
  });

  // Master Mute Circuit Switcher
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      previousVolume = audio.volume;
      volumeSlider.value = 0;
    } else {
      audio.volume = previousVolume === 0 ? 0.8 : previousVolume;
      volumeSlider.value = audio.volume;
    }
    updateVolumeIcon(audio.volume, audio.muted);
  });

  // Multi-State Graphical Icon Modifier
  function updateVolumeIcon(volumeValue, isMuted) {
    if (!volumeIcon) return;
    if (isMuted || volumeValue === 0) {
      volumeIcon.setAttribute('data-lucide', 'volume-x');
    } else if (volumeValue < 0.5) {
      volumeIcon.setAttribute('data-lucide', 'volume-1');
    } else {
      volumeIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Automatic End-of-Stream Clean Reset Loop
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    updateUIState(false);
    progressBar.value = 0;
    currentTimeLabel.textContent = "0:00";
  });

  // Wire Click Handler Directly to Master Play Event Loop
  playPauseBtn.addEventListener('click', togglePlay);

  // Initialize Icons on First Render Pass
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Catch edge-case where metadata caches before execution thread completes
  if (audio.readyState >= 1) {
    durationTimeLabel.textContent = formatTime(audio.duration);
  }
});
