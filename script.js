// Loader logic
window.addEventListener('load', function() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1200);
});
// Light/Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
function setMode(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    modeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', mode);
}
modeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  setMode(isDark ? 'dark' : 'light');
});
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') setMode('dark');
  else setMode('light');
})();
// Smooth scroll for navbar links
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Feature section navigation logic
const navLinksFeature = document.querySelectorAll('.navbar a[data-feature]');
const sections = document.querySelectorAll('.feature-section');
navLinksFeature.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const feature = this.getAttribute('data-feature');
    sections.forEach(sec => sec.classList.remove('active-section'));
    navLinksFeature.forEach(l => l.classList.remove('active-nav'));
    document.getElementById(feature + '-section').classList.add('active-section');
    this.classList.add('active-nav');
  });
});
// Set carousel as active on load
navLinksFeature[0].classList.add('active-nav');
// Carousel Product Card Feature (Split-Screen Two-Product Carousel)
(function() {
  const products = [
    { label: 'NEW', defaultImg: 'shampoo.jpg', lifestyleImg: 'shampoo1.jpg', name: 'Hydrating Shampoo' },
    { label: 'NEW', defaultImg: 'lp.jpg', lifestyleImg: 'lp1.jpg', name: 'Luxury Perfume' },
    { label: 'NEW', defaultImg: 'ms.jpg', lifestyleImg: 'ms1.jpg', name: 'Moisturizing Serum' },
    { label: 'NEW', defaultImg: 'vc.jpg', lifestyleImg: 'vs1.jpg', name: 'Vitamin C Cream' }
  ];
  let current = 0;
  const container = document.querySelector('.carousel-container');
  if (!container) return;

  function render() {
    let html = '';
    html += `<button class="carousel-arrow left">&#8592;</button>`;
    html += `<div class="carousel-cards">`;
    // Left half
    html += `<div class="carousel-half">${renderCard(products[current])}</div>`;
    // Right half (if available)
    if (products[current + 1]) {
      html += `<div class="carousel-half">${renderCard(products[current + 1])}</div>`;
    } else {
      html += `<div class="carousel-half"></div>`;
    }
    html += `</div>`;
    html += `<button class="carousel-arrow right">&#8594;</button>`;
    container.innerHTML = html;

    // Add to Bag feedback
    Array.from(container.querySelectorAll('.carousel-card')).forEach(card => {
      const btn = card.querySelector('.add-to-bag');
      const feedback = card.querySelector('.added-feedback');
      btn.onclick = () => {
        card.classList.add('added');
        setTimeout(() => {
          card.classList.remove('added');
        }, 1200);
      };
    });

    // Navigation
    container.querySelector('.carousel-arrow.left').onclick = () => {
      if (current > 0) {
        current -= 2;
        render();
      }
    };
    container.querySelector('.carousel-arrow.right').onclick = () => {
      if (current + 2 < products.length) {
        current += 2;
        render();
      }
    };
    // Hide left arrow if at start, right arrow if at end
    if (current === 0) container.querySelector('.carousel-arrow.left').style.visibility = 'hidden';
    if (current + 2 >= products.length) container.querySelector('.carousel-arrow.right').style.visibility = 'hidden';
  }

  function renderCard(prod) {
    if (!prod) return '';
    return `
      <div class="carousel-card">
        <span class="product-label">${prod.label}</span>
        <img class="product-img default" src="${prod.defaultImg}" alt="${prod.name}" />
        <img class="product-img lifestyle" src="${prod.lifestyleImg}" alt="${prod.name} Lifestyle" />
        <div class="added-feedback">Added!</div>
        <button class="add-to-bag">ADD TO BAG +</button>
      </div>
    `;
  }

  render();
})();
// BSS/OSS Tabbed Section
(function() {
  const tabs = [
    {
      key: 'billing',
      label: 'BILLING',
      icon: '💰',
      color: '#ffd6db',
      title: 'Real-Time Convergent Billing',
      desc: 'Instantaneous, accurate billing across all services and products. Ensures transparency and customer trust.',
      img: 'stats.png'
    },
    {
      key: 'charging',
      label: 'CHARGING',
      icon: '🧾',
      color: '#ffe9b3',
      title: 'Online Charging System',
      desc: 'AI-powered insights that predict customer needs and drive personalized experiences.',
      img: 'graph.png'
    },
    {
      key: 'catalog',
      label: 'CATALOG',
      icon: '📦',
      color: '#eaffc7',
      title: 'Product Catalog',
      desc: 'Centralized management of all products and services, enabling rapid go-to-market.',
      img: 'cards.png'
    },
    {
      key: 'events',
      label: 'EVENTS',
      icon: '📅',
      color: '#b3f0ff',
      title: 'Event Management',
      desc: 'Track, analyze, and respond to events in real time for operational excellence.',
      img: 'showcase work.mp4'
    }
  ];
  let active = 0;
  let autoTimer = null;
  const tabsContainer = document.querySelector('.bss-oss-tabs');
  const contentContainer = document.querySelector('.bss-oss-tab-content');
  if (!tabsContainer || !contentContainer) return;

  function render(showSkeletonTab = false) {
    // Tabs
    tabsContainer.innerHTML = tabs.map((tab, i) => `
      <div class="bss-oss-tab ${tab.key} ${i === active ? 'active' : ''} ${showSkeletonTab && i === active ? 'skeleton-tab' : ''}" style="--tab-color: ${tab.color}" data-idx="${i}">
        <span class="tab-icon">${tab.icon}</span>
        <span>${tab.label}</span>
      </div>
    `).join('');
    // Content (always show real content)
    const tab = tabs[active];
    contentContainer.innerHTML = `
      <div class="tab-content-left">
        <div class="tab-content-title">${tab.title}</div>
        <div class="tab-content-desc">${tab.desc}</div>
      </div>
      <div class="tab-content-right">
        <div class="tab-content-img">
          ${tab.img.endsWith('.mp4') ? `<video src="${tab.img}" controls style="width:100%;height:100%;border-radius:16px;background:#e3e9ed;"></video>` : `<img src="${tab.img}" alt="${tab.label}" style="width:100%;height:100%;object-fit:contain;border-radius:16px;" />`}
        </div>
      </div>
    `;
    // Tab click events
    Array.from(tabsContainer.children).forEach((el, i) => {
      el.onclick = () => {
        if (i === active) return;
        clearInterval(autoTimer);
        active = i;
        render(true); // show skeleton shimmer on tab
        setTimeout(() => {
          render(false);
          startAutoRotate();
        }, 1000);
      };
    });
  }

  function startAutoRotate() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      let next = (active + 1) % tabs.length;
      render(true);
      setTimeout(() => {
        active = next;
        render(false);
      }, 1000);
    }, 3000);
  }

  render();
  startAutoRotate();
})();
// Classic Ripple Effect on Mouse Move
(function() {
  const area = document.querySelector('#ripple-section .ripple-move-area');
  if (!area) return;
  let lastTime = 0;
  let ripples = [];
  area.addEventListener('mousemove', function(e) {
    // Throttle ripples to avoid too many per second
    const now = Date.now();
    if (now - lastTime < 30) return;
    lastTime = now;
    const rect = area.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = 80 + Math.random() * 40;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    area.appendChild(ripple);
    ripples.push(ripple);
    ripple.addEventListener('animationend', () => {
      ripple.remove();
      ripples = ripples.filter(r => r !== ripple);
    });
    // Limit number of ripples in DOM
    if (ripples.length > 20) {
      ripples[0].remove();
      ripples.shift();
    }
  });
})();
// Global Loader Logic for All Sections
(function() {
  const loaderBar = document.getElementById('loaderBar');
  const loaderContainer = document.getElementById('loaderContainer');
  let progress = 0;
  function fillLoader() {
    if (progress < 100) {
      progress += Math.random() * 5 + 1;
      if (progress > 100) progress = 100;
      loaderBar.style.width = progress + '%';
      setTimeout(fillLoader, 30);
    } else {
      loaderContainer.style.opacity = 0;
      setTimeout(() => {
        loaderContainer.style.display = 'none';
      }, 500);
    }
  }
  function startLoader() {
    progress = 0;
    loaderBar.style.width = '0%';
    loaderContainer.style.opacity = 1;
    loaderContainer.style.display = 'flex';
    fillLoader();
  }
  // Show loader on every navbar section switch
  const navLinksFeature = document.querySelectorAll('.navbar a[data-feature]');
  navLinksFeature.forEach(link => {
    link.addEventListener('click', function() {
      startLoader();
    });
  });
  // Optionally, show loader on initial page load
  window.addEventListener('DOMContentLoaded', startLoader);
})();
// Testimonials Section Grab-to-Pan Logic
(function() {
  const section = document.getElementById('testimonials-section');
  const scrollX = section ? section.querySelector('.scroll-x') : null;
  if (!scrollX) return;
  let isDown = false;
  let startX, scrollLeft;
  let touchStartX = 0, touchScrollLeft = 0;
  function enablePan() {
    scrollX.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    scrollX.addEventListener('touchstart', onTouchStart);
    scrollX.addEventListener('touchmove', onTouchMove);
  }
  function disablePan() {
    scrollX.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    scrollX.removeEventListener('touchstart', onTouchStart);
    scrollX.removeEventListener('touchmove', onTouchMove);
  }
  function onMouseDown(e) {
    isDown = true;
    scrollX.style.cursor = 'grabbing';
    startX = e.pageX;
    scrollLeft = scrollX.scrollLeft;
  }
  function onMouseUp() {
    isDown = false;
    scrollX.style.cursor = 'grab';
  }
  function onMouseMove(e) {
    if (!isDown) return;
    const x = e.pageX;
    const walk = (startX - x);
    scrollX.scrollLeft = scrollLeft + walk;
  }
  function onTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchScrollLeft = scrollX.scrollLeft;
  }
  function onTouchMove(e) {
    const x = e.touches[0].clientX;
    const walk = (touchStartX - x);
    scrollX.scrollLeft = touchScrollLeft + walk;
  }
  // Enable only when section is active
  function checkActive() {
    if (section.classList.contains('active-section')) {
      enablePan();
    } else {
      disablePan();
    }
  }
  // Listen for section activation
  const navLinksFeature = document.querySelectorAll('.navbar a[data-feature]');
  navLinksFeature.forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(checkActive, 10);
    });
  });
  // Initial check
  checkActive();
})();
// Graph Section Dynamic Bar Chart Logic
(function() {
  const section = document.getElementById('graph-section');
  if (!section) return;
  const barChart = section.querySelector('#barChart');
  const typeBtns = Array.from(section.querySelectorAll('.graph-filter-type .graph-btn'));
  const statusBtns = Array.from(section.querySelectorAll('.graph-filter-status .graph-btn'));
  // Demo data (matches screenshot)
  const allData = [
    { label: 'A', type: 'Refurbishment', status: 'Complete', value: 549 },
    { label: 'B', type: 'Refurbishment', status: 'Complete', value: 278 },
    { label: 'C', type: 'Refurbishment', status: 'Complete', value: 875 },
    { label: 'D', type: 'Refurbishment', status: 'Complete', value: 617 },
    { label: 'E', type: 'Refurbishment', status: 'Complete', value: 506 },
    { label: 'F', type: 'Refurbishment', status: 'Complete', value: 36 },
    { label: 'G', type: 'Refurbishment', status: 'Complete', value: 185 },
    { label: 'H', type: 'Refurbishment', status: 'Complete', value: 191 },
    { label: 'I', type: 'Refurbishment', status: 'Complete', value: 122 },
    { label: 'J', type: 'Refurbishment', status: 'Complete', value: 550 },
    { label: 'K', type: 'Refurbishment', status: 'Complete', value: 881 },
    { label: 'L', type: 'Refurbishment', status: 'Complete', value: 539 },
    { label: 'M', type: 'Refurbishment', status: 'Complete', value: 269 },
    { label: 'N', type: 'Refurbishment', status: 'Complete', value: 29 },
    { label: 'O', type: 'Refurbishment', status: 'Complete', value: 82 },
    { label: 'P', type: 'Refurbishment', status: 'Complete', value: 44 },
    { label: 'Q', type: 'Refurbishment', status: 'Complete', value: 109 },
    { label: 'R', type: 'Refurbishment', status: 'Complete', value: 106 },
    { label: 'S', type: 'Refurbishment', status: 'Complete', value: 607 },
    { label: 'T', type: 'Refurbishment', status: 'Complete', value: 528 },
    // Add more demo data for New build/Estimate if needed
    { label: 'U', type: 'New build', status: 'Complete', value: 400 },
    { label: 'V', type: 'New build', status: 'Estimate', value: 320 },
    { label: 'W', type: 'Refurbishment', status: 'Estimate', value: 210 },
  ];
  let currentType = 'Refurbishment';
  let currentStatus = 'Complete';
  function renderChart() {
    // Filter data
    let data = allData.filter(d =>
      (currentType === 'All' || d.type === currentType) &&
      (currentStatus === 'All' || d.status === currentStatus)
    );
    if (currentType === 'All') data = allData.filter(d => (currentStatus === 'All' || d.status === currentStatus));
    if (currentStatus === 'All') data = allData.filter(d => (currentType === 'All' || d.type === currentType));
    // Chart dimensions
    const maxY = 1200;
    const minY = 0;
    const chartHeight = 420;
    // Y grid lines
    const gridLines = [0, 200, 400, 600, 800, 1000, 1200];
    // Legend lines
    const legendLines = [
      { y: 500, class: 'dashed' },
      { y: 600, class: 'solid' }
    ];
    // Build chart HTML
    let html = `<div class='bar-chart-area' style='position:relative;'>`;
    // Grid lines
    gridLines.forEach(y => {
      const top = chartHeight - (y - minY) / (maxY - minY) * chartHeight;
      html += `<div class='bar-grid-line' style='top:${top}px'></div>`;
      html += `<div class='bar-y-label' style='top:${top-10}px'>${y}</div>`;
    });
    // Legend lines
    legendLines.forEach(l => {
      const top = chartHeight - (l.y - minY) / (maxY - minY) * chartHeight;
      html += `<div class='bar-legend-line ${l.class}' style='top:${top}px'></div>`;
    });
    // Bars
    html += `<div style='display:flex;align-items:flex-end;height:${chartHeight}px;'>`;
    data.forEach(d => {
      const barHeight = (d.value - minY) / (maxY - minY) * chartHeight;
      html += `<div class='bar'>
        <div class='bar-rect${d.status === 'Estimate' ? ' estimate' : ''}' style='height:${barHeight}px'></div>
        <div class='bar-label'>${d.value}</div>
        <div class='bar-x-label'>${d.label}</div>
      </div>`;
    });
    html += `</div></div>`;
    barChart.innerHTML = html;
  }
  // Button logic
  typeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      typeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentType = this.textContent.trim();
      if (currentType === 'All') currentType = 'All';
      renderChart();
    });
  });
  statusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      statusBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentStatus = this.textContent.trim();
      if (currentStatus === 'All') currentStatus = 'All';
      renderChart();
    });
  });
  // Initial render
  renderChart();
})();
// Dashboard Section Logic
(function() {
  const dashboardSection = document.getElementById('dashboard-section');
  if (!dashboardSection) return;
  // Theme toggle logic
  const themeToggle = dashboardSection.querySelector('#themeToggle');
  function setTheme(isLight) {
    if (isLight) {
      dashboardSection.classList.add('light');
      themeToggle.innerHTML = '☀ Light';
    } else {
      dashboardSection.classList.remove('light');
      themeToggle.innerHTML = '🌙 Dark';
    }
  }
  let isLight = false;
  themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    setTheme(isLight);
  });
  setTheme(isLight);

  // Restore dashboard popup hover logic
  const hoverTargets = dashboardSection.querySelectorAll('.hover-target');
  const popupsIds = ['reports', 'forecasts', 'dashboards', 'consolidations'];
  const popupsMap = {};
  popupsIds.forEach(id => {
    popupsMap[id] = dashboardSection.querySelector('#popups-' + id);
  });
  let currentPopup = null;
  hoverTargets.forEach(target => {
    const popupId = target.getAttribute('data-popup');
    const popup = popupsMap[popupId];
    target.addEventListener('mouseenter', () => {
      Object.values(popupsMap).forEach(p => p.style.display = 'none');
      popup.style.display = 'block';
      currentPopup = popup;
    });
    target.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!popup.matches(':hover')) {
          popup.style.display = 'none';
          currentPopup = null;
        }
      }, 100);
    });
    popup.addEventListener('mouseenter', () => {
      popup.style.display = 'block';
      currentPopup = popup;
    });
    popup.addEventListener('mouseleave', () => {
      popup.style.display = 'none';
      currentPopup = null;
    });
  });
})(); 