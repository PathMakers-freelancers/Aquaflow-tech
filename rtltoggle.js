document.addEventListener('DOMContentLoaded', function () {
  initRTLToggle();
});

function initRTLToggle() {
  const savedDirection = localStorage.getItem('direction') || 'ltr';
  applyDirection(savedDirection);
  updateRTLIcon(savedDirection);

  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const currentDirection = document.documentElement.getAttribute('dir') || 'ltr';
      const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';

      applyDirection(newDirection);
      localStorage.setItem('direction', newDirection);
      updateRTLIcon(newDirection);
    });
  });
}

function applyDirection(direction) {
  // Apply to both html and body elements
  document.documentElement.setAttribute('dir', direction);
  document.body.setAttribute('dir', direction);

  // Also set the lang attribute hint for RTL languages
  if (direction === 'rtl') {
    document.documentElement.setAttribute('lang', 'ar'); // Arabic as example
  } else {
    document.documentElement.setAttribute('lang', 'en');
  }
}

function updateRTLIcon(direction) {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    // Keep the FontAwesome icon if it exists, otherwise use emoji
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-globe';
    } else {
      toggle.innerHTML = '🌐';
    }

    if (direction === 'ltr') {
      toggle.setAttribute('title', 'Switch to RTL (Right-to-Left)');
    } else {
      toggle.setAttribute('title', 'Switch to LTR (Left-to-Right)');
    }
  });
}
