const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas a los archivos de datos
const clasesPath = path.join(__dirname, "..", "data", "clases.json");
const adminsPath = path.join(__dirname, "..", "data", "administradores.json");

// --- Endpoints de datos ---

// Todas las clases (estructura igual a clases.json)
app.get("/api/clases", (req, res) => {
  fs.readFile(clasesPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo clases.json", err);
      return res.status(500).json({ error: "Error interno al leer clases" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error("Error parseando clases.json", parseErr);
      res.status(500).json({ error: "Error de formato en clases" });
    }
  });
});

// Clase por id
app.get("/api/clases/:id", (req, res) => {
  fs.readFile(clasesPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo clases.json", err);
      return res.status(500).json({ error: "Error interno al leer clases" });
    }

    try {
      const json = JSON.parse(data);
      const id = parseInt(req.params.id, 10);
      const clase = json.find((c) => c.id === id);

      if (!clase) {
        return res.status(404).json({ error: "Clase no encontrada" });
      }

      res.json(clase);
    } catch (parseErr) {
      console.error("Error parseando clases.json", parseErr);
      res.status(500).json({ error: "Error de formato en clases" });
    }
  });
});

// Login minimalista: devuelve el administrador si las credenciales son correctas
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(adminsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo administradores.json", err);
      return res.status(500).json({ error: "Error interno al leer administradores" });
    }

    try {
      const json = JSON.parse(data);
      const admin = json.admins.find(
        (a) => a.username === username && a.password === password
      );

      if (!admin) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      res.json(admin);
    } catch (parseErr) {
      console.error("Error parseando administradores.json", parseErr);
      res.status(500).json({ error: "Error de formato en administradores" });
    }
  });
});

// --- Servir frontend estático desde la raíz del proyecto ---
app.use(express.static(path.join(__dirname, "..")));

// Fallback manual a 404.html si la ruta no existe (Para HTML vanilla sin History API en cliente)
// Si el usuario pide algo que no es archivo ni api, devolvemos 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
