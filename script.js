const API_BASE = "https://your-backend-url.com"; // Replace with your backend URL

// Elements
const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');
const notice = document.getElementById('notice');

// Toggle password visibility
document.getElementById('togglePwd').addEventListener('click', () => {
  const isPwd = password.type === 'password';
  password.type = isPwd ? 'text' : 'password';
  document.getElementById('togglePwd').textContent = isPwd ? 'Hide' : 'Show';
  password.focus();
});

// Forgot password placeholder
document.getElementById('forgot').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Forgot password clicked — implement your reset flow here.');
});

// Sign up button placeholder
document.getElementById('signup').addEventListener('click', () => {
  alert('Sign up clicked — implement registration tab or page.');
});

// Login / Sign up submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.style.display = 'none';
  notice.style.display = 'none';

  const emailVal = email.value.trim();
  const pwdVal = password.value.trim();

  if (!emailVal || pwdVal.length < 6) {
    errorMsg.textContent = "Invalid email or password (min 6 chars).";
    errorMsg.style.display = 'block';
    return;
  }

  try {
    // Example: login request
    const response = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailVal, password: pwdVal })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message || "Login failed.";
      errorMsg.style.display = 'block';
      return;
    }

    // Store JWT
    localStorage.setItem('token', data.token);

    notice.style.display = 'block';
    notice.textContent = '✅ Logged in successfully!';

    // Optionally redirect to a dashboard page
    // window.location.href = '/dashboard.html';

  } catch (err) {
    errorMsg.textContent = "Network error — try again.";
    errorMsg.style.display = 'block';
  }
});
