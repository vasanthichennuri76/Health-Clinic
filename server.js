const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", // put your mysql password if you have one
  database: "clinic"
});

db.connect(err => {
  if (err) {
    console.error("Failed to connect to database:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

// API: Book Appointment
app.post("/api/appointments", (req, res) => {
  const { name, email, phone, service, date, message } = req.body;
  const sql = "INSERT INTO bookappointments (name, email, phone, service, date, message) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, service, date, message], (err, result) => {
    if (err) {
      console.error("Error inserting appointment:", err);
      return res.status(500).send("Failed to book appointment.");
    }
    res.status(200).send("Appointment booked successfully.");
  });
});

// API: Contact Message
app.post("/api/contacts", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact message:", err);
      return res.status(500).send("Failed to send message.");
    }
    res.status(200).send("Message sent successfully.");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
