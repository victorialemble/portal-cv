async function init() {
  const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTcKyiPndTaRTCNW8AcyxUBI15I_z-GJE7pkvgpMhYSJDYhs5y7o4Lng4yXuruNuQN21_gLS84S4ETP/pub?output=csv");
  const text = await response.text();

  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows[0];
  const data = rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = r[i]?.trim());
    return obj;
  });

  window.datos = data;
  mostrarCVs();
}

function mostrarCVs() {
  const carrera = document.getElementById("filtroCarrera").value;
  const provincia = document.getElementById("filtroProvincia").value;
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const filtrados = window.datos.filter(d =>
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

window.addEventListener('DOMContentLoaded', init);