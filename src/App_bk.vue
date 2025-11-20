<script setup>
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue';
import MainContents from './components/MainContents.vue';
import { useGsapAnimations, useGsapHelpers } from './composables/useGsapAnimations';

const isClient = typeof window !== 'undefined';
const heroRef = ref(null);
const heroProgress = ref(0);
const activeTimelineIndex = ref(0);

const heroChips = [
  { title: '매일 출석하면', value: '+1 피드런' },
  { title: '주간 완주 시', value: '추첨 리워드' },
  { title: '친구 초대 시', value: '추가 응모 1회' },
];

const infoCards = [
  {
    title: '참여 대상',
    description: '만 19세 이상 개인 및 외국인 고객(법인·휴면·미성년 제외)',
  },
  {
    title: '참여 방법',
    description: '이벤트 참여하기 버튼을 누르고 매일 앱 피드를 열면 자동으로 출석 처리됩니다.',
  },
  {
    title: '완주 기준',
    description: '주 5회 출석 시 1회 완주 인정, 월 최대 4회까지 누적되어 리워드가 제공됩니다.',
  },
];

const howToSteps = [
  { title: '이벤트 등록', description: '참여하기 버튼 클릭 후 약관 동의만 하면 바로 등록됩니다.' },
  { title: '피드 확인', description: '매일 오전 8시 발송되는 피드를 열람해 출석을 완료하세요.' },
  { title: '혜택 수령', description: '완주 즉시 알림을 통해 리워드를 지급하고 현황을 알려드립니다.' },
];

const benefitItems = ['주간 완주 고객 전원 스타벅스 기프티콘 증정', '월간 3회 완주 시 인기 해외주식 1주 추첨', '피드 공유 시 친구와 동시에 추가 응모 가능'];

const timelineDays = [
  { day: '월', label: '18회 달성' },
  { day: '화', label: '19회 예정' },
  { day: '수', label: '20회 예정' },
  { day: '목', label: '21회 예정' },
  { day: '금', label: '22회 예정' },
  { day: '토', label: '쉬어가기' },
  { day: '일', label: '보너스 데이' },
];

const shareActions = [
  { label: '마케팅 수신동의', helper: '혜택 알림 빠르게 받기' },
  { label: '내 정보 확인하기', helper: '참여 내용 다시 확인' },
];

const reportCards = [
  {
    title: 'BTS 특집! 하이브 추가 상승세',
    summary: '한 달 만에 20% 오른 하이브, 실적과 모멘텀을 한 번에 체크하세요.',
    image:
      "linear-gradient(135deg, rgba(3, 8, 36, 0.4), rgba(12, 33, 96, 0.4)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80')",
  },
  {
    title: '목표 달성형 ETF 살펴보기',
    summary: '월간 수익률이 상위권인 목표 달성형 ETF 3선을 추천합니다.',
    image:
      "linear-gradient(135deg, rgba(15, 23, 42, 0.45), rgba(33, 150, 243, 0.4)), url('https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=900&q=80')",
  },
  {
    title: '핀테크와 AI가 만난 시장',
    summary: '글로벌 AI 결제 기업의 성장률과 국내 수혜주를 정리했습니다.',
    image:
      "linear-gradient(135deg, rgba(9, 9, 34, 0.45), rgba(76, 29, 149, 0.45)), url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80')",
  },
];

const noticeList = [
  '본 이벤트는 신한투자증권 앱에서 참여 완료한 고객에 한합니다.',
  '리워드는 제세공과금이 발생할 수 있으며 고객 부담입니다.',
  '이벤트 내용은 사전 고지 후 변경되거나 조기 종료될 수 있습니다.',
  '부정 참여가 확인될 경우 지급된 혜택은 회수될 수 있습니다.',
];

const progressRatio = computed(() => (activeTimelineIndex.value + 1) / timelineDays.length);
const progressPercent = computed(() => Math.round(progressRatio.value * 100));

const progressRingStyle = computed(() => {
  const degree = Math.min(360, progressRatio.value * 360);
  return {
    background: `conic-gradient(var(--accent-primary) ${degree}deg, rgba(15, 23, 42, 0.08) ${degree}deg)`,
  };
});

const heroBackgroundRef = ref(null);
const runnerRef = ref(null);
const mascotRef = ref(null);
const revealElements = ref([]);

// GSAP 커스텀 훅 초기화
const gsapAnimations = useGsapAnimations();
const { querySelectorAll, querySelector } = useGsapHelpers();

const registerReveal = el => {
  if (!el || revealElements.value.includes(el)) return;
  revealElements.value.push(el);
};

