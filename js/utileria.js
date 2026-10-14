/**
 * Librería de utilidades reutilizables.
 * Si el profesor proporcionó una utileria.js previa, conserva sus funciones
 * validarCorreo() y validarPassword() o adapta las llamadas del proyecto.
 */

function validarCorreo(correo) {
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return patronCorreo.test(String(correo).trim());
}

function validarPassword(password) {
  const valor = String(password);
  const tieneLongitud = valor.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(valor);
  const tieneMinuscula = /[a-z]/.test(valor);
  const tieneNumero = /\d/.test(valor);
  const tieneEspecial = /[^A-Za-z0-9]/.test(valor);

  return tieneLongitud && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

function validarNumeroControl(numeroControl) {
  return /^\d{6}$/.test(String(numeroControl).trim());
}

function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);

  if (Number.isNaN(nacimiento.getTime())) {
    return null;
  }

  const hoy = new Date();

  if (nacimiento > hoy) {
    return null;
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

  if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}
