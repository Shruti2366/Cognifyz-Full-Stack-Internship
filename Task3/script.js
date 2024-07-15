document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const routes = {
    '': homePage,
    '#form': formPage
  };

  function navigate(hash) {
    window.location.hash = hash;
    renderRoute(hash);
  }

  function renderRoute(hash) {
    console.log(`Rendering route: ${hash}`);
    const route = routes[hash];
    if (typeof route === 'function') {
      app.innerHTML = route();
      if (hash === '#form') {
        addFormEventListeners();
      }
    } else {
      app.innerHTML = '<h1>404 - Not Found</h1>';
    }
  }

  function homePage() {
    return `
      <h1>Welcome</h1>
      <p><a href="#form" id="goToForm" class="btn btn-primary">Go to Form</a></p>
    `;
  }

  function formPage() {
    return `
      <h1>Registration Form</h1>
      <form id="registrationForm" class="needs-validation" novalidate>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username" required>
          <span class="error-message" id="usernameError"></span>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" required>
          <span class="error-message" id="emailError"></span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <span class="password-strength" id="passwordStrength"></span>
          <div id="passwordStrengthBar"><div></div></div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
          <span class="error-message" id="confirmPasswordError"></span>
        </div>
        <button type="submit" class="btn btn-success">Register</button>
        <span class="success-message" id="successMessage">Form submitted successfully!</span>
      </form>
    `;
  }

  function addFormEventListeners() {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');
    const passwordStrengthBar = document.getElementById('passwordStrengthBar').firstElementChild;

    const existingUsernames = ['user1', 'admin', 'test'];

    usernameInput.addEventListener('input', () => {
      const usernameError = document.getElementById('usernameError');
      if (existingUsernames.includes(usernameInput.value)) {
        usernameError.textContent = 'Username already taken';
        usernameInput.classList.add('error');
      } else {
        usernameError.textContent = '';
        usernameInput.classList.remove('error');
      }
    });

    emailInput.addEventListener('input', () => {
      const emailError = document.getElementById('emailError');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Invalid email address';
        emailInput.classList.add('error');
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
      }
    });

    passwordInput.addEventListener('input', () => {
      const passwordStrength = document.getElementById('passwordStrength');
      const passwordValue = passwordInput.value;
      let strengthMessage = '';
      let strengthClass = '';

      if (passwordValue.length < 8) {
        strengthMessage = 'Password too short';
        strengthClass = 'weak';
      } else if (!/[A-Z]/.test(passwordValue)) {
        strengthMessage = 'Add an uppercase letter';
        strengthClass = 'medium';
      } else if (!/\d/.test(passwordValue)) {
        strengthMessage = 'Add a number';
        strengthClass = 'strong';
      } else if (!/[!@#$%^&*]/.test(passwordValue)) {
        strengthMessage = 'Add a special character';
        strengthClass = 'very-strong';
      } else {
        strengthMessage = 'Password is very strong';
        strengthClass = 'very-strong';
      }

      passwordStrength.textContent = strengthMessage;
      passwordStrengthBar.className = strengthClass;
    });

    confirmPasswordInput.addEventListener('input', () => {
      const confirmPasswordError = document.getElementById('confirmPasswordError');
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordInput.classList.add('error');
      } else {
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('error');
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
      form.reset();
      passwordStrengthBar.className = '';
    });
  }

  window.addEventListener('hashchange', () => {
    renderRoute(window.location.hash);
  });

  // Initial render
  if (!routes[window.location.hash]) {
    navigate('');
  } else {
    renderRoute(window.location.hash);
  }
});
