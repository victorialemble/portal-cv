# Portal de CVs – Nucleate Argentina

Este es un proyecto funcional desarrollado como prototipo para visualizar perfiles de estudiantes y talentos, pensado para empresas patrocinadoras de eventos de Nucleate Argentina.

---

## Funcionalidades principales

- Registro de usuarios únicamente con dominios autorizados
- Login y logout con persistencia de sesión usando `localStorage`
- Carga dinámica de CVs desde una planilla de Google Sheets
- Filtros interactivos por carrera y provincia
- Estilo moderno tipo "black & white"
- Código modular unificado en `main.js`

---

## Ver en línea

Este sitio está publicado con **GitHub Pages**.

https://victorialemble.github.io/portal-cv 

---

## Archivos importantes

- `index.html`: Página principal con los CVs
- `login.html`: Inicio de sesión
- `register.html`: Registro de nuevas empresas
- `styles.css`: Estilos globales
- `main.js`: Lógica unificada del sitio
- `logo-nucleate.png`: Logo institucional

---

## Instrucciones de uso

### Registro

1. Accedé a `register.html`
2. Usá un email con dominio autorizado (ver lista abajo)
3. Completá la contraseña y confirmación
4. Si el dominio es válido, el sistema guarda tus datos en `localStorage`

### Dominios autorizados para el registro

Solo pueden registrarse emails que terminen en alguno de los siguientes dominios:

- `@biotechcorp.com`
- `@pharmaco.com.ar`
- `@nucleate.org`

Cualquier intento de registro con un dominio no incluido será rechazado automáticamente.

---

### Login

1. Accedé a `login.html`
2. Ingresá las credenciales registradas
3. Si son correctas, se guarda la sesión y se redirige a `index.html`

---

### Navegación y filtrado

- Una vez logueado, podés navegar los CVs desde `index.html`
- Usá los selectores para filtrar por carrera o provincia

---

### Logout

- Clic en el botón “Cerrar sesión” en la esquina superior derecha

---

## Seguridad

Este proyecto es un prototipo. La autenticación y almacenamiento de contraseñas se hacen en `localStorage` sin cifrado ni backend. **No debe usarse en producción tal como está**.

---

##  Planilla de Google Sheets

El archivo de CVs se carga desde una planilla de Google Sheets pública, publicada como CSV. Podés reemplazarla modificando la URL en `main.js`:

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/XXX/pub?output=csv";
