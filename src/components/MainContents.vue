<script setup>
import { nextTick, onMounted, onUnmounted } from 'vue';
import { useGsapAnimations, useGsapHelpers } from '../composables/useGsapAnimations';
import Arrow from './Arrow.vue';

const eventInfo = [
  {
    title: '이벤트 기간',
    info: '2025.11.04(화) ~ 2025.12.31(수)',
  },
  {
    title: '이벤트 대상',
    info: '19세 이상 개인 및 내국인 \n (법인, 외국인, 미성년자 제외)',
  },
];

const feedList = [
  {
    icon: '/img/icon_target_board.webp',
    title: '이벤트 참여방법',
    description: '매일매일 AI 추천 피드를 확인해 주세요 \n 피드를 모두 확인하시면 피드런이 완성됩니다',
    image: '/img/act-howto.gif',
    buttonText: '피드를 좌우로 넘겨서 확인해주세요.',
  },
  {
    icon: '/img/icon_book_mark.webp',
    title: '이벤트 혜택안내',
    description: '피드런을 완료하신 고객님께 해외주식 \n (엔비디아, 테슬라, 애플 중)을 선물로 드려요',
    image: '/img/act-reward.gif',
  },
];

// GSAP 애니메이션 초기화
const gsapAnimations = useGsapAnimations();
const { querySelectorAll, querySelector } = useGsapHelpers();

