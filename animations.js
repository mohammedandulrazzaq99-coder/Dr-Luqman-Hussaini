/**
 * Antigravity Professional Animations Engine
 * Bold 4px Timeline Line Scroll Fill (High Visibility Engine)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Top Scroll Progress Bar
  if (!document.getElementById('scroll-progress-bar')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
  }

  const progressBar = document.getElementById('scroll-progress-bar');
  const header = document.querySelector('header');

  // 2. Setup Any Dynamic Timeline Tracks
  const initTimelines = () => {
    // Horizontal Tracks
    document.querySelectorAll('.timeline-track-h').forEach(track => {
      if (!track.querySelector('.timeline-fill-h')) {
        const fill = document.createElement('div');
        fill.className = 'timeline-fill-h';
        track.appendChild(fill);
      }
    });

    // Vertical Tracks
    document.querySelectorAll('.timeline-track-v').forEach(track => {
      if (!track.querySelector('.timeline-fill-v')) {
        const fill = document.createElement('div');
        fill.className = 'timeline-fill-v';
        track.appendChild(fill);
      }
    });
  };

  initTimelines();

  // 3. Scroll Listener for Smooth Line Progress Fill
  let ticking = false;

  const updateScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Top Scroll Progress Bar
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Header Glassmorphism Effect
    if (header) {
      if (scrollTop > 15) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    // Horizontal Timelines (Bold Left to Right Progress Fill)
    document.querySelectorAll('.timeline-track-h').forEach(track => {
      const fill = track.querySelector('.timeline-fill-h');
      if (!fill) return;

      const rect = track.getBoundingClientRect();
      const trackTop = rect.top;
      const startTrigger = viewportHeight * 0.85;
      const endTrigger = viewportHeight * 0.25;

      let fillPercent = 0;
      if (trackTop < startTrigger) {
        fillPercent = Math.min(100, Math.max(0, ((startTrigger - trackTop) / (startTrigger - endTrigger)) * 100));
      }

      fill.style.width = `${fillPercent}%`;
    });

    // Vertical Timelines (Bold Top to Bottom Progress Fill)
    document.querySelectorAll('.timeline-track-v').forEach(track => {
      const fill = track.querySelector('.timeline-fill-v');
      if (!fill) return;

      const rect = track.getBoundingClientRect();
      const trackTop = rect.top;
      const trackHeight = rect.height;

      const startTrigger = viewportHeight * 0.8;
      const endTrigger = viewportHeight * 0.2;

      let fillPercent = 0;
      if (trackTop < startTrigger) {
        fillPercent = Math.min(100, Math.max(0, ((startTrigger - trackTop) / (startTrigger - endTrigger + trackHeight)) * 100));
      }

      fill.style.height = `${fillPercent}%`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  });

  // Initial calculation on load
  updateScroll();

  // 4. Card Hover Elevations & Button Micro-Interactions
  const cards = document.querySelectorAll('.grid > div, article, .border.rounded-lg, .rounded-xl, .rounded-lg');
  cards.forEach(card => {
    if (!card.closest('header') && !card.closest('footer')) {
      card.classList.add('hover-lift');
    }
  });

  const buttons = document.querySelectorAll('a.bg-[#1C55DB], a.bg-brand-blue, a.bg-brandBlue, a.bg-brand-primary, button[type="submit"]');
  buttons.forEach(btn => {
    btn.classList.add('btn-animate');
  });

  // 5. Mobile Drawer Toggle Handler
  const mobileToggleBtns = document.querySelectorAll('[aria-label="Toggle mobile menu"], [aria-label="Toggle navigation menu"], #mobile-menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
      }
    });
  });
});
