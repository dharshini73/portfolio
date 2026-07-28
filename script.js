/**
 * S. Mahadharshini - Portfolio Interactive Javascript
 * Handlers: Theme toggler, Hamburger menu, Skills filter, Certificate Modal, Scroll triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Switcher Logic ---
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- 2. Mobile Menu (Hamburger) Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- 3. Scroll Progress Indicator ---
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const scrollPercent = (window.pageYOffset / totalScroll) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    } else {
      scrollProgress.style.width = '0%';
    }
  });

  // --- 4. Skill Filter Logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Small timeout to trigger transition if needed
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Wait for CSS transition before hiding
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 5. Skill Bar Fill Animation with IntersectionObserver ---
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
        // Unobserve once animated
        observer.unobserve(entry.target);
      }
    });
  };

  const skillsObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.15
  });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // --- 6. Certificate Lightbox Modal ---
  const certMockup = document.getElementById('certMockup');
  const certModal = document.getElementById('certModal');
  const modalClose = document.getElementById('modalClose');

  if (certMockup && certModal && modalClose) {
    certMockup.addEventListener('click', () => {
      certModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop page scrolling
    });

    const closeModal = () => {
      certModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore page scrolling
    };

    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the certificate image
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --- 7. Reveal Sections on Scroll (Scroll Trigger Animations) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Keep observing in case we want them to re-trigger, or unobserve for one-time animation
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealOnScroll, {
    root: null, // viewport
    threshold: 0.10, // trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // offset slightly
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- 8. Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Simulated success feedback
      alert(`Thank you, ${name}! Your message has been sent successfully. S. Mahadharshini will contact you soon.`);
      contactForm.reset();
    });
  }
});