onMounted(async () => {
  if (!isClient) return;

  await nextTick();

  // ============================================
  // 1. Hero 패럴럭스 애니메이션
  // ============================================
  gsapAnimations.heroParallax({
    container: heroRef.value,
    background: heroBackgroundRef.value,
    runner: runnerRef.value,
    mascot: mascotRef.value,
    title: querySelector('.hero__title', heroRef.value),
    subtitle: querySelector('.hero__subtitle', heroRef.value),
    onUpdate: progress => {
      heroProgress.value = progress;
    },
  });

  // ============================================
  // 2. Hero Chips 애니메이션
  // ============================================
  const heroChipElements = querySelectorAll('.hero__chips .chip');
  gsapAnimations.chips(heroChipElements);

  // ============================================
  // 3. Reveal 애니메이션 (전역)
  // ============================================
  gsapAnimations.reveal(revealElements.value);

  // ============================================
  // 4. 타임라인 진행률 추적
  // ============================================
  gsapAnimations.scrollProgress(progress => {
    activeTimelineIndex.value = Math.min(timelineDays.length - 1, Math.floor(progress * timelineDays.length));
  });

  // ============================================
  // 5. 타임라인 Day 애니메이션
  // ============================================
  const timelineDayElements = querySelectorAll('.timeline__day');
  gsapAnimations.timelineItems(timelineDayElements);

  // ============================================
  // 6. Report Cards 애니메이션
  // ============================================
  const reportCards = querySelectorAll('.report-card');
  gsapAnimations.cardStagger(reportCards);
  gsapAnimations.parallax(reportCards, { y: -15, scrub: 0.5 });

  // ============================================
  // 7. Info Cards 애니메이션
  // ============================================
  const infoCards = querySelectorAll('.info-card');
  gsapAnimations.cardStagger(infoCards, {
    from: { opacity: 0, x: -80, rotationY: -45, scale: 0.8 },
    to: { opacity: 1, x: 0, rotationY: 0, scale: 1 },
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    trigger: querySelector('.info-grid'),
  });

  // ============================================
  // 8. How-to Steps 애니메이션
  // ============================================
  const howtoSteps = querySelectorAll('.howto-step');
  gsapAnimations.cardStagger(howtoSteps, {
    from: { opacity: 0, x: 100, scale: 0.7, rotation: 15 },
    to: { opacity: 1, x: 0, scale: 1, rotation: 0 },
    duration: 0.65,
    stagger: 0.12,
    ease: 'back.out(2)',
    trigger: querySelector('.howto-steps'),
  });

  // ============================================
  // 9. Benefit Ring 애니메이션
  // ============================================
  const benefitRing = querySelector('.benefit__ring');
  gsapAnimations.ring(benefitRing);

  // Benefit 섹션 패럴럭스
  const benefitSection = querySelector('.benefit');
  gsapAnimations.parallax(benefitSection, { y: -30, scrub: 1 });

  // ============================================
  // 10. CTA 버튼 애니메이션
  // ============================================
  const ctaButtons = querySelectorAll('.cta');
  gsapAnimations.buttons(ctaButtons);

  // ============================================
  // 11. Panel Headers 애니메이션
  // ============================================
  const panelHeaders = querySelectorAll('.panel__header');
  panelHeaders.forEach(header => {
    gsapAnimations.panelHeader(header);
  });

  // ============================================
  // 12. Share Buttons 애니메이션
  // ============================================
  const shareButtons = querySelectorAll('.share-button');
  gsapAnimations.buttons(shareButtons, {
    from: { opacity: 0, scale: 0.9, y: 40 },
    trigger: querySelector('.share-actions'),
    start: 'top 90%',
  });

  // ============================================
  // 13. Notice List 애니메이션
  // ============================================
  const noticeItems = querySelectorAll('.notice-list li');
  gsapAnimations.listItems(noticeItems, {
    trigger: querySelector('.notice-list'),
  });

  // ============================================
  // 14. Benefit List 애니메이션
  // ============================================
  const benefitListItems = querySelectorAll('.benefit__list li');
  gsapAnimations.listItems(benefitListItems, {
    from: { opacity: 0, x: 40, scale: 0.9 },
    to: { opacity: 1, x: 0, scale: 1 },
    trigger: querySelector('.benefit__list'),
    start: 'top 88%',
  });

  // ============================================
  // 15. Panel 패럴럭스
  // ============================================
  const panels = querySelectorAll('.panel');
  panels.forEach((panel, index) => {
    const direction = index % 2 === 0 ? -20 : -30;
    gsapAnimations.parallax(panel, { y: direction, scrub: 1.5 });
  });
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  if (!isClient) return;
  gsapAnimations.cleanup();
  revealElements.value = [];
});
</script>

