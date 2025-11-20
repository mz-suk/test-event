import Lenis from 'lenis';
import { createApp } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.vue';
import './assets/main.scss';

// GSAP ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

// Lenis 초기화
const lenis = new Lenis({
  lerp: 0.08,
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 1.05,
  smoothTouch: false,
});

// Lenis와 GSAP ScrollTrigger 통합
lenis.on('scroll', event => {
  ScrollTrigger.update();
  window.dispatchEvent(new CustomEvent('smooth-scroll', { detail: event }));
});

// 애니메이션 루프
const loop = time => {
  lenis.raf(time);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

// Vue 앱 마운트
createApp(App).mount('#app');
