import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP 애니메이션 커스텀 훅
 * 기능별로 모듈화된 애니메이션을 제공합니다.
 */
export function useGsapAnimations() {
  const animations = [];

  // ============================================
  // 1. Hero 패럴럭스 애니메이션
  // ============================================
  /**
   * Hero 섹션의 패럴럭스 효과
   * @param {Object} options - 애니메이션 옵션
   * @param {HTMLElement} options.container - Hero 컨테이너
   * @param {HTMLElement} options.background - 배경 엘리먼트
   * @param {HTMLElement} options.runner - 러너 엘리먼트
   * @param {HTMLElement} options.mascot - 마스코트 엘리먼트
   * @param {HTMLElement} options.title - 타이틀 엘리먼트
   * @param {HTMLElement} options.subtitle - 서브타이틀 엘리먼트
   * @param {Function} options.onUpdate - 진행률 업데이트 콜백
   */
  const heroParallax = (options = {}) => {
    const { container, background, runner, mascot, title, subtitle, onUpdate } = options;

    if (!container) return;

    // 배경 패럴럭스
    if (background) {
      gsap.to(background, {
        y: -180,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: self => {
            onUpdate?.(self.progress);
          },
        },
      });
    }

    // 러너 애니메이션
    if (runner) {
      gsap.to(runner, {
        x: 200,
        y: -220,
        rotation: 8,
        scale: 1.2,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }

    // 마스코트 애니메이션
    if (mascot) {
      gsap.to(mascot, {
        x: -150,
        y: -120,
        rotation: -12,
        scale: 0.9,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    // 타이틀 페이드아웃
    if (title) {
      gsap.to(title, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'center top',
          scrub: 0.5,
        },
      });
    }

    // 서브타이틀 페이드아웃
    if (subtitle) {
      gsap.to(subtitle, {
        y: 80,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'center top',
          scrub: 0.6,
        },
      });
    }
  };

  // ============================================
  // 2. Reveal 애니메이션 (페이드 인)
  // ============================================
  /**
   * 스크롤 시 요소가 나타나는 애니메이션
   * @param {HTMLElement|HTMLElement[]} elements - 애니메이션할 엘리먼트(들)
   * @param {Object} options - 애니메이션 옵션
   */
  const reveal = (elements, options = {}) => {
    const {
      from = { opacity: 0, y: 100, scale: 0.9, rotationX: 20 },
      to = { opacity: 1, y: 0, scale: 1, rotationX: 0 },
      duration = 0.6,
      stagger = 0.05,
      ease = 'power4.out',
      trigger = null,
      start = 'top 90%',
      once = true,
    } = options;

    const els = Array.isArray(elements) ? elements : [elements];

    els.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: trigger || el,
          start,
          toggleClass: 'is-visible',
          once,
        },
        delay: index * stagger,
      });
    });
  };

  // ============================================
  // 3. 카드 Stagger 애니메이션
  // ============================================
  /**
   * 카드 그리드 순차 등장 애니메이션
   * @param {HTMLElement[]} cards - 카드 엘리먼트 배열
   * @param {Object} options - 애니메이션 옵션
   */
  const cardStagger = (cards, options = {}) => {
    const {
      from = { opacity: 0, y: 120, scale: 0.85, rotationY: -30, z: -100 },
      to = { opacity: 1, y: 0, scale: 1, rotationY: 0, z: 0 },
      duration = 0.7,
      stagger = 0.12,
      ease = 'power4.out',
      trigger = null,
      start = 'top 85%',
      once = true,
    } = options;

    if (!cards || cards.length === 0) return;

    gsap.fromTo(cards, from, {
      ...to,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger || cards[0].parentElement,
        start,
        once,
      },
    });
  };

  // ============================================
  // 4. 패럴럭스 애니메이션 (개별 엘리먼트)
  // ============================================
  /**
   * 개별 엘리먼트에 패럴럭스 효과 적용
   * @param {HTMLElement|HTMLElement[]} elements - 패럴럭스 적용할 엘리먼트(들)
   * @param {Object} options - 애니메이션 옵션
   */
  const parallax = (elements, options = {}) => {
    const { y = -20, x = 0, scrub = 1, start = 'top bottom', end = 'bottom top' } = options;

    const els = Array.isArray(elements) ? elements : [elements];

    els.forEach(el => {
      if (!el) return;

      gsap.to(el, {
        y,
        x,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      });
    });
  };

  // ============================================
  // 5. 타임라인 애니메이션
  // ============================================
  /**
   * 타임라인 아이템 순차 등장
   * @param {HTMLElement[]} items - 타임라인 아이템 배열
   * @param {Object} options - 애니메이션 옵션
   */
  const timelineItems = (items, options = {}) => {
    const {
      from = { scale: 0.5, opacity: 0, y: 50, rotation: -180 },
      to = { scale: 1, opacity: 1, y: 0, rotation: 0 },
      duration = 0.5,
      stagger = 0.06,
      ease = 'back.out(2.5)',
      start = 'top 92%',
      once = true,
    } = options;

    if (!items || items.length === 0) return;

    items.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
        delay: index * stagger,
      });
    });
  };

  // ============================================
  // 6. 리스트 애니메이션
  // ============================================
  /**
   * 리스트 아이템 순차 등장
   * @param {HTMLElement[]} items - 리스트 아이템 배열
   * @param {Object} options - 애니메이션 옵션
   */
  const listItems = (items, options = {}) => {
    const {
      from = { opacity: 0, x: -40 },
      to = { opacity: 1, x: 0 },
      duration = 0.5,
      stagger = 0.08,
      ease = 'power2.out',
      trigger = null,
      start = 'top 85%',
      once = true,
    } = options;

    if (!items || items.length === 0) return;

    gsap.fromTo(items, from, {
      ...to,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger || items[0].parentElement,
        start,
        once,
      },
    });
  };

  // ============================================
  // 7. 버튼 애니메이션
  // ============================================
  /**
   * 버튼 등장 애니메이션
   * @param {HTMLElement|HTMLElement[]} buttons - 버튼 엘리먼트(들)
   * @param {Object} options - 애니메이션 옵션
   */
  const buttons = (buttonElements, options = {}) => {
    const {
      from = { scale: 0.8, opacity: 0, y: 30 },
      to = { scale: 1, opacity: 1, y: 0 },
      duration = 0.5,
      stagger = 0.1,
      ease = 'back.out(3)',
      start = 'top 95%',
      once = true,
    } = options;

    const els = Array.isArray(buttonElements) ? buttonElements : [buttonElements];

    els.forEach((btn, index) => {
      if (!btn) return;

      gsap.fromTo(btn, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: btn,
          start,
          once,
        },
        delay: index * stagger,
      });
    });
  };

  // ============================================
  // 8. Chips 애니메이션
  // ============================================
  /**
   * Chip 배지 회전 등장 애니메이션
   * @param {HTMLElement[]} chips - Chip 엘리먼트 배열
   * @param {Object} options - 애니메이션 옵션
   */
  const chips = (chipElements, options = {}) => {
    const {
      from = { scale: 0, opacity: 0, rotation: 180 },
      to = { scale: 1, opacity: 1, rotation: 0 },
      duration = 0.6,
      stagger = 0.08,
      ease = 'back.out(2.5)',
      delay = 0.3,
    } = options;

    if (!chipElements || chipElements.length === 0) return;

    gsap.fromTo(chipElements, from, {
      ...to,
      duration,
      stagger,
      ease,
      delay,
    });
  };

  // ============================================
  // 9. 헤더 애니메이션 (Eyebrow + Title + Period)
  // ============================================
  /**
   * 패널 헤더 순차 등장 애니메이션
   * @param {HTMLElement} header - 헤더 컨테이너
   * @param {Object} options - 애니메이션 옵션
   */
  const panelHeader = (header, options = {}) => {
    const { start = 'top 85%', once = true } = options;

    if (!header) return;

    const eyebrow = header.querySelector('.panel__eyebrow');
    const title = header.querySelector('.panel__title');
    const period = header.querySelector('.panel__period');

    // Eyebrow
    if (eyebrow) {
      gsap.fromTo(
        eyebrow,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start,
            once,
          },
        }
      );
    }

    // Title
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start,
            once,
          },
          delay: 0.1,
        }
      );
    }

    // Period
    if (period) {
      gsap.fromTo(
        period,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start,
            once,
          },
          delay: 0.2,
        }
      );
    }
  };

  // ============================================
  // 10. 링 애니메이션 (회전 + 탄성)
  // ============================================
  /**
   * 원형 링 회전 등장 애니메이션
   * @param {HTMLElement} ring - 링 엘리먼트
   * @param {Object} options - 애니메이션 옵션
   */
  const ring = (ringElement, options = {}) => {
    const {
      from = { scale: 0.3, rotation: -360, opacity: 0, y: 50 },
      to = { scale: 1, rotation: 0, opacity: 1, y: 0 },
      duration = 1,
      ease = 'elastic.out(1, 0.5)',
      trigger = null,
      start = 'top 75%',
      once = true,
    } = options;

    if (!ringElement) return;

    gsap.fromTo(ringElement, from, {
      ...to,
      duration,
      ease,
      scrollTrigger: {
        trigger: trigger || ringElement,
        start,
        once,
      },
    });
  };

  // ============================================
  // 11. 타임라인 진행률 추적
  // ============================================
  /**
   * 전체 스크롤 진행률에 따른 타임라인 업데이트
   * @param {Function} onUpdate - 진행률 업데이트 콜백 (0~1)
   * @param {Object} options - ScrollTrigger 옵션
   */
  const scrollProgress = (onUpdate, options = {}) => {
    const { trigger = 'body', start = 'top top', end = 'bottom bottom' } = options;

    ScrollTrigger.create({
      trigger,
      start,
      end,
      onUpdate: self => {
        onUpdate?.(self.progress);
      },
    });
  };

  // ============================================
  // 정리 함수
  // ============================================
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    animations.length = 0;
  };

  return {
    // 애니메이션 함수들
    heroParallax,
    reveal,
    cardStagger,
    parallax,
    timelineItems,
    listItems,
    buttons,
    chips,
    panelHeader,
    ring,
    scrollProgress,

    // 정리 함수
    cleanup,
  };
}

/**
 * DOM 쿼리 헬퍼 함수들
 */
export const useGsapHelpers = () => {
  const querySelectorAll = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
  };

  const querySelector = (selector, parent = document) => {
    return parent.querySelector(selector);
  };

  return {
    querySelectorAll,
    querySelector,
  };
};
