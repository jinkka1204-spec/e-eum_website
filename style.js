/* butti-N1 */
(function() {
  $(function() {
    $(".butti-N1[id=\'jqmD4SHpwi\']").each(function() {
      const $block = $(this);
      let isMobileMenuInitialized = false;
      let isDesktopMenuInitialized = false;
      // 모바일 메뉴 초기화
      function initMobileMenu() {
        if (isMobileMenuInitialized) return;
        const $btnMomenu = $block.find(".btn-momenu");
        $btnMomenu.off("click").on("click", function() {
          $block.toggleClass("block-active");
          $block.find(".header-gnbitem").removeClass("item-active");
          $block.find(".header-sublist").removeAttr("style");
        });
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          const $sublist = $this.find(".header-sublist");
          if ($sublist.length) {
            $thisLink.off("click").on("click", function(event) {
              event.preventDefault();
              const $clickedItem = $(this).closest(".header-gnbitem");
              if (!$clickedItem.hasClass("item-active")) {
                $block.find(".header-gnbitem").removeClass("item-active");
                $block.find(".header-sublist").stop().slideUp(300);
              }
              $clickedItem.toggleClass("item-active");
              $sublist.stop().slideToggle(300);
            });
          }
        });
        isMobileMenuInitialized = true;
      }
      // 데스크탑 메뉴 초기화
      function initDesktopMenu() {
        if (isDesktopMenuInitialized) return;
        $block.find(".header-gnbitem .header-gnblink").off("click");
        isDesktopMenuInitialized = true;
      }
      // GNB Hover
      function initGnbHover() {
        let maxSubH = 0;
        $block.find(".header-sublist").each(function() {
          $(this).css("display", "block");
          maxSubH = Math.max(maxSubH, $(this).outerHeight());
          $(this).css("display", "");
        });
        $block.find(".header-sublist").css("min-height", `${maxSubH}px`);
        $block
          .find(".header-gnb")
          .off("mouseenter.gnb mouseleave.gnb")
          .on("mouseenter.gnb", function() {
            if (window.innerWidth <= 992) return;
            const headerH = $block.find(".header-container").outerHeight();
            $block.css("min-height", `${headerH + maxSubH + 20}px`);
          })
          .on("mouseleave.gnb", function() {
            if (window.innerWidth <= 992) return;
            $block.css("min-height", "");
          });
      }
      // Observer 등록
      const gnbNode = $block.find(".header-gnb").get(0);
      if (gnbNode) {
        const observer = new MutationObserver(() => {
          initGnbHover();
        });
        observer.observe(gnbNode, {
          childList: true,
          subtree: true,
        });
      }
      // 해상도에 따른 메뉴 처리
      function handleResize() {
        if (window.innerWidth <= 992) {
          if (!isMobileMenuInitialized) initMobileMenu();
          isDesktopMenuInitialized = false;
        } else {
          if (!isDesktopMenuInitialized) initDesktopMenu();
          isMobileMenuInitialized = false;
          initGnbHover(); // 데스크탑일 때 hover 로직 초기화
        }
      }
      // 스크롤 시 메뉴 처리
      function handleScroll() {
        const $headerTop = $block.find(".header-top");
        if ($headerTop.length) $block.addClass("top-menu-active");
        if ($(window).scrollTop() === 0) $block.addClass("header-top-active");
        $(window).on("scroll", function() {
          if ($(window).scrollTop() > 0) {
            $block.removeClass("header-top-active");
          } else {
            $block.addClass("header-top-active");
          }
        });
      }
      handleScroll();
      // 전체 메뉴 열기/닫기 처리
      function handleFullMenu() {
        $block.find(".btn-allmenu").on("click", function() {
          $block.find(".header-fullmenu").addClass("fullmenu-active");
        });
        $block.find(".fullmenu-close").on("click", function() {
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
        });
        $block.find(".fullmenu-gnbitem").each(function() {
          const $this = $(this);
          $this.on("mouseover", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").addClass("on");
            }
          });
          $this.on("mouseout", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").removeClass("on");
            }
          });
        });
      }
      handleFullMenu();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", handleResize);
      handleResize();
    });
  });
})();
/* lexa-N4 */
(function() {
  $(function() {
    $(".lexa-N4[id=\'goMd7QuG1s\']").each(function() {
      const $block = $(this);
      const $titleArea = $block.find(".title-area");
      const $title = $block.find("h2");
      const $cont = $block.find(".group-cont");
      const $desc = $block.find(".group-cont .cardset-body");
      // 미디어 쿼리를 사용하여 특정 화면 너비 이상에서만 실행
      const mm = gsap.matchMedia();
      mm.add("(min-width: 993px)", () => {
        // 타이틀 애니메이션
        const descTl = gsap.timeline({
          scrollTrigger: {
            trigger: $cont,
            start: "0% 60%",
            end: `100% 100%`,
            endTrigger: $block,
            scrub: 2,
          },
        });
        descTl.to($title, {
          scale: 0.4,
          opacity: 0
        });
        // 내용 텍스트 애니메이션
        ScrollTrigger.create({
          trigger: $desc,
          start: "0% 80%",
          end: `100% 100%`,
          onEnter: () => {
            gsap.to($desc, {
              opacity: 1,
              y: 0,
              duration: 0.4
            });
          },
          onLeaveBack: () => {
            gsap.to($desc, {
              opacity: 0,
              y: 40,
              duration: 0.4
            });
          },
        });
      });
      mm.add("(max-width: 992px)", () => {
        // 타이틀 애니메이션
        const descTl = gsap.timeline({
          scrollTrigger: {
            trigger: $cont,
            start: "0% 70%",
            end: `100% 120%`,
            endTrigger: $block,
            scrub: 2,
          },
        });
        descTl.to($title, {
          scale: 0.4,
          opacity: 0
        });
      });
      // 타이틀 애니메이션
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: $block,
          start: "0% 40%",
          end: `0% 100%`,
          toggleActions: "play none reverse none",
        },
      });
      textTl.from($titleArea, {
        opacity: 0,
        y: 40
      });
    });
  });
})();
/* basic-N42 */
(function() {
  $(function() {
    $(".basic-N42[id=\'CAmd4akFZP\']").each(function() {
      const $block = $(this);
      // Swiper
      const swiper = new Swiper(".basic-N42[id=\'CAmd4akFZP\'] .contents-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".basic-N42[id=\'CAmd4akFZP\'] .swiper-button-next",
          prevEl: ".basic-N42[id=\'CAmd4akFZP\'] .swiper-button-prev",
        },
        pagination: {
          type: "progressbar",
          el: ".basic-N42[id=\'CAmd4akFZP\'] .swiper-pagination",
          clickable: true,
        },
      });
    });
  });
})();
/* lendingroom */
(function() {
  $(function() {
    $(".lendingroom[id=\'Khmd7QPqrP\']").each(function() {
      const $block = $(this);
      // .tabset-link를 클릭했을 때 이벤트 핸들러 실행
      $block.find(".tabset-link").click(function() {
        const $idx = $(this).parent().index();
        $block
          .find(".info .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $block
          .find(".thumb .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    });
  });
})();
/* temhaticket-N8 */
(function() {
  $(function() {
    $(".temhaticket-N8[id=\'ycMd8jesdy\']").each(function() {
      const $block = $(this);
      // 퀵 메뉴 이벤트
      $block.find(".quick-wrap-btn").click(function() {
        $(this).parents(".quick-wrap").toggleClass("active");
      })
    })
  })
})();
