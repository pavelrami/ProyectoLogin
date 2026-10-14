document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const correoInput = document.getElementById('correo');
  const passwordInput = document.getElementById('password');
  const correoError = document.getElementById('correoError');
  const passwordError = document.getElementById('passwordError');
  const loginMessage = document.getElementById('loginMessage');
  const togglePassword = document.getElementById('togglePassword');

  // Si ya hay sesión simulada, permite continuar directamente al sistema.
  if (sessionStorage.getItem('usuarioLogin')) {
    window.location.replace('index.html');
    return;
  }

  function mostrarMensaje(texto, tipo) {
    loginMessage.textContent = texto;
    loginMessage.className = `form-message show ${tipo}`;
  }

  function limpiarErrores() {
    correoError.textContent = '';
    passwordError.textContent = '';
    loginMessage.className = 'form-message';
    loginMessage.textContent = '';
  }

  togglePassword.addEventListener('click', () => {
    const mostrar = passwordInput.type === 'password';
    passwordInput.type = mostrar ? 'text' : 'password';
    togglePassword.textContent = mostrar ? 'Ocultar' : 'Mostrar';
    togglePassword.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    limpiarErrores();

    const correo = correoInput.value.trim();
    const password = passwordInput.value;
    let formularioValido = true;

    if (!validarCorreo(correo)) {
      correoError.textContent = 'Ingresa un correo electrónico válido.';
      formularioValido = false;
    }

    if (!validarPassword(password)) {
      passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula, número y carácter especial.';
      formularioValido = false;
    }

    if (!formularioValido) {
      mostrarMensaje('Revisa los datos marcados antes de continuar.', 'error');
      return;
    }

    // Login simulado: no autentica contra servidor ni base de datos.
    sessionStorage.setItem('usuarioLogin', correo);
    mostrarMensaje('Datos correctos. Ingresando al sistema...', 'success');

    window.location.href = 'index.html';
  });
});
