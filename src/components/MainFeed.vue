<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import movFeed from '../assets/mov-feed.mp4';
import { useSwipeCards } from '../composables/useSwipeCards';

const feedImages = [
  { id: 1, src: '/img/feed1.webp', alt: '피드 1' },
  { id: 2, src: '/img/feed2.webp', alt: '피드 2' },
  { id: 3, src: '/img/feed3.webp', alt: '피드 3' },
  { id: 4, src: '/img/feed4.webp', alt: '피드 4' },
];

const isAllSwiped = ref(false);
const swipedCount = ref(0);
const feedSection = ref(null);

let observer = null;
let isScrollLocked = false;
let wheelHandler;
let touchMoveHandler;
let keydownHandler;

const lockScroll = () => {
  if (isScrollLocked) return;
  isScrollLocked = true;

  wheelHandler = e => {
    e.preventDefault();
  };

  touchMoveHandler = e => {
    e.preventDefault();
  };

  keydownHandler = e => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];
    if (keys.includes(e.code) || keys.includes(e.key)) {
      e.preventDefault();
    }
  };

  window.addEventListener('wheel', wheelHandler, { passive: false });
  window.addEventListener('touchmove', touchMoveHandler, { passive: false });
  window.addEventListener('keydown', keydownHandler);
};

const unlockScroll = () => {
  if (!isScrollLocked) return;
  isScrollLocked = false;

  window.removeEventListener('wheel', wheelHandler);
  window.removeEventListener('touchmove', touchMoveHandler);
  window.removeEventListener('keydown', keydownHandler);

  wheelHandler = null;
  touchMoveHandler = null;
  keydownHandler = null;
};

// 모든 카드가 스와이프되었는지 확인
const checkAllSwiped = () => {
  swipedCount.value += 1;
  if (swipedCount.value >= feedImages.length) {
    isAllSwiped.value = true;
    unlockScroll();
  }
};

// 스와이프 카드 초기화
useSwipeCards({
  containerSelector: '.wrap-feed__container',
  cardSelector: '.feed-card',
  threshold: 100,
  onSwipeLeft: () => {
    checkAllSwiped();
  },
  onSwipeRight: () => {
    checkAllSwiped();
  },
});

onMounted(() => {
  if (!feedSection.value) return;

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        lockScroll();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });

        if (observer && feedSection.value) {
          observer.unobserve(feedSection.value);
        }
      }
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(feedSection.value);
});

onBeforeUnmount(() => {
  if (observer && feedSection.value) {
    observer.unobserve(feedSection.value);
  }
  observer = null;
  unlockScroll();
});
</script>

<template>
  <section class="wrap-feed" ref="feedSection">
    <div class="wrap-feed__container">
      <div v-for="feed in feedImages" :key="feed.id" class="feed-card">
        <div class="feed-card__inner">
          <img :src="feed.src" :alt="feed.alt" />
        </div>
      </div>
    </div>

    <!-- 모든 카드가 스와이프된 후 표시 -->
    <transition name="fade">
      <div v-if="isAllSwiped" class="wrap-feed__complete">
        <div class="complete-overlay"></div>
        <div class="complete-content">
          <div class="video-container" aria-hidden="true">
            <video class="video-bg" :src="movFeed" autoplay muted loop playsinline preload="auto" poster="/img/complete.webp"></video>
          </div>
          <p class="complete-text">오늘 피드런 완료!</p>
          <p class="complete-text-sub">테슬라 2000원을 <br />받으셨어요.</p>
          <img src="/img/feed6.webp" alt="완료 이미지" class="complete-image-sub" />
        </div>
        <div class="complete-button">
          <img src="/img/btn-feed.webp" alt="계좌 바로가기" />
        </div>
      </div>
    </transition>

    <div class="wrap-status">
      <img src="/img/feed7.webp" alt="상태 이미지" class="status-image" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.wrap {
  &-feed {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    padding: 3rem 1.6rem 6rem;
    overflow: hidden;

    // 모바일 대응
    @media (max-width: 480px) {
      padding: 2rem 1rem 5rem;
    }

    &__container {
      position: relative;
      width: 100%;
      max-width: 380px;
      height: 620px; // 높이 증가하여 뒤 카드 공간 확보
      perspective: 1500px;
      transform-style: preserve-3d;
      padding-bottom: 40px; // 하단 여백으로 뒤 카드가 보이는 공간 확보

      // 모바일 최적화
      @media (max-width: 480px) {
        max-width: 340px;
        height: 560px;
        padding-bottom: 30px;
      }

      @media (max-width: 360px) {
        max-width: 300px;
        height: 500px;
        padding-bottom: 25px;
      }
    }

    &__actions {
      display: flex;
      gap: 3rem;
      margin-top: 2rem;
      z-index: 10;
    }

    &__complete {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: all;
      flex-direction: column;
      gap: 20px;
    }
  }
  &-status {
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 18px;
    width: 100%;
    height: 156px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      user-select: none;
      pointer-events: none;
      display: block;
    }
  }
}

.complete {
  &-overlay {
    position: absolute;
    inset: 0;
    background-color: #000000cc;
    backdrop-filter: blur(10px);
    z-index: 1;
  }

  &-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    text-align: center;
    background-color: #000;
    width: calc(100% - 4rem);
    height: calc(100% - 14rem);
    border-radius: 40px;

    .video-container {
      width: 23rem;
    }

    .video-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-button {
    position: relative;
    z-index: 2;
    padding: 0 2rem;
  }

  &-image {
    max-width: 300px;
    width: 80%;
    height: auto;

    &-sub {
      width: 70px;
      height: 97px;
    }

    @media (max-width: 480px) {
      max-width: 250px;
    }
  }
  &-text {
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: -1px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    animation: fadeInUp 0.8s ease-out 0.3s both;
    color: #00bcf7;

    &-sub {
      font-size: 2.4rem;
      line-height: 1.2;
      letter-spacing: -1px;
      font-family: 'Spoqa Han Sans Neo', sans-serif;
      font-weight: 700;
      color: #ffffff;
    }

    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }
}

.feed-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 40px); // 하단 공간 확보하여 뒤 카드 보이게
  cursor: grab;
  transform-origin: center bottom;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  backface-visibility: hidden;
  user-select: none;

  @media (max-width: 480px) {
    height: calc(100% - 30px);
  }

  @media (max-width: 360px) {
    height: calc(100% - 25px);
  }

  &.moving {
    cursor: grabbing;
    transition: none !important;
  }

  &.removed {
    pointer-events: none;
  }

  &__inner {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    transition: box-shadow 0.3s ease, opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 1.2rem;

    @media (max-width: 480px) {
      padding: 1rem;
      border-radius: 16px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain; // 이미지 전체가 박스 안에 들어가도록
      object-position: center;
      user-select: none;
      pointer-events: none;
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}

// Fade 트랜지션
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 완료 화면 애니메이션
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulseGreen {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-50%) rotate(-15deg) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) rotate(-15deg) scale(1.1);
  }
}

@keyframes pulsePink {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-50%) rotate(15deg) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) rotate(15deg) scale(1.1);
  }
}
</style>
