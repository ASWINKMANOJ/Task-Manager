const express = require("express");
const cors = require("cors");
const app = express();
const {
  insertTask,
  checkUserCredentials,
  addUser,
  getAllTasks,
} = require("./connect");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the Next.js application
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "SECRET_KEY", async (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      const { username, password, section_id } = decoded;
      try {
        const tasks = await getAllTasks(section_id);
        res.status(200).json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ error: "Failed to fetch tasks" });
      }
    }
  });
});

app.post("/insertTask", async (req, res) => {
  const { name, description, completed, editedBy, domainCode } = req.body;
  try {
    const insertedTask = await insertTask(
      name,
      description,
      completed,
      editedBy,
      domainCode
    );
    res.status(200).json(insertedTask);
  } catch (error) {
    console.error("Error inserting task:", error.message);
    res.status(500).json({
      error: "Failed to insert task",
    });
  }
});

app.post("/sign", async (req, res) => {
  const { username, password, section_code } = req.body;

  try {
    const User = await addUser(username, password, section_code);
    const token = jwt.sign(
      { username: username, password: password, section_id: section_code },
      "SECRET_KEY",
      {
        expiresIn: "4d",
      }
    );
    res.cookie("token", token, {
      maxAge: 4 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ token });
  } catch {
    res.status(500).json({
      msg: "Error while creating user",
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = await checkUserCredentials(username, password);
    const u = await User.rows[0].username;
    const p = await User.rows[0].password;
    const s = await User.rows[0].section_code;
    const token = jwt.sign(
      { username: u, password: p, section_id: s },
      "SECRET_KEY",
      {
        expiresIn: "4d",
      }
    );
    res.cookie("token", token, {
      maxAge: 4 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      token: token,
      section_id: s,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: "USER NOT FOUND",
    });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
