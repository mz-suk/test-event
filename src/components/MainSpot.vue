<script setup></script>

<template>
  <section class="spot">
    <header>
      <h1><img src="/img/logo.png" alt="logo" class="logo" /></h1>
      <p><img src="/img/logo-text.png" alt="logo" class="logo-text" /></p>
    </header>

    <!-- <h2 class="object title"><img src="/img/@title.png" alt="title" /></h2> -->
  </section>
</template>

<style scoped lang="scss">
.spot {
  position: relative;
  background: #000 url('/img/bg-spot.jpg') no-repeat center center;
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
}
</style>
