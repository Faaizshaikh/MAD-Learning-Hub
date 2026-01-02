/**
 * Mobile App Development Learning Hub
 * Main JavaScript File
 * Handles navigation, smooth scrolling, and interactive features
 */

// ==========================================
// 1. NAVIGATION SETUP
// ==========================================

/**
 * Initialize navigation and menu functionality
 */
function initializeNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      updateActiveLink(link);
    });
  });

  // Update active link on page load
  updateActiveLinkOnLoad();

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navbarMenu &&
      !navbarMenu.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      navbarMenu.classList.remove('active');
    }
  });
}

/**
 * Update the active navigation link based on current page
 * @param {HTMLElement} link - The clicked link element
 */
function updateActiveLink(link) {
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach((item) => {
    item.classList.remove('active');
  });
  link.classList.add('active');
}

/**
 * Update active link based on current page URL on page load
 */
function updateActiveLinkOnLoad() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// 2. SCROLL EFFECTS
// ==========================================

/**
 * Handle navbar styling on scroll
 */
function handleNavbarScroll() {
  const navbar = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Smooth scroll to element when clicking anchor links
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for sticky navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
}

// ==========================================
// 3. ANIMATIONS & EFFECTS
// ==========================================

/**
 * Observe elements and add animation classes when they come into view
 */
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and section content
  document.querySelectorAll('.card, .content-row, .timeline-item').forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
    observer.observe(element);
  });
}

// ==========================================
// 4. FORM HANDLING
// ==========================================

/**
 * Initialize form validation and submission
 */
function initializeFormHandling() {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic form validation
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === '') {
          input.style.borderColor = 'var(--danger-color)';
          isValid = false;
        } else {
          input.style.borderColor = 'var(--border-color)';
        }
      });

      if (isValid) {
        // Show success message (in a real app, you'd send this to a server)
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  });
}

// ==========================================
// 5. TABLE INTERACTIVITY
// ==========================================

/**
 * Make tables more interactive
 */
function initializeTableInteractivity() {
  const tables = document.querySelectorAll('table');

  tables.forEach((table) => {
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row) => {
      row.addEventListener('mouseover', () => {
        row.style.backgroundColor = 'var(--primary-light)';
        row.style.color = 'white';
      });

      row.addEventListener('mouseout', () => {
        row.style.backgroundColor = '';
        row.style.color = '';
      });
    });
  });
}

// ==========================================
// 6. BUTTON INTERACTIONS
// ==========================================

/**
 * Handle button clicks
 */
function initializeButtonInteractivity() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      // Check if it's an internal link
      if (this.hasAttribute('href')) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          // Anchor link - handled by smooth scroll
          return;
        } else if (!href.startsWith('http')) {
          // Internal page link
          window.location.href = href;
        }
      }
    });
  });
}

// ==========================================
// 7. INITIALIZE ALL FEATURES
// ==========================================

/**
 * Initialize all JavaScript features when DOM is loaded
 */
function initializeApp() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupApp);
  } else {
    setupApp();
  }
}

/**
 * Setup function to initialize all features
 */
function setupApp() {
  initializeNavigation();
  handleNavbarScroll();
  initializeSmoothScroll();
  initializeIntersectionObserver();
  initializeFormHandling();
  initializeTableInteractivity();
  initializeButtonInteractivity();

  console.log('Mobile App Development Learning Hub initialized successfully!');
}

// Start the application
initializeApp();

// ==========================================
// 8. UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Add a class to an element
 * @param {HTMLElement} element - The element
 * @param {string} className - Class name to add
 */
function addClass(element, className) {
  if (element && !element.classList.contains(className)) {
    element.classList.add(className);
  }
}

/**
 * Remove a class from an element
 * @param {HTMLElement} element - The element
 * @param {string} className - Class name to remove
 */
function removeClass(element, className) {
  if (element && element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

/**
 * Toggle a class on an element
 * @param {HTMLElement} element - The element
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * Check if element has a class
 * @param {HTMLElement} element - The element
 * @param {string} className - Class name to check
 * @returns {boolean} - True if element has class
 */
function hasClass(element, className) {
  return element && element.classList.contains(className);
}
