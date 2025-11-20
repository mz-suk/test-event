# GSAP 애니메이션 커스텀 훅 (Composable)

Vue 3와 GSAP을 활용한 재사용 가능한 애니메이션 커스텀 훅입니다.

## 📦 설치

```bash
pnpm add gsap
```

## 🚀 기본 사용법

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useGsapAnimations, useGsapHelpers } from '@/composables/useGsapAnimations';

const heroRef = ref(null);
const gsapAnimations = useGsapAnimations();
const { querySelectorAll, querySelector } = useGsapHelpers();

onMounted(() => {
  // 엘리먼트만 넣으면 자동 실행!
  const cards = querySelectorAll('.card');
  gsapAnimations.cardStagger(cards);
});
</script>

<template>
  <div ref="heroRef">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </div>
</template>
```

## 📚 API 레퍼런스

### 1️⃣ heroParallax - Hero 패럴럭스 애니메이션

Hero 섹션의 배경, 캐릭터 등에 패럴럭스 효과를 적용합니다.

```javascript
gsapAnimations.heroParallax({
  container: heroRef.value, // Hero 컨테이너
  background: backgroundRef.value, // 배경 엘리먼트
  runner: runnerRef.value, // 러너 엘리먼트
  mascot: mascotRef.value, // 마스코트 엘리먼트
  title: titleRef.value, // 타이틀
  subtitle: subtitleRef.value, // 서브타이틀
  onUpdate: progress => {
    // 진행률 콜백 (0~1)
    console.log(progress);
  },
});
```

### 2️⃣ reveal - 스크롤 Reveal 애니메이션

요소가 화면에 나타날 때 페이드 인 효과를 적용합니다.

```javascript
// 기본 사용
const elements = querySelectorAll('.reveal-item');
gsapAnimations.reveal(elements);

// 옵션 커스터마이징
gsapAnimations.reveal(elements, {
  from: { opacity: 0, y: 100, scale: 0.9, rotationX: 20 },
  to: { opacity: 1, y: 0, scale: 1, rotationX: 0 },
  duration: 0.6,
  stagger: 0.05,
  ease: 'power4.out',
  start: 'top 90%',
  once: true,
});
```

### 3️⃣ cardStagger - 카드 순차 등장 애니메이션

카드 그리드를 순차적으로 등장시킵니다.

```javascript
const cards = querySelectorAll('.card');
gsapAnimations.cardStagger(cards);

// 커스텀 옵션
gsapAnimations.cardStagger(cards, {
  from: { opacity: 0, y: 120, scale: 0.85, rotationY: -30, z: -100 },
  to: { opacity: 1, y: 0, scale: 1, rotationY: 0, z: 0 },
  duration: 0.7,
  stagger: 0.12,
  ease: 'power4.out',
  trigger: querySelector('.card-grid'), // 트리거 엘리먼트
  start: 'top 85%',
  once: true,
});
```

### 4️⃣ parallax - 패럴럭스 효과

개별 엘리먼트에 패럴럭스 효과를 적용합니다.

```javascript
const elements = querySelectorAll('.parallax-item');
gsapAnimations.parallax(elements, {
  y: -20, // Y축 이동 거리
  x: 0, // X축 이동 거리
  scrub: 1, // 스크롤 동기화 속도
  start: 'top bottom',
  end: 'bottom top',
});
```

### 5️⃣ timelineItems - 타임라인 아이템 애니메이션

타임라인 아이템을 순차적으로 등장시킵니다.

```javascript
const items = querySelectorAll('.timeline-item');
gsapAnimations.timelineItems(items);

// 커스텀
gsapAnimations.timelineItems(items, {
  from: { scale: 0.5, opacity: 0, y: 50, rotation: -180 },
  to: { scale: 1, opacity: 1, y: 0, rotation: 0 },
  duration: 0.5,
  stagger: 0.06,
  ease: 'back.out(2.5)',
});
```

### 6️⃣ listItems - 리스트 아이템 애니메이션

리스트 아이템을 순차적으로 등장시킵니다.

```javascript
const items = querySelectorAll('ul li');
gsapAnimations.listItems(items);

// 커스텀
gsapAnimations.listItems(items, {
  from: { opacity: 0, x: -40 },
  to: { opacity: 1, x: 0 },
  duration: 0.5,
  stagger: 0.08,
  ease: 'power2.out',
});
```

### 7️⃣ buttons - 버튼 애니메이션

버튼을 탄력적으로 등장시킵니다.

```javascript
const buttons = querySelectorAll('.btn');
gsapAnimations.buttons(buttons);

// 커스텀
gsapAnimations.buttons(buttons, {
  from: { scale: 0.8, opacity: 0, y: 30 },
  to: { scale: 1, opacity: 1, y: 0 },
  duration: 0.5,
  stagger: 0.1,
  ease: 'back.out(3)',
});
```

### 8️⃣ chips - Chip 배지 애니메이션

배지 칩을 회전하며 등장시킵니다.

```javascript
const chips = querySelectorAll('.chip');
gsapAnimations.chips(chips);

