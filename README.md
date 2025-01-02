# Course Selling App Backend  

This repository contains the backend for the **Course Selling App**, a robust and scalable platform designed to facilitate the selling and management of online courses.  

## Features  
- **User Authentication**: Secure login and registration for users and admins.  
- **Course Management**: Perform CRUD operations to manage courses.  
- **Role-Based Access Control**: Ensures proper access levels for users and admins.  
- **Payment Integration**: Supports payment gateways for seamless transactions.  
- **API Endpoints**: Well-structured REST APIs for smooth communication with the frontend.  

## Tech Stack  
- **Node.js** with **Express.js**: For building server-side logic.  
- **MongoDB**: For efficient and scalable database management.  
- **JWT Authentication**: For secure user sessions.  

## Installation  

### Prerequisites  
- Node.js and **npm installed** on your machine.  
- **MongoDB** running locally or accessible via a connection string.
- **Git** 

### Steps  
1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/profTanish/course-selling-app-backend
   
2. **Navigate to the Project Directory**
   ```bash
   cd course-selling-app-backend  

3. **Install Dependencies**
   ```bash
   npm install

4. **Set Up Environment Variables**
   - Create a .env file in the root directory of the project.
   - Use the .env.example file as a reference to define your environment variables.
   - Example:
     ```bash
     PORT=5000
     MONGO_URI=your_mongodb_connection_string 
     JWT_SECRET=your_jwt_secret_key

5. **Start MongoDB**
   -If you are running MongoDB locally, make sure the service is started.
   -Alternatively, provide your cloud MongoDB connection string in the .env file.

6. **Run the Application**
   ```bash
   node index.js

7. **Access the Backend**
   - Open your browser or API testing tool (e.g., Postman) and navigate to
     ```bash
     http://localhost:5000
8. **Test the APIs**
   - Use tools like Postman or cURL to test the API endpoints.
  
# License
- This project is licensed under the MIT License.

# Contat
- For any questions or support, feel free to reach out:
- GitHub: [profTanish](https://github.com/profTanish)
