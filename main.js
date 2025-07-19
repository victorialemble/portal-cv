// -------- CONFIGURACIÓN --------
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcKyiPndTaRTCNW8AcyxUBI15I_z-GJE7pkvgpMhYSJDYhs5y7o4Lng4yXuruNuQN21_gLS84S4ETP/pub?output=csv";
const dominiosPermitidos = ["biotechcorp.com", "pharmaco.com.ar", "nucleate.org"];

// -------- SESIÓN --------
function verificarSesion() {
  if (!localStorage.getItem("sesion")) {
    window.location.href = "login.html";
  }
}
function logout() {
  localStorage.removeItem("sesion");
  window.location.href = "login.html";
}

// -------- LOGIN --------
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
  if (!usuarios[email] || usuarios[email].password !== password) {
    alert("Email o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("sesion", email);
  window.location.href = "index.html";
}

// -------- REGISTRO --------
function registrar() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!email || !password || !confirm) {
    alert("Completá todos los campos.");
    return;
  }
  if (password !== confirm) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const dominio = email.split("@")[1];
  if (!dominiosPermitidos.includes(dominio)) {
    alert("Este dominio no está autorizado.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
  if (usuarios[email]) {
    alert("Ya existe una cuenta con ese email.");
    return;
  }

  usuarios[email] = { password };
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro exitoso. Iniciá sesión.");
  window.location.href = "login.html";
}

// -------- CARGA DE DATOS DESDE SHEETS --------
let datos = [];

async function cargarDatos() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const rows = text.trim().split("\n").map(r => r.split(","));
  const headers = rows[0];
  datos = rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = r[i]?.trim());
    return obj;
  });
  mostrarCVs();
}

// -------- MOSTRAR CVs --------
function mostrarCVs() {
  const carrera = document.getElementById("filtroCarrera")?.value || "";
  const provincia = document.getElementById("filtroProvincia")?.value || "";
  const contenedor = document.getElementById("contenedor");
  if (!contenedor || datos.length === 0) return;

  contenedor.innerHTML = "";

  const filtrados = datos.filter(d =>
    (carrera === "" || d.Carrera === carrera) &&
    (provincia === "" || d.Provincia === provincia)
  );

  filtrados.forEach(d => {
    const div = document.createElement("div");
    div.className = "cv";
    div.innerHTML = `
      <h3>${d.Nombre}</h3>
      <p><strong>Carrera:</strong> ${d.Carrera}</p>
      <p><strong>Provincia:</strong> ${d.Provincia}</p>
      <p><a href="${d['Link al CV en PDF']}" target="_blank">Ver CV en PDF</a></p>
    `;
    contenedor.appendChild(div);
  });
}

// Solo si estamos en index.html
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("contenedor")) {
    verificarSesion();
    cargarDatos();

    const filtroCarrera = document.getElementById("filtroCarrera");
    const filtroProvincia = document.getElementById("filtroProvincia");

    if (filtroCarrera) filtroCarrera.addEventListener("change", mostrarCVs);
    if (filtroProvincia) filtroProvincia.addEventListener("change", mostrarCVs);
  }
});

