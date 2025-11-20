<script setup></script>

<template>
  <section class="spot">
    <header>
      <h1><img src="/img/logo.png" alt="logo" class="logo" /></h1>
      <p><img src="/img/logo-text.png" alt="logo" class="logo-text" /></p>
    </header>

    <h2 class="object title"><img src="/img/@title.png" alt="title" /></h2>

    <img src="/img/spot-boy.png" alt="boy" class="object boy" />
    <img src="/img/spot-bear.png" alt="bear" class="object bear" />
    <img src="/img/spot-cat.png" alt="cat" class="object cat" />

    <img src="/img/deco2.png" alt="deco2" class="object deco2" />

    <div class="particles">
      <img src="/img/particle-1.png" alt="particle" class="object particle1" />
      <img src="/img/particle-2.png" alt="particle" class="object particle2" />
      <img src="/img/particle-3.png" alt="particle" class="object particle3" />
      <img src="/img/particle-4.png" alt="particle" class="object particle4" />
      <img src="/img/particle-5.png" alt="particle" class="object particle5" />
      <img src="/img/particle-6.png" alt="particle" class="object particle6" />
      <img src="/img/particle-7.png" alt="particle" class="object particle7" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.spot {
  position: relative;
  background: #000 url('/img/bg-spot.png') no-repeat center center;
  background-size: cover;
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
  .boy {
    top: 65%;
    left: 40%;
    width: 25.3rem;
    z-index: 9;
    animation: raceBoy 2s linear infinite;
  }
  .bear {
    top: 62%;
    left: 75%;
    width: 11.9rem;
    z-index: 8;
    animation: raceBear 6s linear infinite;
  }
  .cat {
    top: 61%;
    left: 7%;
    height: 10.3rem;
    z-index: 7;
    animation: raceCat 7s linear infinite;
  }
  .deco2 {
    top: 21%;
    left: 50%;
    width: 100%;
    z-index: 1;
    animation: deco2 10s ease infinite;
  }
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .object {
      z-index: 5;
      opacity: 0.65;
      mix-blend-mode: screen;
      filter: drop-shadow(0 0 0.4rem rgba(255, 255, 255, 0.35));
    }
  }
  .particle1 {
    top: 38%;
    left: 88%;
    width: 5.7rem;
    animation: particleDriftA 12s ease-in-out infinite alternate, particleGlow 7s ease-in-out infinite;
  }
  .particle2 {
    left: 8%;
    width: 3.7rem;
    animation: particleDriftB 9s ease-in-out infinite alternate, particleGlow 5.6s ease-in-out infinite;
    animation-delay: 1s;
  }
  .particle3 {
    top: 4%;
    left: 71%;
    width: 4rem;
    animation: particleDriftC 11s ease-in-out infinite alternate-reverse, particleGlow 6.8s ease-in-out infinite;
  }
  .particle4 {
    top: 6%;
    left: 31%;
    width: 2rem;
    animation: particleDriftD 8s ease-in-out infinite alternate, particleGlow 5s ease-in-out infinite;
  }
  .particle5 {
    top: 21%;
    left: 7%;
    width: 1.8rem;
    animation: particleDriftB 10s ease-in-out infinite alternate-reverse, particleGlow 6.4s ease-in-out infinite;
  }
  .particle6 {
    top: 26%;
    left: 26%;
    width: 2.4rem;
    animation: particleDriftE 13s ease-in-out infinite alternate, particleGlow 7.2s ease-in-out infinite;
  }
  .particle7 {
    top: 17%;
    left: 92%;
    width: 4.6rem;
    animation: particleDriftF 9.5s ease-in-out infinite alternate, particleGlow 6s ease-in-out infinite;
  }
  @keyframes raceBoy {
    0% {
      transform: translate(-50%, -50%);
    }
    20% {
      transform: translate(-48%, -50%) rotate(1deg);
    }
    45% {
      transform: translate(-50%, -50%) rotate(0);
    }
    70% {
      transform: translate(-52%, -50%) rotate(-1deg);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
  @keyframes raceBear {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      transform: translate(-80%, -55%) rotate(-3deg) scale(0.9);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes raceCat {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    60% {
      transform: translate(-80%, -50%) scale(0.8);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes deco2 {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-45%, -55%) rotate(-10deg) scale(1.1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes particleDriftA {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
    40% {
      transform: translate(-50%, -50%) translate3d(2vw, -2vh, 0) scale(0.94) rotate(4deg);
    }
    70% {
      transform: translate(-50%, -50%) translate3d(-1vw, 1vh, 0) scale(1.06) rotate(-2deg);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }
  @keyframes particleDriftB {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
    35% {
      transform: translate(-50%, -50%) translate3d(-1.5vw, -3vh, 0) scale(1.05) rotate(-6deg);
    }
    65% {
      transform: translate(-50%, -50%) translate3d(1.2vw, 1.5vh, 0) scale(0.9) rotate(3deg);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }
  @keyframes particleDriftC {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.95) rotate(0deg);
    }
    30% {
      transform: translate(-50%, -50%) translate3d(-2.2vw, 2vh, 0) scale(1.05) rotate(-2deg);
    }
    55% {
      transform: translate(-50%, -50%) translate3d(1.6vw, -1vh, 0) scale(0.9) rotate(4deg);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.95) rotate(0deg);
    }
  }
  @keyframes particleDriftD {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
      filter: drop-shadow(0 0 0.4rem rgba(255, 255, 255, 0.35));
    }
    50% {
      transform: translate(-50%, -50%) translate3d(1vw, -1vh, 0) scale(1.08) rotate(-8deg);
      filter: drop-shadow(0 0 0.7rem rgba(255, 255, 255, 0.45));
    }
    100% {
      transform: translate(-50%, -50%) translate3d(-1vw, 1vh, 0) scale(0.92) rotate(6deg);
      filter: drop-shadow(0 0 0.4rem rgba(255, 255, 255, 0.35));
    }
  }
  @keyframes particleDriftE {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.9) rotate(0deg);
    }
    45% {
      transform: translate(-50%, -50%) translate3d(2.5vw, 1vh, 0) scale(1.05) rotate(5deg);
    }
    80% {
      transform: translate(-50%, -50%) translate3d(-1.8vw, -1.5vh, 0) scale(0.96) rotate(-4deg);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.9) rotate(0deg);
    }
  }
  @keyframes particleDriftF {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
    25% {
      transform: translate(-50%, -50%) translate3d(-1vw, 2vh, 0) scale(1.1) rotate(3deg);
    }
    55% {
      transform: translate(-50%, -50%) translate3d(1.6vw, -1vh, 0) scale(0.92) rotate(-5deg);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1) rotate(0deg);
    }
  }
  @keyframes particleGlow {
    0% {
      opacity: 0.4;
      filter: drop-shadow(0 0 0.3rem rgba(255, 255, 255, 0.35)) blur(0px);
    }
    40% {
      opacity: 0.8;
      filter: drop-shadow(0 0 0.8rem rgba(255, 255, 255, 0.55)) blur(1px);
    }
    70% {
      opacity: 0.55;
      filter: drop-shadow(0 0 0.5rem rgba(255, 255, 255, 0.4)) blur(0.5px);
    }
    100% {
      opacity: 0.4;
      filter: drop-shadow(0 0 0.3rem rgba(255, 255, 255, 0.35)) blur(0px);
    }
  }
}
</style>
