<script setup>
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
    icon: '/img/icon_target_board.png',
    title: '이벤트 참여방법',
    description: '매일매일 AI 추천 피드를 확인해 주세요 \n 피드를 모두 확인하시면 피드런이 완성됩니다',
    image: '/img/feed-1.png',
    buttonText: '피드를 좌우로 넘겨서 확인해주세요.',
  },
  {
    icon: '/img/icon_book_mark.png',
    title: '이벤트 혜택안내',
    description: '피드런을 완료하신 고객님께 해외주식 \n (엔비디아, 테슬라, 애플 중)을 선물로 드려요',
    image: '/img/feed-1.png',
  },
];
</script>

<template>
  <section class="content">
    <div class="content__container">
      <div class="content__title">
        <img src="/img/icon_calendar.png" alt="feed-icon" />
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
        <img :src="feed.icon" alt="feed-image" />
        <p v-if="feed.buttonText">{{ feed.buttonText }}</p>
      </div>
    </div>

    <div class="content__share">
      <h3 class="content__share-title">좋은정보는 함께 나눠요!</h3>
      <div class="content__share-button">
        <button>
          <img src="/img/kakao.png" alt="share-icon" />
        </button>
        <button>
          <img src="/img/share.png" alt="share-icon" />
        </button>
      </div>
    </div>

    <div class="content__footer">
      <button class="content__footer-button">이벤트 참여하기</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 85px;
  border-radius: 32px;
  background-color: #ffffff;

  &__container {
    padding: 0px 34px 0px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__info-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    li {
      display: flex;
      flex-direction: column;
      white-space: pre-line;

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
  }
  &__feed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #e6f3ff;
    height: 200px;
    border-radius: 16px;
    font-size: 1.4rem;
    line-height: 1.3;
    letter-spacing: -1px;
    font-weight: 500;
  }
  &__share {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 85px; // footer와의 간격
    &-title {
      font-size: 1.4rem;
      line-height: 20px;
      letter-spacing: 0px;
      font-weight: 700;
      color: #333950;
      font-family: 'Spoqa Han Sans Neo', sans-serif;
    }
    &-button {
      display: flex;
      gap: 24px;
      button {
        width: 28px;
        height: 28px;
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

    // iOS safe area 대응
    padding-bottom: calc(16px + env(safe-area-inset-bottom));

    button {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
