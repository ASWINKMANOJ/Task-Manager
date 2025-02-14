const { Client } = require("pg");

// Database connection configuration
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1979", // Replace with your database password
  port: 5432,
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

// Function to insert a new task
async function insertTask(name, description, completed, editedBy, domainCode) {
  try {
    const query =
      "INSERT INTO tasks (name, description, completed, editedBy,domainCode) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [name, description, completed, editedBy, domainCode];
    const result = await client.query(query, values);
    return result.rows[0]; // Return the inserted task
  } catch (error) {
    console.error("Error inserting task:", error.message);
    throw error;
  }
}

// Function to retrieve all tasks
async function getAllTasks(section_code) {
  try {
    const query = "SELECT * FROM tasks WHERE domainCode = $1";
    const value = [section_code];
    const result = await client.query(query, value);
    return result.rows; // Return all tasks
  } catch (error) {
    console.error("Error retrieving tasks:", error.message);
    throw error;
  }
}

// Function to update a task's completion status
<<<<<<< HEAD
async function updateTaskCompletionStatus(id, completed) {
  try {
    const query = "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *";
    const values = [completed, id];
=======
async function updateTaskCompletionStatus(id) {
  try {
    const query = "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *";
    const values = [true, id];
>>>>>>> 3ed9061 (Initial commit)
    const result = await client.query(query, values);
    return result.rows[0]; // Return the updated task
  } catch (error) {
    console.error("Error updating task completion status:", error.message);
    throw error;
  }
}

// Function to delete a task
async function deleteTask(id) {
  try {
    const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await client.query(query, values);
    return result.rows[0]; // Return the deleted task
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
}

async function checkUserCredentials(username, password) {
  try {
    const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const values = [username, password];
    const result = await client.query(query, values);
    return result; // Return true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking user credentials:", error.message);
    throw error;
  }
}

// Function to add a new user
async function addUser(username, password, sectionCode) {
  try {
    const query =
<<<<<<< HEAD
      "INSERT INTO users (username, password, section_code) VALUES ($1, $2, $3) RETURNING *";
=======
      "INSERT INTO users (username, password, section_id) VALUES ($1, $2, $3) RETURNING *";
>>>>>>> 3ed9061 (Initial commit)
    const values = [username, password, sectionCode];
    const result = await client.query(query, values);
    return result.rows[0]; // Return the inserted user
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
}

module.exports = {
  insertTask,
  getAllTasks,
  updateTaskCompletionStatus,
  deleteTask,
  addUser,
  checkUserCredentials,
};
