function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('ca-theme', isDark ? 'dark' : 'light');

  const btn = document.getElementById('themeToggleBtn');
  btn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}
function validateContactForm(event) {
  event.preventDefault(); // stop page from reloading on submit

  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const address = document.getElementById('addressInput').value.trim();
  const phonePattern = /^(\+254|0)[17]\d{8}$/;

  let isValid = true;

  if (name === '') {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('nameError').style.display = 'none';
  }

  if (!phonePattern.test(phone)) {
    document.getElementById('phoneError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('phoneError').style.display = 'none';
  }

  if (address === '') {
    document.getElementById('addressError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('addressError').style.display = 'none';
  }

  if (isValid) {
    document.getElementById('formSuccessMessage').style.display = 'block';
    event.target.reset();
  }
}

// ---- RUN ON PAGE LOAD ----
document.addEventListener('DOMContentLoaded', function () {
  // Restore dark mode if it was saved on a previous page
  if (localStorage.getItem('ca-theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggleBtn').textContent = '☀️ Light Mode';
  }

  // Connect the dark mode button (if this page has one)
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Connect the contact form (only exists on contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', validateContactForm);
});