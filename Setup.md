# Node.js Sequelize Setup in Docker

This guide shows how to set up a Node.js application with Sequelize and Docker for a step-by-step development workflow.

## Prerequisites

- **Node.js and npm (or yarn) installed:** Ensure you have the latest versions on your system.
- **Docker installed:** Download and install Docker Desktop for your operating system.

## Steps

1. **Project Setup:**

   - Create a new project directory:

     ```bash
     mkdir sequelize-docker-project
     cd sequelize-docker-project
     ```

   - Initialize a new Node.js project:

     ```bash
     npm init -y
     ```

2. **Install Dependencies:**

   ```bash
   npm install sequelize pg sequelize-cli dotenv
   ```

3. **Create a Dockerfile:**

   This file defines the instructions to build your Node.js application image.

   ```dockerfile
   # Use a Node.js base image
   FROM node:18-alpine

   # Set the working directory
   WORKDIR /app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Expose the port your app will listen on
   EXPOSE 3000

   # Start the app
   CMD ["node", "index.js"]
   ```

   **Explanation:**

   - The `FROM` line specifies the base image for the container.
   - `WORKDIR` sets the working directory within the container.
   - `COPY` statements copy relevant files.
   - `RUN` installs dependencies.
   - `EXPOSE` exposes the application port.
   - `CMD` defines the command to run when the container starts.

4. **Create a Docker Compose File:**  
   (Refer to the previous steps for the docker-compose.yml content)

5. **Create a Database Configuration File:**

   ```.env
   DATABASE_URL=postgres://postgres:password@postgres:5432/your_database_name
   ```

   Replace `your_database_name` with your desired database name.

6. **Create a Sequelize Model:**

   Here's a sample Sequelize model for user management with validations stored in a file named `models/User.js`:

   ```javascript
   const Sequelize = require("sequelize");
   const sequelize = new Sequelize(process.env.DATABASE_URL);

   const User = sequelize.define("User", {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
     },
     name: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         notEmpty: {
           msg: "Name cannot be empty",
         },
       },
     },
     email: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
       validate: {
         isEmail: {
           msg: "Invalid email format",
         },
       },
     },
     password: {
       type: Sequelize.STRING,
       allowNull: false,
       // Implement secure password hashing before storing passwords
     },
   });

   module.exports = User;
   ```

7. **Create an Index File:**
   (Refer to the previous steps for the index.js file content)

8. **Start the Application:**

   ```bash
   docker-compose up --build
   ```

## Additional Notes

- Replace placeholder values with your actual database credentials and name.
- Consider using environment variables to securely store sensitive information.
- Explore deployment strategies for production environments.

This guide should get you started with setting up Node.js, Sequelize, and Docker for your project. Remember to adapt and expand upon these steps based on your specific requirements.
