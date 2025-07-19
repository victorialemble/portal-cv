async function cargarDominiosPermitidos() {
  const res = await fetch("dominios.txt");
  const texto = await res.text();
  return texto.split("\n").map(d => d.trim().toLowerCase());
}

function dominioEsValido(email, dominios) {
  const dominioEmail = email.split("@")[1].toLowerCase();
  return dominios.includes(dominioEmail);
}

async function registrarUsuario(email, password) {
  const dominios = await cargarDominiosPermitidos();
  if (!dominioEsValido(email, dominios)) {
    alert("El dominio de tu correo no está autorizado.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
  if (usuarios[email]) {
    alert("Ya existe una cuenta con ese email.");
    return;
  }

  usuarios[email] = { password };
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro exitoso. Ahora podés iniciar sesión.");
  window.location.href = "login.html";
}

function login(email, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
  if (!usuarios[email] || usuarios[email].password !== password) {
    alert("Credenciales inválidas.");
    return;
  }

  localStorage.setItem("sesion", email);
  window.location.href = "index.html";
}

