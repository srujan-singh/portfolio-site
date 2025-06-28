console.log("Welcome to Srujan's Portfolio");

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
}

// Handle contact form submission
const form = document.getElementById('contact-form');
const responseDiv = document.getElementById('form-response');

form?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      responseDiv.innerHTML = '<div class="custom-alert success">✅ Message sent successfully!</div>';
      form.reset();
    } else {
      const data = await res.json();
      responseDiv.innerHTML = `<div class="custom-alert error">❌ Error: ${data?.error || 'Unable to send message.'}</div>`;
    }
  } catch (error) {
    responseDiv.innerHTML = '<div class="custom-alert error">❌ An unexpected error occurred.</div>';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    setTimeout(() => {
      responseDiv.innerHTML = '';
    }, 5000);
  }
});
