<script setup>
import lottie from 'lottie-web';
import { onMounted, onUnmounted, ref } from 'vue';
import movSpot from '../assets/mov-spot.mp4';
import titleAnimation from '../assets/title.json';

const titleContainer = ref(null);
let animationInstance = null;

onMounted(() => {
  if (!titleContainer.value) return;

  animationInstance = lottie.loadAnimation({
    container: titleContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: titleAnimation,
  });
});

onUnmounted(() => {
  if (!animationInstance) return;

  animationInstance.destroy();
  animationInstance = null;
});
</script>

<template>
  <section class="spot">
    <header>
      <h1><img src="/img/logo.png" alt="logo" class="logo" /></h1>
      <p><img src="/img/logo-text.png" alt="logo" class="logo-text" /></p>
    </header>

    <h2 class="object title">
      <div ref="titleContainer" class="title-lottie"></div>
    </h2>

    <div class="video-container" aria-hidden="true">
      <video class="video-bg" :src="movSpot" autoplay muted loop playsinline preload="auto" poster="/img/bg-spot.jpg"></video>
    </div>
  </section>
</template>

<style scoped lang="scss">
.spot {
  position: relative;
  height: 100dvh;
  overflow: hidden;

  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    padding: 0 1.2rem;

    .logo {
      height: 5.5rem;
    }

    .logo-text {
      height: 1.5rem;
      margin-top: 1.2rem;
    }
  }
  .object {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    will-change: transform, opacity, filter;
  }
  .title {
    top: 25%;
    width: 100%;
  }
  .title-lottie {
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    pointer-events: none;
  }
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    background: #000;
    pointer-events: none;
  }
  .video-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
