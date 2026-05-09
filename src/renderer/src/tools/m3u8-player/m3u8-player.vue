<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import Hls from 'hls.js';

const videoRef = ref<HTMLVideoElement | null>(null);
const videoUrl = useStorage('m3u8-player:url', '');
const isPlaying = ref(false);
const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const playbackRate = ref(1);

let hls: Hls | null = null;

const demoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

function loadVideo() {
  if (!videoRef.value || !videoUrl.value) {
    return;
  }

  destroyHls();
  isLoading.value = true;
  hasError.value = false;
  errorMessage.value = '';
  isPlaying.value = false;

  const url = videoUrl.value;

  if (Hls.isSupported()) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
    });

    hls.loadSource(url);
    hls.attachMedia(videoRef.value);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      isLoading.value = false;
      videoRef.value?.play();
    });

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        isLoading.value = false;
        hasError.value = true;
        errorMessage.value = data.details || 'Failed to load video';
      }
    });
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = url;
    videoRef.value.addEventListener('loadedmetadata', () => {
      isLoading.value = false;
      videoRef.value?.play();
    });
  } else {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = 'Your browser does not support HLS playback';
  }
}

function destroyHls() {
  if (hls) {
    hls.destroy();
    hls = null;
  }
}

function togglePlay() {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }
}

function handleTimeUpdate() {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime;
    duration.value = videoRef.value.duration || 0;
  }
}

function handlePlay() {
  isPlaying.value = true;
}

function handlePause() {
  isPlaying.value = false;
}

function handleVolumeChange() {
  if (videoRef.value) {
    volume.value = videoRef.value.volume;
    isMuted.value = videoRef.value.muted;
  }
}

function setVolume(newVolume: number) {
  if (videoRef.value) {
    videoRef.value.volume = newVolume;
    videoRef.value.muted = false;
    isMuted.value = false;
  }
}

function toggleMute() {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    isMuted.value = videoRef.value.muted;
  }
}

function setPlaybackRate(rate: number) {
  if (videoRef.value) {
    videoRef.value.playbackRate = rate;
    playbackRate.value = rate;
  }
}

function seek(event: Event) {
  if (!videoRef.value) return;
  const input = event.target as HTMLInputElement;
  videoRef.value.currentTime = Number(input.value);
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function playDemo() {
  videoUrl.value = demoUrl;
  loadVideo();
}

function clearUrl() {
  videoUrl.value = '';
  destroyHls();
  if (videoRef.value) {
    videoRef.value.src = '';
  }
  hasError.value = false;
  isPlaying.value = false;
  currentTime.value = 0;
  duration.value = 0;
}

onBeforeUnmount(() => {
  destroyHls();
});
</script>

<template>
  <div>
    <div mb-4 flex gap-2 max-w-600px mx-auto>
      <n-input
        v-model:value="videoUrl"
        placeholder="Enter m3u8 video URL..."
        clearable
        @keyup.enter="loadVideo"
      >
        <template #prefix>
          <icon-mdi-link />
        </template>
      </n-input>
      <c-button type="primary" :disabled="!videoUrl" @click="loadVideo">
        <icon-mdi-play />
        <span ml-2>Play</span>
      </c-button>
      <c-button @click="playDemo">
        <icon-mdi-film />
        <span ml-2>Demo</span>
      </c-button>
    </div>

    <div class="video-container">
      <div v-if="isLoading" class="loading-overlay">
        <n-spin size="large" />
        <div mt-3>Loading...</div>
      </div>

      <div v-if="hasError" class="error-overlay">
        <icon-mdi-alert-circle size="48" />
        <div mt-3>{{ errorMessage }}</div>
        <c-button mt-4 @click="loadVideo">
          Retry
        </c-button>
      </div>

      <video
        ref="videoRef"
        class="video-player"
        controls
        playsinline
        @timeupdate="handleTimeUpdate"
        @play="handlePlay"
        @pause="handlePause"
        @volumechange="handleVolumeChange"
        @click="togglePlay"
      />
    </div>

    <div v-if="videoUrl" mt-4 class="controls-panel">
      <div flex items-center gap-3>
        <c-button @click="togglePlay">
          <icon-mdi-play v-if="!isPlaying" />
          <icon-mdi-pause v-else />
        </c-button>

        <div class="time-display">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>

        <div flex items-center gap-2 ml-4>
          <c-button size="small" @click="toggleMute">
            <icon-mdi-volume-high v-if="!isMuted && volume > 0.5" />
            <icon-mdi-volume-medium v-else-if="!isMuted && volume > 0" />
            <icon-mdi-volume-low v-else-if="!isMuted" />
            <icon-mdi-volume-off v-else />
          </c-button>
          <n-slider
            :value="isMuted ? 0 : volume"
            :min="0"
            :max="1"
            :step="0.01"
            style="width: 100px"
            @update:value="setVolume"
          />
        </div>

        <div flex items-center gap-2 ml-4>
          <span text-sm>Speed:</span>
          <n-select
            :value="playbackRate"
            :options="playbackRates.map(rate => ({ label: `${rate}x`, value: rate }))"
            style="width: 80px"
            size="small"
            @update:value="setPlaybackRate"
          />
        </div>
      </div>

      <div mt-3>
        <n-slider
          :value="currentTime"
          :min="0"
          :max="duration || 100"
          :step="0.1"
          @update:value="(val: number) => { if (videoRef) videoRef.currentTime = val }"
        />
      </div>
    </div>

    <n-alert v-if="!videoUrl" mt-4 type="info" max-w-600px mx-auto>
      Enter an m3u8 URL above or click Demo to test the player.
    </n-alert>
  </div>
</template>

<style lang="less" scoped>
.video-container {
  position: relative;
  width: 100%;
  background: #000;

  .video-player {
    width: 100%;
    max-height: 80vh;
    display: block;
  }

  .loading-overlay,
  .error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  .error-overlay {
    color: #f66;
  }
}

.time-display {
  font-family: monospace;
  font-size: 14px;
  color: #666;
}

.controls-panel {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.dark {
  .controls-panel {
    background: #2a2a2a;
  }

  .time-display {
    color: #999;
  }
}
</style>
