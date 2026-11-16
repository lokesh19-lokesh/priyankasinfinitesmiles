/**
 * PRIYANKA'S INFINITE SMILES - MAIN JAVASCRIPT
 * Core UI interactions, sticky header, mobile drawer, back-to-top, sliders
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Local file:// protocol support for direct desktop/Finder browsing
  if (window.location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach(link => {
      let href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
        return;
      }
      if (href === "./" || href === "") {
        link.setAttribute("href", "index.html");
      } else if (href === "../") {
        link.setAttribute("href", "../index.html");
      } else if (href === "../../") {
        link.setAttribute("href", "../../index.html");
      } else if (href.endsWith("/")) {
        link.setAttribute("href", href + "index.html");
      }
    });
  }

  // 1. Sticky Header & Back-to-Top Button
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (header) {
      if (scrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 2. Mobile Menu Offcanvas & Backdrop (<1200px)
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  let mobileOverlay = document.querySelector(".mobile-menu-overlay");

  if (!mobileOverlay && navbarCollapse) {
    mobileOverlay = document.createElement("div");
    mobileOverlay.className = "mobile-menu-overlay";
    document.body.appendChild(mobileOverlay);
  }

  // Inject mobile drawer header with close button if not present
  if (navbarCollapse && !navbarCollapse.querySelector(".mobile-drawer-header")) {
    const brandImg = document.querySelector(".navbar-brand img");
    const logoSrc = brandImg ? brandImg.getAttribute("src") : "assets/logo.png";
    const drawerHeader = document.createElement("div");
    drawerHeader.className = "mobile-drawer-header";
    drawerHeader.innerHTML = `
      <div class="drawer-brand-wrap">
        <img src="${logoSrc}" alt="Priyanka's Infinite Smiles" class="drawer-logo">
      </div>
      <button type="button" class="btn-close-drawer" aria-label="Close Menu">
        <i class="bi bi-x-lg"></i>
      </button>
    `;
    navbarCollapse.prepend(drawerHeader);
    const closeBtn = drawerHeader.querySelector(".btn-close-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }
  }

  const toggleMobileMenu = () => {
    if (navbarCollapse) {
      const isOpen = navbarCollapse.classList.contains("show");
      if (isOpen) {
        navbarCollapse.classList.remove("show");
        if (navbarToggler) navbarToggler.classList.remove("is-active");
        if (header) header.classList.remove("menu-is-open");
        if (mobileOverlay) mobileOverlay.classList.remove("show");
        document.body.style.overflow = "";
      } else {
        navbarCollapse.classList.add("show");
        if (navbarToggler) navbarToggler.classList.add("is-active");
        if (header) header.classList.add("menu-is-open");
        if (mobileOverlay) mobileOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
      }
    }
  };

  if (navbarToggler) {
    navbarToggler.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", () => {
      toggleMobileMenu();
    });
  }

  // Close mobile nav when clicking a nav link
  document.querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1200 && navbarCollapse && navbarCollapse.classList.contains("show")) {
        toggleMobileMenu();
      }
    });
  });

  // Auto reset mobile drawer on desktop resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200 && navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
      if (navbarToggler) navbarToggler.classList.remove("is-active");
      if (header) header.classList.remove("menu-is-open");
      if (mobileOverlay) mobileOverlay.classList.remove("show");
      document.body.style.overflow = "";
    }
  }, { passive: true });

  // 3. Active Link Highlighting Safeguard
  // Each HTML page already specifies its active navigation link in static markup.
  // Ensure "Home" is never highlighted when visiting subpages.
  const isHomePage = (() => {
    const p = window.location.pathname.toLowerCase().replace(/\/$/, "");
    if (
      p.includes("/about-us") ||
      p.includes("/our-doctors") ||
      p.includes("/smile-gallery") ||
      p.includes("/testimonials") ||
      p.includes("/clinic-gallery") ||
      p.includes("/blog") ||
      p.includes("/contact-us") ||
      p.includes("/dental-") ||
      p.includes("/smile-designing") ||
      p.includes("/cosmetic-dentistry") ||
      p.includes("/teeth-whitening") ||
      p.includes("/root-canal-treatment") ||
      p.includes("/braces-aligners") ||
      p.includes("/pediatric-dentistry") ||
      p.includes("/book-appointment") ||
      p.includes("/privacy-policy") ||
      p.includes("/terms-and-conditions") ||
      p.includes("/404")
    ) {
      return false;
    }
    return p === "" || p.endsWith("/public_html") || p.endsWith("/public_html/index.html") || p === "/index.html" || p === "/";
  })();

  if (!isHomePage) {
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
      const text = link.textContent.trim().toLowerCase();
      if (text === "home") {
        link.classList.remove("active");
      }
    });
  }

  // 4. Initialize Swiper Testimonial Slider if present
  if (typeof Swiper !== "undefined" && document.querySelector(".testimonials-swiper")) {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  // 5. Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60
    });
  }

  // 6. Local file:// protocol safety: auto-append index.html to directory links
  if (window.location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("#") &&
        !href.startsWith("tel:") &&
        !href.startsWith("mailto:") &&
        !href.endsWith(".html") &&
        !href.includes(".webp") &&
        !href.includes(".jpg") &&
        !href.includes(".png") &&
        !href.includes(".svg")
      ) {
        if (href.endsWith("/")) {
          link.setAttribute("href", href + "index.html");
        }
      }
    });
  }

  // 7. Interactive Before/After Sliders
  const initBaSliders = () => {
    document.querySelectorAll(".ba-slider-container").forEach((container) => {
      if (container.dataset.baInitialized) return;
      container.dataset.baInitialized = "true";

      const range = container.querySelector(".ba-range-slider");
      const afterWrap = container.querySelector(".ba-after-wrap");
      const handle = container.querySelector(".ba-handle");
      const afterImg = afterWrap ? afterWrap.querySelector("img") : null;

      if (!afterWrap || !handle) return;

      const syncWidth = () => {
        if (afterImg && container.offsetWidth > 0) {
          afterImg.style.width = `${container.offsetWidth}px`;
          afterImg.style.minWidth = `${container.offsetWidth}px`;
        }
      };

      syncWidth();
      window.addEventListener("resize", syncWidth, { passive: true });

      const setPosition = (percent) => {
        percent = Math.max(0, Math.min(100, percent));
        afterWrap.style.width = `${percent}%`;
        handle.style.left = `${percent}%`;
        if (range) range.value = percent;
      };

      if (range) {
        range.addEventListener("input", (e) => {
          setPosition(parseFloat(e.target.value));
        });
      }

      // Pointer drag & hover interaction
      let isDragging = false;
      const onMove = (clientX) => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0) {
          const x = clientX - rect.left;
          setPosition((x / rect.width) * 100);
        }
      };

      container.addEventListener("pointerdown", (e) => {
        isDragging = true;
        onMove(e.clientX);
        try { container.setPointerCapture(e.pointerId); } catch (_) {}
      });

      container.addEventListener("pointermove", (e) => {
        if (isDragging) {
          onMove(e.clientX);
        }
      });

      const onStop = (e) => {
        if (isDragging) {
          isDragging = false;
          try { container.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      };

      container.addEventListener("pointerup", onStop);
      container.addEventListener("pointercancel", onStop);
    });
  };

  initBaSliders();
});

