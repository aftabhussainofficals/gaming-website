// Dynamic Body Interaction System
class DynamicBodySystem {
  constructor() {
    this.init();
  }

  init() {
    this.setupObservers();
    this.setupIntersectionObserver();
    this.setupResizeObserver();
    this.setupMotionPreference();
    this.setupScrollEffects();
    this.setupPerformanceMonitor();
    this.setupContainerQueriesPolyfill();
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add data-visible attribute for CSS
            entry.target.dataset.visible = 'true';
            
            // Stagger children animation
            if (entry.target.classList.contains('stagger-children')) {
              this.animateStaggerChildren(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });
  }

  // Stagger animation for children
  animateStaggerChildren(parent) {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Resize Observer for responsive adjustments
  setupResizeObserver() {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this.handleResize(entry.target, entry.contentRect);
      });
    });

    // Observe main content container
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      resizeObserver.observe(mainContent);
    }

    // Observe dynamic containers
    document.querySelectorAll('.dynamic-container').forEach((container) => {
      resizeObserver.observe(container);
    });
  }

  handleResize(element, rect) {
    // Add responsive classes based on width
    if (rect.width < 400) {
      element.classList.add('xs-breakpoint');
      element.classList.remove('sm-breakpoint', 'md-breakpoint');
    } else if (rect.width < 768) {
      element.classList.add('sm-breakpoint');
      element.classList.remove('xs-breakpoint', 'md-breakpoint');
    } else if (rect.width < 1024) {
      element.classList.add('md-breakpoint');
      element.classList.remove('xs-breakpoint', 'sm-breakpoint');
    } else {
      element.classList.remove('xs-breakpoint', 'sm-breakpoint', 'md-breakpoint');
    }

    // Update CSS custom properties
    this.updateDynamicProperties(element, rect);
  }

  updateDynamicProperties(element, rect) {
    // Calculate and set dynamic properties
    const width = rect.width;
    const height = rect.height;
    
    // Set aspect ratio property
    const aspectRatio = width / height;
    element.style.setProperty('--aspect-ratio', aspectRatio);
    
    // Set container width percentage
    const viewportWidth = window.innerWidth;
    const widthPercentage = (width / viewportWidth) * 100;
    element.style.setProperty('--container-width-percentage', `${widthPercentage}%`);
    
    // Set content density based on area
    const area = width * height;
    const density = Math.min(area / 100000, 1);
    element.style.setProperty('--content-density', density);
  }

  // Motion preference detection
  setupMotionPreference() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
      
      // Disable all animations
      this.disableAnimations();
    }

    // Listen for changes
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduced-motion');
        this.disableAnimations();
      } else {
        document.documentElement.classList.remove('reduced-motion');
        this.enableAnimations();
      }
    });
  }

  disableAnimations() {
    document.querySelectorAll('*').forEach(el => {
      el.style.animationPlayState = 'paused';
      el.style.transition = 'none';
    });
  }

  enableAnimations() {
    document.querySelectorAll('*').forEach(el => {
      el.style.animationPlayState = 'running';
      el.style.transition = '';
    });
  }

  // Scroll-based effects
  setupScrollEffects() {
    let ticking = false;
    
    const updateOnScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercent = (scrollY / (docHeight - windowHeight)) * 100;
      document.documentElement.style.setProperty('--scroll-percentage', `${scrollPercent}%`);
      
      // Update scroll position variable
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
      
      // Parallax effects
      this.applyParallaxEffects(scrollY);
      
      // Progress indicators
      this.updateProgressIndicators(scrollPercent);
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  applyParallaxEffects(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  updateProgressIndicators(percent) {
    const indicators = document.querySelectorAll('.progress-indicator');
    
    indicators.forEach((indicator) => {
      indicator.style.setProperty('--progress', `${percent}%`);
      
      // Update aria-valuenow for accessibility
      indicator.setAttribute('aria-valuenow', Math.round(percent));
    });
  }

  // Performance monitoring
  setupPerformanceMonitor() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Store LCP time for optimization
        if (lastEntry.startTime < 2500) {
          document.documentElement.classList.add('good-performance');
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor layout shifts
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          if (!entry.hadRecentInput && entry.value > 0.1) {
            console.warn('Layout shift detected:', entry);
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Container queries polyfill for older browsers
  setupContainerQueriesPolyfill() {
    // Check for container queries support
    if (!('container' in document.documentElement.style)) {
      this.polyfillContainerQueries();
    }
  }

  polyfillContainerQueries() {
    // Basic polyfill using ResizeObserver
    const containerObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const width = entry.contentRect.width;
        const container = entry.target;
        
        // Remove all breakpoint classes
        container.classList.remove('container-xs', 'container-sm', 'container-md', 'container-lg', 'container-xl');
        
        // Add appropriate class
        if (width < 400) container.classList.add('container-xs');
        else if (width < 640) container.classList.add('container-sm');
        else if (width < 768) container.classList.add('container-md');
        else if (width < 1024) container.classList.add('container-lg');
        else container.classList.add('container-xl');
      });
    });

    // Observe all containers
    document.querySelectorAll('[class*="container"]').forEach((container) => {
      containerObserver.observe(container);
    });
  }

  // Setup mutation observer for dynamic content
  setupObservers() {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.handleNewContent(mutation.addedNodes);
        }
      });
    });

    // Observe body for new content
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  handleNewContent(nodes) {
    nodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Initialize scroll animations for new elements
        if (node.classList && node.classList.contains('scroll-animate')) {
          this.setupIntersectionObserver();
        }
        
        // Initialize container queries for new containers
        if (node.classList && (
          node.classList.contains('dynamic-container') ||
          node.classList.contains('card-container') ||
          node.classList.contains('grid-container')
        )) {
          this.setupResizeObserver();
        }
      }
    });
  }

  // Dynamic theme switching
  setTheme(theme) {
    const validThemes = ['dark', 'light', 'auto'];
    
    if (!validThemes.includes(theme)) {
      console.error('Invalid theme:', theme);
      return;
    }
    
    // Remove existing theme classes
    document.documentElement.classList.remove('dark-mode', 'light-mode', 'auto-theme');
    
    // Add new theme class
    if (theme === 'auto') {
      document.documentElement.classList.add('auto-theme');
      this.applySystemTheme();
    } else {
      document.documentElement.classList.add(`${theme}-mode`);
    }
    
    // Store preference
    localStorage.setItem('preferred-theme', theme);
  }

  applySystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }

  // Utility methods for dynamic adjustments
  adjustLayoutDensity(density = 'normal') {
    const densities = ['compact', 'normal', 'comfortable'];
    
    if (!densities.includes(density)) {
      console.error('Invalid density:', density);
      return;
    }
    
    // Remove existing density classes
    document.documentElement.classList.remove('density-compact', 'density-normal', 'density-comfortable');
    
    // Add new density class
    document.documentElement.classList.add(`density-${density}`);
    
    // Update CSS custom properties
    const densityMap = {
      compact: 0.75,
      normal: 1,
      comfortable: 1.25
    };
    
    document.documentElement.style.setProperty('--density-multiplier', densityMap[density]);
  }

  // Performance optimization
  optimizePerformance() {
    // Defer non-critical CSS
    this.loadCriticalCSS();
    
    // Lazy load images
    this.lazyLoadImages();
    
    // Preload important resources
    this.preloadResources();
  }

  loadCriticalCSS() {
    // Inline critical CSS already in HTML
    // This method would load non-critical CSS
    const nonCriticalLink = document.createElement('link');
    nonCriticalLink.rel = 'stylesheet';
    nonCriticalLink.href = '/assets/css/non-critical.css';
    nonCriticalLink.media = 'print';
    nonCriticalLink.onload = () => {
      nonCriticalLink.media = 'all';
    };
    document.head.appendChild(nonCriticalLink);
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  preloadResources() {
    // Preload important resources
    const resources = [
      '/assets/fonts/gaming-font.woff2',
      '/assets/images/hero-bg.jpg',
      '/assets/js/main.js'
    ];
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.woff2') ? 'font' :
                resource.endsWith('.jpg') ? 'image' :
                resource.endsWith('.js') ? 'script' : 'fetch';
      document.head.appendChild(link);
    });
  }
}

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
  const dynamicBodySystem = new DynamicBodySystem();
  
  // Expose to window for debugging
  window.dynamicBodySystem = dynamicBodySystem;
  
  // Auto-optimize on load
  dynamicBodySystem.optimizePerformance();
  
  // Apply saved theme preference
  const savedTheme = localStorage.getItem('preferred-theme') || 'auto';
  dynamicBodySystem.setTheme(savedTheme);
});

// Export for module usage
export default DynamicBodySystem;