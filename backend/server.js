const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USERS_FILE = "users.json";
const DOMINIOS_FILE = "dominios.txt";

function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function getValidDomains() {
  if (!fs.existsSync(DOMINIOS_FILE)) return [];
  return fs.readFileSync(DOMINIOS_FILE, "utf-8")
           .split("\n")
           .map(d => d.trim().toLowerCase())
           .filter(d => d);
}

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const domain = email.split("@")[1]?.toLowerCase();
  const validDomains = getValidDomains();

  if (!domain || !validDomains.includes(domain)) {
    return res.status(403).json({ error: "Dominio no autorizado." });
  }

  const users = getUsers();
  if (users[email]) {
    return res.status(409).json({ error: "Usuario ya registrado." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { password: hashedPassword };
  saveUsers(users);

  res.json({ message: "Registro exitoso." });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  if (!users[email]) {
    return res.status(401).json({ error: "Credenciales inválidas." });
  }

  const match = await bcrypt.compare(password, users[email].password);
  if (!match) {
    return res.status(401).json({ error: "Credenciales inválidas." });
  }

  res.json({ message: "Login exitoso." });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});