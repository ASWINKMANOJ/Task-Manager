**Project Title: Task Manager Application**

---

## Overview:

The Task Manager Application is a web-based tool designed to help users manage their tasks efficiently. It allows users to create, edit, mark as completed, and delete tasks. The application features user authentication and authorization, ensuring that users can securely access their tasks. Tasks are organized by sections, making it easy for multiple users to access tasks under same section.

---

## Features:

1. **User Authentication:** Users can create an account, log in, and securely access their tasks.
2. **Task Management:** Users can create new tasks, edit existing tasks, mark tasks as completed, and delete tasks.
3. **Section Organization:** Tasks are organized by sections, allowing users to categorize and prioritize tasks.
4. **Responsive Design:** The application is responsive and works seamlessly across different devices and screen sizes.
5. **User-Friendly Interface:** The user interface is intuitive and easy to use, making task management a breeze.

---

## Technologies Used:

- **Frontend:** React.js, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js, PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Data Fetching:** Axios
- **Database:** PostgreSQL

---

## Installation:

To run the Task Manager Application locally, follow these steps:

- **Before running you must have installed postgreSQL in your local machine**
- **You need to create two table named tasks and users**
  ```bash
  CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    editedBy VARCHAR(255),
    domainCode VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
  ```bash
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    section_id VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Note that the details to connect to database can be changed in connect.js file**

1. Clone the GitHub repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd backend - //for backend
   cd front-end/task-manager-v2 - //for frontend
   ```

3. Install dependencies:

   ```bash
   npm install - //for both directories
   ```

4. Start the server:

   ```bash
   node index.js - //for backend 
   npm run dev - //for frontend
   ```

5. Open your web browser and visit `http://localhost:3000` to access the application.

---

## Usage:

1. **Sign Up:** Create a new account by providing a username and password.
2. **Log In:** Log in to your account using your username and password.
3. **View Tasks:** Once logged in, you can view all your tasks organized by sections.
4. **Add Task:** Click on "Add Task" to create a new task. Enter the task title, description, and select the section.
5. **Mark as Completed:** Click on the checkbox next to a task to mark it as completed.

---

## Credits:

This project was developed by Aswin.

---

## License:

This project is licensed under the [MIT License](LICENSE).

---

## Contact:

For inquiries or support, please contact [aswinkmanoj101@gmail.com](mailto:aswinkmanoj101@gmail.com).

---
