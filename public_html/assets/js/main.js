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
    const drawerHeader = document.createElement("div");
    drawerHeader.className = "mobile-drawer-header";
    drawerHeader.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <div class="brand-logo-mark" style="width:34px;height:34px;font-size:1.05rem;border-radius:8px;"><i class="bi bi-heart-pulse-fill"></i></div>
        <span class="fw-bold text-teal" style="font-family:var(--font-heading);font-size:1.05rem;">Infinite Smiles</span>
      </div>
      <button type="button" class="btn btn-sm btn-outline-teal btn-close-drawer" aria-label="Close Menu" style="padding:0.2rem 0.5rem;border-radius:50%;font-size:0.95rem;">
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
        if (mobileOverlay) mobileOverlay.classList.remove("show");
        document.body.style.overflow = "";
      } else {
        navbarCollapse.classList.add("show");
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
      if (mobileOverlay) mobileOverlay.classList.remove("show");
      document.body.style.overflow = "";
    }
  }, { passive: true });

  // 3. Active Link Highlighting
  const currentPath = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".navbar-nav .nav-link, .dropdown-item").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.replace(/\/$/, "").replace(/^\.\./, "").replace(/^\./, "");
    if (cleanHref && (currentPath === cleanHref || (cleanHref !== "" && currentPath.endsWith(cleanHref)))) {
      link.classList.add("active");
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector(".dropdown-toggle");
        if (toggle) toggle.classList.add("active");
      }
    }
  });

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
});

