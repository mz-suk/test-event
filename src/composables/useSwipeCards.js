import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

/**
 * Tinder 스타일 스와이프 카드 커스텀 훅
 * @param {Object} options - 설정 옵션
 * @param {string} options.containerSelector - 카드 컨테이너 셀렉터
 * @param {string} options.cardSelector - 카드 셀렉터
 * @param {number} options.threshold - 스와이프 임계값 (기본: 100)
 * @param {Function} options.onSwipeLeft - 왼쪽 스와이프 콜백
 * @param {Function} options.onSwipeRight - 오른쪽 스와이프 콜백
 */
export function useSwipeCards(options = {}) {
  const { containerSelector = '.swipe-container', cardSelector = '.swipe-card', threshold = 100, onSwipeLeft = () => {}, onSwipeRight = () => {} } = options;

  const isDragging = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const currentCard = ref(null);
  const cards = ref([]);

  let container = null;

  /**
   * 카드 초기 위치 및 스타일 설정
   */
  const initCards = () => {
    const visibleCards = Array.from(container?.querySelectorAll(`${cardSelector}:not(.removed)`) || []);
    cards.value = visibleCards;

    visibleCards.forEach((card, index) => {
      // 카드별 회전 각도 계산 (좌우로 번갈아가며)
      const rotations = [2, -1.5, 1, -0.5, 0.5, -0.3];
      const rotation = rotations[index % rotations.length] || 0;

      // opacity 계산 - 뒤 카드도 잘 보이도록 조정
      let opacity = 1;
      if (index === 1) opacity = 0.85;
      else if (index === 2) opacity = 0.7;
      else if (index > 2) opacity = Math.max(0.5, 1 - index * 0.15);

      gsap.to(card, {
        zIndex: visibleCards.length - index,
        scale: Math.max(0.88, (20 - index * 0.6) / 20), // 스케일 차이 줄임
        y: -35 * index, // 간격 조금 더 넓힘
        x: index * 3, // 좌우 오프셋 증가
        rotation: rotation,
        opacity: opacity,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  /**
   * 드래그 시작
   */
  const handleDragStart = (event, card) => {
    if (isDragging.value) return;

    isDragging.value = true;
    currentCard.value = card;

    const touch = event.touches ? event.touches[0] : event;
    startX.value = touch.clientX;
    startY.value = touch.clientY;

    card.classList.add('moving');

    // 카드를 최상위로
    gsap.set(card, { zIndex: 1000 });
  };

  /**
   * 드래그 중
   */
  const handleDragMove = event => {
    if (!isDragging.value || !currentCard.value) return;

    event.preventDefault();

    const touch = event.touches ? event.touches[0] : event;
    const deltaX = touch.clientX - startX.value;
    const deltaY = touch.clientY - startY.value;

    // 기존 회전값 가져오기
    const currentRotation = gsap.getProperty(currentCard.value, 'rotation') || 0;

    // 회전 계산 (드래그 방향에 따라)
    const xMulti = deltaX * 0.04;
    const yMulti = deltaY / 100;
    const dragRotation = xMulti * yMulti;

    // 실시간 변형 (기존 회전 + 드래그 회전)
    gsap.set(currentCard.value, {
      x: deltaX,
      y: deltaY,
      rotation: dragRotation,
    });

    // 방향 표시 (선택적)
    if (container) {
      if (deltaX > 30) {
        container.classList.add('swipe-right');
        container.classList.remove('swipe-left');
      } else if (deltaX < -30) {
        container.classList.add('swipe-left');
        container.classList.remove('swipe-right');
      } else {
        container.classList.remove('swipe-right', 'swipe-left');
      }
    }
  };

  /**
   * 드래그 종료
   */
  const handleDragEnd = event => {
    if (!isDragging.value || !currentCard.value) return;

    const card = currentCard.value;
    const touch = event.changedTouches ? event.changedTouches[0] : event;
    const deltaX = touch.clientX - startX.value;
    const deltaY = touch.clientY - startY.value;

    card.classList.remove('moving');
    if (container) {
      container.classList.remove('swipe-right', 'swipe-left');
    }

    // 임계값 체크
    const shouldRemove = Math.abs(deltaX) > threshold;

    if (shouldRemove) {
      // 카드 날리기
      const moveOutWidth = window.innerWidth * 1.5;
      const toX = deltaX > 0 ? moveOutWidth : -moveOutWidth;
      const toY = deltaY + Math.abs(deltaX) * 0.3;
      const xMulti = deltaX * 0.04;
      const yMulti = deltaY / 100;
      const rotate = xMulti * yMulti + (deltaX > 0 ? 25 : -25);

      gsap.to(card, {
        x: toX,
        y: toY,
        rotation: rotate,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          card.classList.add('removed');
          card.style.display = 'none';
          initCards();

          // 콜백 실행
          if (deltaX > 0) {
            onSwipeRight(card);
          } else {
            onSwipeLeft(card);
          }
        },
      });
    } else {
      // 원위치 (초기 회전값으로 복귀)
      const cardIndex = Array.from(container?.querySelectorAll(`${cardSelector}:not(.removed)`) || []).indexOf(card);
      const rotations = [2, -1.5, 1, -0.5, 0.5, -0.3];
      const originalRotation = rotations[cardIndex % rotations.length] || 0;

      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: originalRotation,
        duration: 0.4,
        ease: 'back.out(1.5)',
      });
    }

    isDragging.value = false;
    currentCard.value = null;
  };

  /**
   * 프로그래밍 방식으로 스와이프
   */
  const swipeCard = (direction = 'right') => {
    const visibleCards = container?.querySelectorAll(`${cardSelector}:not(.removed)`);
    if (!visibleCards || visibleCards.length === 0) return;

    const card = visibleCards[0];
    const moveOutWidth = window.innerWidth * 1.5;
    const toX = direction === 'right' ? moveOutWidth : -moveOutWidth;
    const rotate = direction === 'right' ? 30 : -30;

    card.classList.add('removed');

    gsap.to(card, {
      x: toX,
      y: -100,
      rotation: rotate,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        card.style.display = 'none';
        initCards();

        if (direction === 'right') {
          onSwipeRight(card);
        } else {
          onSwipeLeft(card);
        }
      },
    });
  };

  /**
   * 이벤트 리스너 설정
   */
  const setupEventListeners = () => {
    const allCards = container?.querySelectorAll(cardSelector);
    if (!allCards) return;

    allCards.forEach(card => {
      // 마우스 이벤트
      card.addEventListener('mousedown', e => handleDragStart(e, card));

      // 터치 이벤트
      card.addEventListener('touchstart', e => handleDragStart(e, card), { passive: true });
    });

    // 전역 move/end 이벤트
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
  };

  /**
   * 이벤트 리스너 제거
   */
  const removeEventListeners = () => {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
  };

  /**
   * 초기화
   */
  const init = () => {
    container = document.querySelector(containerSelector);
    if (!container) {
      console.warn(`Container not found: ${containerSelector}`);
      return;
    }

    initCards();
    setupEventListeners();
  };

  /**
   * 정리
   */
  const cleanup = () => {
    removeEventListeners();
    cards.value = [];
    currentCard.value = null;
  };

  onMounted(() => {
    init();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    cards,
    isDragging,
    swipeCard,
    initCards,
    cleanup,
  };
}
