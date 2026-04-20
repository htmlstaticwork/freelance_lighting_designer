(() => {
  const storageKeys = {
    theme: "luxframe-theme",
    accent: "luxframe-accent",
    dir: "luxframe-dir",
  };

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setOffcanvasPlacementForDir = (dir) => {
    const offcanvas = qs("#navOffcanvas");
    if (!offcanvas) return;
    offcanvas.classList.remove("offcanvas-start", "offcanvas-end");
    offcanvas.classList.add(dir === "rtl" ? "offcanvas-start" : "offcanvas-end");
  };

  const applyPreferences = () => {
    const root = document.documentElement;

    const theme = localStorage.getItem(storageKeys.theme) || "dark";
    const dir = localStorage.getItem(storageKeys.dir) || "ltr";
    const accent = localStorage.getItem(storageKeys.accent) || "gold";

    root.setAttribute("data-theme", theme);
    root.setAttribute("data-accent", accent);
    root.setAttribute("dir", dir);

    setOffcanvasPlacementForDir(dir);

    const combinedBtns = qsa("[data-action='toggle-combined']");
    combinedBtns.forEach((btn) => {
      const nextTheme = theme === "dark" ? "Light" : "Dark";
      const nextAccent = accent === "gold" ? "Neon" : "Gold";
      
      const icon = btn.querySelector("i");
      
      if (icon) {
        icon.className = theme === "dark" ? "bi bi-moon-stars fs-5" : "bi bi-sun fs-5";
      }
      
      btn.setAttribute("aria-label", `Switch to ${nextTheme} ${nextAccent}`);
    });
  };

  const wireToggles = () => {
    const combinedBtns = qsa("[data-action='toggle-combined']");
    combinedBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentTheme = localStorage.getItem(storageKeys.theme) || "dark";
        const currentAccent = localStorage.getItem(storageKeys.accent) || "gold";
        
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        const newAccent = currentAccent === "gold" ? "neon" : "gold";
        
        localStorage.setItem(storageKeys.theme, newTheme);
        localStorage.setItem(storageKeys.accent, newAccent);
        applyPreferences();
      });
    });

    const dirBtns = qsa("[data-action='toggle-dir']");
    dirBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = localStorage.getItem(storageKeys.dir) || "ltr";
        localStorage.setItem(storageKeys.dir, current === "rtl" ? "ltr" : "rtl");
        applyPreferences();
      });
    });
  };

  const blackoutReveal = () => {
    const stage = qs("[data-blackout-stage]");
    if (!stage) return;
    stage.classList.add("is-revealed");
  };

  const wireBackToTop = () => {
    const btn = qs("[data-back-to-top]");
    if (!btn) return;
    
    const handleScroll = () => {
      if (window.scrollY > 200) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  };

  const wireFormValidation = () => {
    const forms = qsa("form.needs-validation");
    if (!forms.length) return;

    forms.forEach((form) => {
      const email = qs("input[type='email']", form);
      if (email) {
        email.addEventListener("input", () => {
          if (!email.value) {
            email.setCustomValidity("Please enter your email.");
          } else if (!email.checkValidity()) {
            email.setCustomValidity("Please enter a valid email address.");
          } else {
            email.setCustomValidity("");
          }
        });
      }

      form.addEventListener("submit", (event) => {
        const isValid = form.checkValidity();
        if (!isValid) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");

        if (isValid && form.hasAttribute("data-demo-submit")) {
          event.preventDefault();
          const btn = qs("button[type='submit']", form);
          if (btn) {
            btn.disabled = true;
            btn.textContent = "Queued";
          }

          const scope = form.closest("main") || document;
          const success = qs("[data-form-success]", scope);
          if (success) success.classList.remove("d-none");
        }
      });
    });
  };

  const wireBlogSearchAndFilter = () => {
    const list = qs("[data-blog-list]");
    if (!list) return;

    const posts = qsa("[data-category]", list);
    const search = qs("[data-blog-search]");
    const buttons = qsa("[data-blog-filter]");

    let active = "all";
    let query = "";

    const apply = () => {
      const q = query.trim().toLowerCase();
      posts.forEach((post) => {
        const cat = (post.getAttribute("data-category") || "").toLowerCase();
        const text = (post.textContent || "").toLowerCase();
        const matchesCategory = active === "all" || cat === active;
        const matchesQuery = !q || text.includes(q);
        const show = matchesCategory && matchesQuery;
        post.classList.toggle("d-none", !show);
        post.setAttribute("aria-hidden", show ? "false" : "true");
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        active = btn.getAttribute("data-blog-filter") || "all";
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        apply();
      });
    });

    if (buttons.length) {
      const first = buttons.find((b) => (b.getAttribute("data-blog-filter") || "") === "all") || buttons[0];
      first.classList.add("is-active");
    }

    if (search) {
      search.addEventListener("input", () => {
        query = search.value || "";
        apply();
      });
    }

    apply();
  };

  const wireCountdown = () => {
    const el = qs("[data-countdown]");
    if (!el) return;

    const targetISO = el.getAttribute("data-countdown") || "2026-09-01T20:00:00";
    const target = new Date(targetISO).getTime();
    const parts = {
      d: qs("[data-countdown-days]"),
      h: qs("[data-countdown-hours]"),
      m: qs("[data-countdown-minutes]"),
      s: qs("[data-countdown-seconds]"),
    };

    const pad2 = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (parts.d) parts.d.textContent = String(days);
      if (parts.h) parts.h.textContent = pad2(hours);
      if (parts.m) parts.m.textContent = pad2(minutes);
      if (parts.s) parts.s.textContent = pad2(seconds);
    };

    tick();
    window.setInterval(tick, 1000);
  };

  const wireSmoothScroll = () => {
    const links = qsa('a');
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(link.href, window.location.href);
      const isSamePage = url.pathname === window.location.pathname && 
                        url.hostname === window.location.hostname;

      if (isSamePage && url.hash) {
        const target = qs(url.hash);
        if (target) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Close offcanvas if link is inside one
            const offcanvasEl = link.closest(".offcanvas");
            if (offcanvasEl) {
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
              if (bsOffcanvas) {
                bsOffcanvas.hide();
              }
            }

            const offset = 76; // --header-h
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: prefersReducedMotion() ? "auto" : "smooth",
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, url.hash);
          });
        }
      }
    });
  };

  const wireScrollSpy = () => {
    const sections = qsa("section[id]");
    const navLinks = qsa(".site-nav a, .offcanvas-body .nav-link");

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            let linkHash = "";
            try {
              // Handle relative links and absolute links
              const url = new URL(link.href, window.location.origin);
              linkHash = url.hash;
            } catch (e) {
              if (href.includes("#")) {
                linkHash = "#" + href.split("#")[1];
              }
            }
            
            if (linkHash === `#${id}`) {
              link.classList.add("is-active");
            } else {
              link.classList.remove("is-active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  };

  const wireProductionReelNav = () => {
    const reel = qs("[data-production-reel]");
    const prevBtn = qs("[data-reel-prev]");
    const nextBtn = qs("[data-reel-next]");

    if (!reel || !prevBtn || !nextBtn) return;

    const scrollAmount = () => {
      const firstFrame = reel.querySelector(".frame");
      if (!firstFrame) return 400;
      const style = window.getComputedStyle(reel);
      const gap = parseInt(style.gap) || 16;
      return firstFrame.offsetWidth + gap;
    };

    const updateButtons = () => {
      const isStart = reel.scrollLeft <= 10;
      const isEnd = reel.scrollLeft + reel.clientWidth >= reel.scrollWidth - 10;
      prevBtn.disabled = isStart;
      nextBtn.disabled = isEnd;
    };

    prevBtn.addEventListener("click", () => {
      reel.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      reel.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    reel.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  };

  const wireOffcanvasHiding = () => {
    const offcanvas = qs("#navOffcanvas");
    if (!offcanvas) return;

    offcanvas.addEventListener("show.bs.offcanvas", () => {
      document.body.classList.add("offcanvas-active");
    });

    offcanvas.addEventListener("hidden.bs.offcanvas", () => {
      document.body.classList.remove("offcanvas-active");
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyPreferences();
    wireToggles();
    blackoutReveal();
    wireBackToTop();
    wireFormValidation();
    wireBlogSearchAndFilter();
    wireCountdown();
    wireScrollSpy();
    wireSmoothScroll();
    wireOffcanvasHiding();
    wireProductionReelNav();
  });
})();