// 커스텀
gsapAnimations.chips(chips, {
  from: { scale: 0, opacity: 0, rotation: 180 },
  to: { scale: 1, opacity: 1, rotation: 0 },
  duration: 0.6,
  stagger: 0.08,
  ease: 'back.out(2.5)',
  delay: 0.3,
});
```

### 9️⃣ panelHeader - 패널 헤더 애니메이션

패널의 Eyebrow, Title, Period를 순차적으로 등장시킵니다.

```javascript
const header = querySelector('.panel__header');
gsapAnimations.panelHeader(header);

// 옵션
gsapAnimations.panelHeader(header, {
  start: 'top 85%',
  once: true,
});
```

### 🔟 ring - 링 회전 애니메이션

원형 링을 회전하며 등장시킵니다.

```javascript
const ring = querySelector('.ring');
gsapAnimations.ring(ring);

// 커스텀
gsapAnimations.ring(ring, {
  from: { scale: 0.3, rotation: -360, opacity: 0, y: 50 },
  to: { scale: 1, rotation: 0, opacity: 1, y: 0 },
  duration: 1,
  ease: 'elastic.out(1, 0.5)',
  start: 'top 75%',
});
```

### 1️⃣1️⃣ scrollProgress - 스크롤 진행률 추적

전체 스크롤 진행률을 추적합니다.

```javascript
gsapAnimations.scrollProgress(progress => {
  console.log('스크롤 진행률:', progress); // 0~1
});
```

## 🎯 실전 예제

### 예제 1: 간단한 카드 그리드

```vue
<script setup>
import { onMounted } from 'vue';
import { useGsapAnimations, useGsapHelpers } from '@/composables/useGsapAnimations';

const gsapAnimations = useGsapAnimations();
const { querySelectorAll } = useGsapHelpers();

onMounted(() => {
  const cards = querySelectorAll('.product-card');
  gsapAnimations.cardStagger(cards);
});
</script>

<template>
  <div class="product-grid">
    <div class="product-card">제품 1</div>
    <div class="product-card">제품 2</div>
    <div class="product-card">제품 3</div>
  </div>
</template>
```

### 예제 2: Hero 섹션

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useGsapAnimations, useGsapHelpers } from '@/composables/useGsapAnimations';

const heroRef = ref(null);
const backgroundRef = ref(null);
const characterRef = ref(null);

const gsapAnimations = useGsapAnimations();
const { querySelector } = useGsapHelpers();

onMounted(() => {
  gsapAnimations.heroParallax({
    container: heroRef.value,
    background: backgroundRef.value,
    runner: characterRef.value,
    title: querySelector('.hero-title', heroRef.value),
  });
});
</script>

<template>
  <section ref="heroRef" class="hero">
    <div ref="backgroundRef" class="hero-background"></div>
    <div ref="characterRef" class="hero-character"></div>
    <h1 class="hero-title">환영합니다</h1>
  </section>
</template>
```

### 예제 3: 종합 활용

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useGsapAnimations, useGsapHelpers } from '@/composables/useGsapAnimations';

const gsapAnimations = useGsapAnimations();
const { querySelectorAll, querySelector } = useGsapHelpers();

onMounted(() => {
  // 1. 헤더 애니메이션
  const headers = querySelectorAll('.section-header');
  headers.forEach(header => gsapAnimations.panelHeader(header));

  // 2. 카드 애니메이션
  const cards = querySelectorAll('.feature-card');
  gsapAnimations.cardStagger(cards);

  // 3. 리스트 애니메이션
  const listItems = querySelectorAll('.benefit-list li');
  gsapAnimations.listItems(listItems);

  // 4. 버튼 애니메이션
  const buttons = querySelectorAll('.cta-button');
  gsapAnimations.buttons(buttons);

  // 5. 패럴럭스
  const sections = querySelectorAll('.section');
  gsapAnimations.parallax(sections, { y: -30 });
});

onUnmounted(() => {
  gsapAnimations.cleanup();
});
</script>
```

## 🎨 CSS 설정

3D 애니메이션을 위해 다음 스타일을 추가하세요:

```css
.animated-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.animated-element {
  transform-style: preserve-3d;
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

## ⚙️ 옵션 기본값

각 애니메이션의 기본 옵션은 커스텀 훅 코드에서 확인할 수 있습니다.

## 🔧 Cleanup

컴포넌트 언마운트 시 반드시 cleanup 함수를 호출하세요:

```javascript
onUnmounted(() => {
  gsapAnimations.cleanup();
});
```

## 💡 Tips

1. **엘리먼트만 넣으면 동작**: 대부분의 애니메이션은 엘리먼트만 전달하면 기본 옵션으로 동작합니다.
2. **옵션은 선택적**: 필요한 옵션만 오버라이드하세요.
3. **헬퍼 함수 활용**: `querySelectorAll`, `querySelector`로 DOM 쿼리를 간편하게.
4. **체이닝 가능**: 여러 애니메이션을 조합해서 사용 가능합니다.

## 📝 라이선스

MIT