<template>
  <div class="event-page">
    <!-- <section class="spot">
      <header>
        <h1><img src="/img/logo.png" alt="logo" class="logo" /></h1>
        <p><img src="/img/logo-text.png" alt="logo" class="logo-text" /></p>
      </header>
      <h2><img src="/img/@title.png" alt="title" class="title" /></h2>
    </section> -->

    <!-- <MainContents /> -->

    <section ref="heroRef" class="hero">
      <div ref="heroBackgroundRef" class="hero__background" />
      <div class="hero__grid">
        <div>
          <p class="hero__badge">신한투자증권 · FeedRun 2025</p>
          <h1 class="hero__title">매일매일 피드런</h1>
          <p class="hero__subtitle">매일 열고 본 순간 완료! 완주하면 주식이 쏟아집니다.</p>
          <button class="cta primary" type="button">이벤트 참여하기</button>
          <div class="hero__chips">
            <span v-for="chip in heroChips" :key="chip.title" class="chip">
              <strong>{{ chip.title }}</strong>
              <span>{{ chip.value }}</span>
            </span>
          </div>
        </div>
        <div class="hero__visual">
          <div ref="runnerRef" class="runner"></div>
          <div ref="mascotRef" class="mascot"></div>
        </div>
      </div>
    </section>

    <section class="panel reveal" :ref="registerReveal">
      <div class="panel__header">
        <div>
          <p class="panel__eyebrow">이벤트 안내</p>
          <p class="panel__title">피드를 열수록 리워드가 가까워집니다</p>
          <p class="panel__period">2025.11.04(월) ~ 2025.12.31(수)</p>
        </div>
        <button class="cta secondary" type="button">참여 내역 확인</button>
      </div>
      <div class="info-grid">
        <article v-for="card in infoCards" :key="card.title" class="info-card reveal" :ref="registerReveal">
          <strong>{{ card.title }}</strong>
          <p>{{ card.description }}</p>
        </article>
      </div>
      <div class="howto-steps">
        <article v-for="(step, index) in howToSteps" :key="step.title" class="howto-step reveal" :ref="registerReveal">
          <span class="howto-step__index">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </section>

    <section class="panel reveal" :ref="registerReveal">
      <div class="panel__header">
        <div>
          <p class="panel__eyebrow">이벤트 혜택</p>
          <p class="panel__title">혜택 확인하기</p>
        </div>
      </div>
      <div class="benefit">
        <div class="benefit__ring" :style="progressRingStyle">
          <div class="benefit__ring-value">{{ progressPercent }}%</div>
        </div>
        <div>
          <p>피드런 완주율 {{ progressPercent }}% 달성! 남은 미션을 진행하면 추가 리워드가 열립니다.</p>
          <ul class="benefit__list">
            <li v-for="item in benefitItems" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="panel timeline reveal" :ref="registerReveal">
      <div class="panel__header">
        <div>
          <p class="panel__eyebrow">이번 주 프로그레스</p>
          <p class="panel__title">이번 주 피드런 현황</p>
          <p class="panel__period">고객님만 3연속 완주까지 단 2회 남았습니다.</p>
        </div>
      </div>
      <div class="timeline__track">
        <div
          v-for="(day, index) in timelineDays"
          :key="day.day"
          class="timeline__day reveal"
          :class="{ 'is-active': index <= activeTimelineIndex }"
          :ref="registerReveal"
        >
          <div class="timeline__dot" />
          <div class="timeline__label">{{ day.day }}</div>
          <div class="timeline__meta">{{ day.label }}</div>
        </div>
      </div>
      <div class="share-actions">
        <button v-for="action in shareActions" :key="action.label" type="button" class="share-button">
          <strong>{{ action.label }}</strong>
          <span>{{ action.helper }}</span>
        </button>
      </div>
    </section>

    <section class="panel reveal" :ref="registerReveal">
      <div class="panel__header">
        <div>
          <p class="panel__eyebrow">오늘의 리포트</p>
          <p class="panel__title">피드런 리포트 큐레이션</p>
        </div>
      </div>
      <div class="report-grid">
        <article v-for="card in reportCards" :key="card.title" class="report-card reveal" :ref="registerReveal">
          <div class="report-card__media" :style="{ backgroundImage: card.image }"></div>
          <div class="report-card__body">
            <span class="report-card__tag">오늘의 추천</span>
            <p class="report-card__title">{{ card.title }}</p>
            <p class="report-card__summary">{{ card.summary }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="panel reveal" :ref="registerReveal">
      <div class="panel__header">
        <div>
          <p class="panel__eyebrow">유의사항</p>
          <p class="panel__title">꼭 확인해 주세요</p>
        </div>
      </div>
      <ul class="notice-list">
        <li v-for="notice in noticeList" :key="notice">{{ notice }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.event-page {
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
}

.hero,
.panel,
.info-grid,
.info-card,
.howto-steps,
.howto-step,
.report-grid,
.report-card,
.timeline__day,
.benefit,
.benefit__ring {
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

.hero__visual {
  perspective: 800px;
  transform-style: preserve-3d;
}

.runner,
.mascot {
  will-change: transform;
  backface-visibility: hidden;
}

.spot {
  background: #000 url('/img/bg-spot.webp') no-repeat center center;
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
