// Unified portfolio script – configuration, navigation, and contact form validation

/* -------------------------------------------------
   Configuration (editable in one place)
   ------------------------------------------------- */
const portfolioConfig = {
  name: "Tarak Rowthu",
  role: "Web Developer",
  intro: "Passionate full‑stack developer with 5+ years of experience building responsive, accessible web applications.",
  profileImg: "https://via.placeholder.com/200", // replace with your actual photo URL
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/tarak-rowthu-github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/rowthu-tarak" }
  ]
};

/* -------------------------------------------------
   DOM Population – inject configurable data
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Insert name, role, intro where placeholders exist
  document.querySelectorAll('.js-name').forEach(el => el.textContent = portfolioConfig.name);
  document.querySelectorAll('.js-role').forEach(el => el.textContent = portfolioConfig.role);
  document.querySelectorAll('.js-intro').forEach(el => el.textContent = portfolioConfig.intro);

  // Profile picture in hero
  const profileImgEl = document.querySelector('.js-profile-img');
  if (profileImgEl) {
    profileImgEl.src = portfolioConfig.profileImg;
    profileImgEl.alt = `${portfolioConfig.name} profile picture`;
  }

  // Footer social links (used on all pages)
  document.querySelectorAll('.footer-social').forEach(container => {
    portfolioConfig.socialLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute('aria-label', link.platform);
      a.textContent = link.platform; // placeholder – replace with SVG icons if desired
      container.appendChild(a);
    });
  });

  /* -------------------------------------------------
     Navigation – keyboard (Enter) support & hamburger toggle
     ------------------------------------------------- */
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter') link.click();
    });
  });

  /* -------------------------------------------------
     Contact Form – validation & accessible feedback
     ------------------------------------------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    // Create ARIA live region for status messages
    const statusDiv = document.createElement('div');
    statusDiv.setAttribute('role', 'alert');
    statusDiv.setAttribute('aria-live', 'assertive');
    statusDiv.className = 'form-status';
    form.prepend(statusDiv);

    form.addEventListener('submit', e => {
      e.preventDefault();
      statusDiv.textContent = '';
      let valid = true;

      const fields = [
        { el: form.elements['name'], msg: 'Please enter your name' },
        { el: form.elements['email'], msg: 'Please enter a valid email address', pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
        { el: form.elements['subject'], msg: 'Subject is required' },
        { el: form.elements['message'], msg: 'Message cannot be empty' }
      ];

      fields.forEach(f => {
        if (!f.el.value.trim()) {
          valid = false;
          f.el.setCustomValidity(f.msg);
        } else if (f.pattern && !f.pattern.test(f.el.value)) {
          valid = false;
          f.el.setCustomValidity(f.msg);
        } else {
          f.el.setCustomValidity('');
        }
      });

      // Show native validation UI
      form.reportValidity();

      if (valid) {
        // Simulated successful send – replace with real API call if needed
        statusDiv.textContent = '✅ Your message has been sent successfully!';
        form.reset();
      } else {
        statusDiv.textContent = '⚠️ Please correct the highlighted errors.';
      }
    });
  }
});
