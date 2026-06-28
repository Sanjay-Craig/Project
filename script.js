/* Dark / Light Mode Toggle  */
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('ca-theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

/*  Contact Form Validation  */
function validateContactForm(event) {
  event.preventDefault();

  const name    = document.getElementById('nameInput').value.trim();
  const phone   = document.getElementById('phoneInput').value.trim();
  const address = document.getElementById('addressInput').value.trim();
  const phonePattern = /^(\+254|0)[17]\d{8}$/;

  let isValid = true;

  if (name === '') {
    showError('nameError', 'nameInput');
    isValid = false;
  } else {
    hideError('nameError', 'nameInput');
  }

  if (!phonePattern.test(phone)) {
    showError('phoneError', 'phoneInput');
    isValid = false;
  } else {
    hideError('phoneError', 'phoneInput');
  }

  if (address === '') {
    showError('addressError', 'addressInput');
    isValid = false;
  } else {
    hideError('addressError', 'addressInput');
  }

  if (isValid) {
    document.getElementById('formSuccessMessage').style.display = 'block';
    event.target.reset();
    setTimeout(() => {
      const msg = document.getElementById('formSuccessMessage');
      if (msg) msg.style.display = 'none';
    }, 4000);
  }
}

function showError(errorId, inputId) {
  const err = document.getElementById(errorId);
  const inp = document.getElementById(inputId);
  if (err) err.style.display = 'block';
  if (inp) {
    inp.setAttribute('aria-invalid', 'true');
    inp.classList.add('is-invalid');
  }
}

function hideError(errorId, inputId) {
  const err = document.getElementById(errorId);
  const inp = document.getElementById(inputId);
  if (err) err.style.display = 'none';
  if (inp) {
    inp.setAttribute('aria-invalid', 'false');
    inp.classList.remove('is-invalid');
  }
}

/*  Product Filter */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products   = document.querySelectorAll('.product-item');

  if (!filterBtns.length || !products.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const brand = btn.dataset.brand;

      products.forEach(item => {
        if (brand === 'all' || item.dataset.brand === brand) {
          item.style.display = '';
          item.setAttribute('aria-hidden', 'false');
        } else {
          item.style.display = 'none';
          item.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/* Gallery Lightbox Modal  */
function initGalleryModal() {
  const galleryImgs = document.querySelectorAll('.gallery-img img');
  const modalImg    = document.getElementById('modalImage');
  const modalLabel  = document.getElementById('galleryModalLabel');

  if (!galleryImgs.length || !modalImg) return;

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      if (modalLabel) modalLabel.textContent = img.alt;
    });
  });
}

/* Back to Top Button */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Bootstrap Tooltips */
function initTooltips() {
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(el => new bootstrap.Tooltip(el));
}

/*  DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('ca-theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = 'Light Mode';
  }

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', validateContactForm);

  initProductFilter();
  initGalleryModal();
  initBackToTop();
  initTooltips();
});