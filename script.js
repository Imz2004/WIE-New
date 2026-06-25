document.addEventListener('DOMContentLoaded', function() {
  function init() {
    console.log('script.js initializing...');
    // Select DOM elements
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navMenu = document.querySelector('.nav-menu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Initial highlight based on URL hash
    const hash = window.location.hash;
    if (hash) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').endsWith(hash)) {
          link.classList.add('active');
        }
      });
    }
  
    // Initialize navigation toggle with accessibility attributes
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Toggle navigation menu');
      
      // Toggle navigation menu on mobile
      navToggle.addEventListener('click', function() {
        if (mainNav) {
          if (mainNav.style.display === 'block') {
            mainNav.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
          } else {
            mainNav.style.display = 'block';
            navToggle.setAttribute('aria-expanded', 'true');
            mainNav.classList.add('active');
          }
        }
      });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && mainNav && navToggle) {
          mainNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('active');
        }
      });
    });
    
    // Handle active navigation highlighting based on scroll position
    function highlightActiveNav() {
      const headerEl = document.querySelector('header');
      if (!headerEl) return;
      const headerHeight = headerEl.offsetHeight;
      
      // Add header height to account for fixed header
      const scrollPosition = window.scrollY + headerHeight + 5; // Small buffer
      
      // Get all sections and their positions
      const viewportHeight = window.innerHeight;
      const sectionPositions = Array.from(sections)
        .filter(section => section.getAttribute('id'))
        .map(section => {
          const rect = section.getBoundingClientRect();
          return {
            id: section.getAttribute('id'),
            top: rect.top + window.pageYOffset - headerHeight,
            bottom: rect.bottom + window.pageYOffset - headerHeight,
            height: rect.height,
            visiblePercentage: Math.max(0,
              Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
            ) / viewportHeight
          };
        });
      
      // Find the most visible section
      let currentSection = '';
      let maxVisibility = 0;
      
      sectionPositions.forEach(section => {
        if (section.visiblePercentage > maxVisibility) {
          maxVisibility = section.visiblePercentage;
          currentSection = section.id;
        }
      });
      
      // If we're at the very top of the page, highlight home
      if (window.scrollY < 50) {
        currentSection = 'home';
      }
      
      // Update active class on navigation links
      navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (!href) return;
  
        // For hash links on the current page
        if (href.includes('#')) {
          const hrefSection = href.split('#')[1];
          if (hrefSection === currentSection) {
            link.classList.add('active');
          }
        }
        // For separate page links
        else if (window.location.pathname.endsWith(href)) {
          link.classList.add('active');
        }
      });
      
      // Update URL hash without scrolling
      if (currentSection && currentSection !== 'home') {
        history.replaceState(null, null, `#${currentSection}`);
      }
    }
    
    // Run on load and scroll
    highlightActiveNav();
    window.addEventListener('scroll', highlightActiveNav);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (mainNav && navToggle) {
        // If screen size increases past mobile breakpoint, ensure proper nav display
        if (window.innerWidth > 768) {
          mainNav.style.display = 'block';
          navToggle.setAttribute('aria-expanded', 'false');
        } else if (!mainNav.classList.contains('active')) {
          mainNav.style.display = 'none';
        }
      }
    });
    
    // Check if images are loading properly
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.addEventListener('error', function() {
        console.error('Failed to load image:', img.src);
      });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.event-card, .team-member, .about-image, .contact-card, .map-container');
    
    function animateOnScroll() {
      const triggerPosition = window.innerHeight * 0.8;
      
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial styles for animation
    animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial setup for responsive elements
    function setupResponsiveElements() {
      if (mainNav) {
        // Make sure menu is properly hidden on mobile initially
        if (window.innerWidth <= 768) {
          mainNav.style.display = 'none';
        } else {
          mainNav.style.display = 'block';
        }
      }
    }
    
    // Run initial setup
    setupResponsiveElements();
  }

  // Check if there are dynamic components to load
  const hasDynamicComponents = document.querySelectorAll('[w3-include-html]').length > 0;
  if (hasDynamicComponents) {
    console.log('Dynamic components detected. Waiting for componentsLoaded event...');
    document.addEventListener('componentsLoaded', init);
  } else {
    console.log('No dynamic components. Initializing script immediately.');
    // If no dynamic components, run initialization after a small timeout to let the page settle
    setTimeout(init, 0);
  }
});
