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
