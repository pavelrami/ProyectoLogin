document.addEventListener('DOMContentLoaded', () => {
  const usuarioSesion = sessionStorage.getItem('usuarioLogin');

  // Protección simulada: si no se inició sesión, regresa al login.
  if (!usuarioSesion) {
    window.location.replace('login.html');
    return;
  }

  const sidebarToggle = document.getElementById('sidebarToggle');
  const usuariosMenuButton = document.getElementById('usuariosMenuButton');
  const usuariosSubmenu = document.getElementById('usuariosSubmenu');
  const capturaMenuButton = document.getElementById('capturaMenuButton');
  const navbarUsuario = document.getElementById('navbarUsuario');
  const userMenuButton = document.getElementById('userMenuButton');
  const userDropdown = document.getElementById('userDropdown');
  const logoutButton = document.getElementById('logoutButton');

  const usuarioForm = document.getElementById('usuarioForm');
  const alumnoForm = document.getElementById('alumnoForm');

  const edadModal = document.getElementById('edadModal');
  const edadModalMessage = document.getElementById('edadModalMessage');
  const closeModalButton = document.getElementById('closeModalButton');
  const modalAceptarButton = document.getElementById('modalAceptarButton');

  navbarUsuario.textContent = usuarioSesion;

  function setMessage(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `form-message show ${tipo}`;
  }

  function clearMessage(elemento) {
    elemento.textContent = '';
    elemento.className = 'form-message';
  }

  function setFieldError(id, texto = '') {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = texto;
  }

  function cerrarDropdown() {
    userDropdown.hidden = true;
    userMenuButton.setAttribute('aria-expanded', 'false');
  }

  function cerrarModal() {
    edadModal.hidden = true;
  }

  sidebarToggle.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      document.body.classList.toggle('mobile-sidebar-open');
      return;
    }

    document.body.classList.toggle('sidebar-collapsed');
  });

  usuariosMenuButton.addEventListener('click', () => {
    const abierto = usuariosMenuButton.getAttribute('aria-expanded') === 'true';
    usuariosMenuButton.setAttribute('aria-expanded', String(!abierto));
    usuariosSubmenu.hidden = abierto;
  });

  capturaMenuButton.addEventListener('click', () => {
    document.getElementById('capturaSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.innerWidth <= 900) {
      document.body.classList.remove('mobile-sidebar-open');
    }
  });

  userMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const abierto = !userDropdown.hidden;
    userDropdown.hidden = abierto;
    userMenuButton.setAttribute('aria-expanded', String(!abierto));
  });

  document.addEventListener('click', (event) => {
    if (!userDropdown.hidden && !event.target.closest('.user-menu-wrap')) {
      cerrarDropdown();
    }
  });

  logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('usuarioLogin');
    window.location.replace('login.html');
  });

  usuarioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.getElementById('usuarioMessage');
    const nombre = document.getElementById('nombreUsuario').value.trim();
    const correo = document.getElementById('correoUsuario').value.trim();
    const password = document.getElementById('passwordUsuario').value;

    clearMessage(message);
    setFieldError('nombreUsuarioError');
    setFieldError('correoUsuarioError');
    setFieldError('passwordUsuarioError');

    let valido = true;

    if (nombre.length < 2) {
      setFieldError('nombreUsuarioError', 'Captura un nombre válido.');
      valido = false;
    }

    if (!validarCorreo(correo)) {
      setFieldError('correoUsuarioError', 'El correo no tiene un formato válido.');
      valido = false;
    }

    if (!validarPassword(password)) {
      setFieldError('passwordUsuarioError', 'Debe tener 8 caracteres o más, mayúscula, minúscula, número y carácter especial.');
      valido = false;
    }

    if (!valido) {
      setMessage(message, 'No se pudo guardar. Revisa los campos marcados.', 'error');
      return;
    }

    setMessage(message, `Usuario “${nombre}” validado correctamente.`, 'success');
    usuarioForm.reset();
  });

  alumnoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.getElementById('alumnoMessage');
    const nombre = document.getElementById('nombreAlumno').value.trim();
    const numeroControl = document.getElementById('numeroControl').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    clearMessage(message);
    setFieldError('nombreAlumnoError');
    setFieldError('numeroControlError');
    setFieldError('fechaNacimientoError');

    let valido = true;

    if (nombre.length < 2) {
      setFieldError('nombreAlumnoError', 'Captura el nombre del alumno.');
      valido = false;
    }

    if (!validarNumeroControl(numeroControl)) {
      setFieldError('numeroControlError', 'El número de control debe tener exactamente 6 dígitos.');
      valido = false;
    }

    const edad = calcularEdad(fechaNacimiento);

    if (edad === null) {
      setFieldError('fechaNacimientoError', 'Selecciona una fecha de nacimiento válida.');
      valido = false;
    }

    if (!valido) {
      setMessage(message, 'Revisa la información del alumno.', 'error');
      return;
    }

    const mayoriaEdad = edad >= 18;
    edadModalMessage.textContent = mayoriaEdad
      ? `${nombre} tiene ${edad} años y es mayor de edad.`
      : `${nombre} tiene ${edad} años y es menor de edad.`;

    edadModal.hidden = false;
    setMessage(message, `Alumno con número de control ${numeroControl} validado correctamente.`, 'success');
  });

  closeModalButton.addEventListener('click', cerrarModal);
  modalAceptarButton.addEventListener('click', cerrarModal);

  edadModal.addEventListener('click', (event) => {
    if (event.target === edadModal) cerrarModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cerrarModal();
      cerrarDropdown();
    }
  });

  // Revisa la sesión cuando el usuario vuelve con los botones Atrás/Adelante.
  window.addEventListener('pageshow', () => {
    if (!sessionStorage.getItem('usuarioLogin')) {
      window.location.replace('login.html');
    }
  });
});
