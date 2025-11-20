<script setup>
import { onMounted, onUnmounted } from 'vue';
import MainContents from './components/MainContents.vue';
import MainFeed from './components/MainFeed.vue';
import MainSpot from './components/MainSpot.vue';

let scrollHandler;

onMounted(() => {
  const spot = document.querySelector('.spot');
  if (!spot) return;

  const updateParallax = event => {
    const y = event?.detail?.scroll ?? window.scrollY ?? window.pageYOffset ?? 0;

    spot.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
  };

  scrollHandler = updateParallax;

  updateParallax();

  window.addEventListener('smooth-scroll', updateParallax);
  window.addEventListener('scroll', updateParallax, { passive: true });
});

onUnmounted(() => {
  if (!scrollHandler) return;

  window.removeEventListener('smooth-scroll', scrollHandler);
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <div class="event-page">
    <MainSpot />

    <MainContents />

    <MainFeed />
  </div>
</template>

<style scoped lang="scss">
.event-page {
  position: relative;
  min-height: 100dvh;
  max-width: 55rem;
  margin: 0 auto;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: #000 url('/img/bg-spot.webp') 50% 50% / cover no-repeat;
  }
}
</style>
