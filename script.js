/**
 * Main JavaScript for M Fitra Al Ghifari Portfolio
 * Handles Navigation, Mobile Drawer, Active Links, and Interactive Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Toggle ---
  const mobileBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking any mobile link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      });
    });
  }

  // --- 2. Scroll-to-Top Button & Active Section Highlight ---
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Show/hide scroll to top button
    if (scrollToTopBtn) {
      if (scrollY > 350) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    // Active Section Spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// --- 3. Interactive Contact Form Submission ---
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('sender-name');
  const subjectInput = document.getElementById('message-subject');
  const messageInput = document.getElementById('message-body');
  const submitBtn = document.getElementById('submit-btn');
  const btnIcon = document.getElementById('btn-icon');
  const btnText = document.getElementById('btn-text');
  const successAlert = document.getElementById('success-alert');
  const successText = document.getElementById('success-text');

  if (!nameInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
    alert('Mohon lengkapi seluruh formulir sebelum mengirim pesan.');
    return;
  }

  const senderName = nameInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  // Button loading state
  submitBtn.disabled = true;
  btnIcon.className = 'fa-solid fa-spinner fa-spin';
  btnText.textContent = 'Mengirim Pesan...';

  // Simulate network dispatch safely
  setTimeout(() => {
    // Save to local storage for demonstrative persistence
    const savedMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    savedMessages.push({
      name: senderName,
      subject: subject,
      message: message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('portfolio_messages', JSON.stringify(savedMessages));

    // Reset button
    submitBtn.disabled = false;
    btnIcon.className = 'fa-solid fa-paper-plane';
    btnText.textContent = 'Kirim Pesan Sekarang';

    // Show customized success notification
    if (successAlert) {
      successText.innerHTML = `Terima kasih, <strong>${senderName}</strong>! Pesan Anda mengenai <em>"${subject}"</em> telah berhasil diterima.`;
      successAlert.classList.remove('hidden');

      // Scroll to alert smoothly
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Auto-hide alert after 8 seconds
      setTimeout(() => {
        successAlert.classList.add('hidden');
      }, 8000);
    }

    // Reset Form fields
    document.getElementById('contact-form').reset();
  }, 900);
}
