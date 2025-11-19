import Lenis from 'lenis';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.scss';

const lenis = new Lenis({
  lerp: 0.08,
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 1.05,
  smoothTouch: false,
});

lenis.on('scroll', event => {
  window.dispatchEvent(new CustomEvent('smooth-scroll', { detail: event }));
});

const loop = time => {
  lenis.raf(time);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

createApp(App).mount('#app');