onMounted(async () => {
  await nextTick();

  // ============================================
  // 1. 컨테이너 섹션 순차 등장
  // ============================================
  // const containers = querySelectorAll('.content__container');
  // gsapAnimations.reveal(containers, {
  //   from: { opacity: 0, y: 70, scale: 0.95 },
  //   to: { opacity: 1, y: 0, scale: 1 },
  //   duration: 0.7,
  //   stagger: 0.15,
  //   ease: 'power3.out',
  //   start: 'top 85%',
  // });

  // ============================================
  // 2. 타이틀 애니메이션
  // ============================================
  const titles = querySelectorAll('.content__title');
  titles.forEach(title => {
    gsapAnimations.reveal(title, {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      duration: 0.7,
      ease: 'power1.out',
      start: 'top 90%',
    });
  });

  // ============================================
  // 3. Info List 애니메이션
  // ============================================
  const infoListItems = querySelectorAll('.content__info-list li');
  gsapAnimations.listItems(infoListItems, {
    from: { opacity: 0, y: 50, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
    duration: 0.7,
    stagger: 0.1,
    trigger: querySelector('.content__info-list'),
    start: 'top 80%',
  });

  // ============================================
  // 4. Description 애니메이션
  // ============================================
  const descriptions = querySelectorAll('.content__description');
  gsapAnimations.reveal(descriptions, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    duration: 0.7,
    ease: 'power1.out',
    start: 'top 90%',
  });

  // ============================================
  // 5. Feed 카드 애니메이션
  // ============================================
  const feedCards = querySelectorAll('.content__feed');
  gsapAnimations.reveal(feedCards, {
    from: { opacity: 0, y: 50, scale: 0.5 },
    to: { opacity: 1, y: 0, scale: 1 },
    duration: 0.7,
    ease: 'power1.out',
    start: 'top 90%',
  });

  // ============================================
  // 6. Share 섹션 애니메이션
  // ============================================
  const shareTitle = querySelector('.content__share-title');
  if (shareTitle) {
    gsapAnimations.reveal(shareTitle, {
      from: { opacity: 0, scale: 0.5 },
      to: { opacity: 1, scale: 1 },
      duration: 0.6,
      ease: 'power1.out',
      start: 'top 90%',
    });
  }

  // ============================================
  // 7. Share 버튼 애니메이션
  // ============================================
  const shareButtons = querySelectorAll('.content__share-button button');
  gsapAnimations.buttons(shareButtons, {
    from: { scale: 0, opacity: 0, rotation: 180 },
    to: { scale: 1, opacity: 1, rotation: 0 },
    duration: 0.9,
    stagger: 0.2,
    ease: 'back.out(2.5)',
    start: 'top 90%',
  });

  // ============================================
  // 8. Notice 섹션 애니메이션
  // ============================================
  const noticeSection = querySelector('.content__notice');
  if (noticeSection) {
    gsapAnimations.reveal(noticeSection, {
      from: { opacity: 0, y: 50, scale: 0.5 },
      to: { opacity: 1, y: 0, scale: 1 },
      duration: 0.7,
      ease: 'power1.out',
      start: 'top 90%',
    });
  }

  // ============================================
  // 9. Footer 버튼 애니메이션
  // ============================================
  const footerButton = querySelector('.content__footer button');
  if (footerButton) {
    gsapAnimations.buttons(footerButton, {
      from: { scale: 0.9, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      duration: 0.5,
      ease: 'back.out(2)',
      delay: 0.3,
    });
  }

  // ============================================
  // 10. 컨테이너 패럴럭스 효과
  // ============================================
  gsapAnimations.parallax(containers, {
    y: -15,
    scrub: 1,
  });

  // ============================================
  // 11. Share 섹션 패럴럭스
  // ============================================
  const shareSection = querySelector('.content__share');
  if (shareSection) {
    gsapAnimations.parallax(shareSection, {
      y: -20,
      scrub: 0.8,
    });
  }
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  gsapAnimations.cleanup();
});
</script>

<template>
  <section class="content">
    <div class="content__container">
      <div class="content__title">
        <img src="/img/icon_calendar.webp" alt="feed-icon" />
        <h2>이벤트 안내</h2>
      </div>
      <ul class="content__info-list" v-for="info in eventInfo" :key="info.title">
        <li>
          <p>{{ info.title }}</p>
          <p>{{ info.info }}</p>
        </li>
      </ul>
    </div>

    <div v-for="feed in feedList" :key="feed.title" class="content__container">
      <div class="content__title">
        <img :src="feed.icon" alt="feed-icon" />
        <h2>{{ feed.title }}</h2>
      </div>
      <div class="content__description">
        <p>{{ feed.description }}</p>
      </div>
      <div class="content__feed">
        <img :src="feed.image" alt="feed-image" />
        <!-- <p v-if="feed.buttonText">{{ feed.buttonText }}</p> -->
      </div>
    </div>

    <div class="content__share">
      <h3 class="content__share-title">좋은정보는 함께 나눠요!</h3>
      <div class="content__share-button">
        <button>
          <img src="/img/kakao.webp" alt="share-icon" />
        </button>
        <button>
          <img src="/img/share.webp" alt="share-icon" />
        </button>
      </div>
    </div>

    <div class="content__notice">
      <div class="content__notice-top">
        <div>
          <span>마케팅 수신 동의</span>
          <Arrow />
        </div>
        <div>
          <span>내 정보 확인하기</span>
          <Arrow />
        </div>
      </div>
      <div class="content__notice-bottom">
        <ul>
          <li>
            이벤트 혜택을 받기 위해서는 마케팅 이용 <br />
            (수집 ∙ 이용 ∙ 제공 ∙ 수신) 동의는 필수이며, <br />
            경품지급 시점까지 동의사항을 유지해주셔야 해요.<br />
            (SMS, PUSH 주간 수신 동의)
          </li>
        </ul>
      </div>
    </div>

    <div class="content__footer">
      <button class="content__footer-button">이벤트 참여하기</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  margin-top: -4rem;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 85px;
  border-radius: 20px;
  background-color: #ffffff;
  perspective: 1000px;
  transform-style: preserve-3d;

  &__container {
    padding: 0px 34px 0px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
  &__info-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    li {
      display: flex;
      flex-direction: column;
      white-space: pre-line;
      will-change: transform, opacity;

      p {
        font-weight: 700;
        font-family: 'Spoqa Han Sans Neo', sans-serif;

        &:first-child {
          font-size: 1.4rem;
          line-height: 20px;
          letter-spacing: -1px;
          color: #999ea4;
        }

        &:last-child {
          font-size: 1.5rem;
          line-height: 24px;
          letter-spacing: 0;
          color: #333950;
        }
      }
    }
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 1.6rem;
    line-height: 1.3;
    letter-spacing: -1px;
    font-weight: 700;
    font-family: 'Spoqa Han Sans Neo', sans-serif;
    will-change: transform, opacity;
    img {
      width: 34px;
      height: 34px;
    }
  }
  &__description {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0px;
    color: #333950;
    font-family: 'Spoqa Han Sans Neo', sans-serif;
    will-change: transform, opacity;
  }
  &__feed {
    overflow: hidden;
    border-radius: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__share {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transform-style: preserve-3d;
    will-change: transform, opacity;
    &-title {
      font-size: 1.4rem;
      line-height: 20px;
      letter-spacing: 0px;
      font-weight: 700;
      color: #333950;
      font-family: 'Spoqa Han Sans Neo', sans-serif;
      will-change: transform, opacity;
    }
    &-button {
      display: flex;
      gap: 24px;
      button {
        width: 28px;
        height: 28px;
        will-change: transform, opacity;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  &__notice {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 20px 55px;

    &-top {
      display: flex;
      flex-direction: column;
      gap: 8px;
      div {
        padding: 16px;
        width: 100%;
        height: 46px;
        background-color: #f4f6f9;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333950;
        span {
          font-family: 'Spoqa Han Sans Neo', sans-serif;
          font-size: 1.4rem;
          line-height: 1;
          letter-spacing: 0.5px;
          font-weight: 700;
        }
      }
    }
    &-bottom {
      ul {
        padding-left: 20px;
        li {
          font-family: 'Spoqa Han Sans Neo', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 24px;
          letter-spacing: -1px;
          color: #999ea4;
          list-style-type: disc;
          list-style-position: outside;

          &::marker {
            color: #999ea4;
          }
        }
      }
    }
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0046ff;
    color: #ffffff;
    font-size: 2rem;
    line-height: 1.5;
    letter-spacing: 0;
    font-weight: 800;
    height: 64px;
    border-radius: 20px;

    margin: 0 16px 20px;
    padding: 16px;

    button {
      width: 100%;
      height: 50px;
      cursor: pointer;
      transition: all 0.2s ease;
      will-change: transform, opacity;

      &:active {
        transform: scale(0.98);
        opacity: 0.9;
      }
    }
  }
}
</style>
