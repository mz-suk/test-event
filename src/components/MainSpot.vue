<script setup></script>

<template>
  <section class="spot">
    <header>
      <h1><img src="/img/logo.png" alt="logo" class="logo" /></h1>
      <p><img src="/img/logo-text.png" alt="logo" class="logo-text" /></p>
    </header>
    <h2><img src="/img/@title.png" alt="title" class="title" /></h2>
  </section>
</template>

<style scoped lang="scss">
.spot {
  background: #000 url('/img/bg-spot.png') no-repeat center center;
  background-size: cover;
  height: 100dvh;

  header {
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
}
</style>
