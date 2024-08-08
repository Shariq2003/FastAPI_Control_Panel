# FastAPI X React ERP Application

This project is a full-stack application with React as the frontend and FastAPI as the backend. It includes user registration, login, and management features, with role-based access control (RBAC) for normal users and admins.

## Table of Contents

- [Setup Backend](#setup-backend)
- [Setup Frontend](#setup-frontend)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [License](#license)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Shariq2003/FastAPI_Control_Panel.git
   cd <repository-folder>

  ### Setup Backend
  
  1. **Create a virtual environment**
     ```bash
     python -m venv venv
     venv\Scripts\activate //For Windows
     source venv/bin/activate // For Linux/mcOS
     
  2. **Install dependencies**
     ```bash
     pip install -r requirements.txt
     
  3. **Update environment variables**
      - Rename .env.example to .env.
      - Update the .env file with your specific configuration.
  
  4. **Set CORS origins**
      - `main.py`: update the origins list to include the URLs you want to allow access from, such as your frontend's URL.
  
  5. **Start the backend server**
      ```bash
      uvicorn app.main:app --reload
  
  ### Setup Frontend
     
  1. **Install dependencies**
     ```bash
     Install dependencies
     
  2. **Update environment variables**
      - Rename .env.example to .env.
      - Update the .env file with your backend URL and other configurations
  
  3. **Start the Front server**
      ```bash
      npm run devStart

## Project Structure

### Backend

- `app/main.py`: Main entry point for the FastAPI application.
- `app/models.py`: Defines the database models.
- `app/schemas.py`: Defines Pydantic schemas for request and response data.
- `app/crud.py`: Contains CRUD operations for interacting with the database.
- `app/auth.py`: Handles authentication and token creation.
- `app/database.py`: Configures database connection and session management.
- `app/routers/`: Contains route definitions and logic.

### Frontend

- `frontend/src/`: Contains React components and application logic.
- `frontend/src/components/RegistrationForm.jsx`: Handles user registration.
- `frontend/src/components/LoginForm.jsx`: Handles user login.
- `frontend/src/components/UserTable.jsx`: Displays user data and allows admins to manage users.
- `frontend/src/components/AdminActions.jsx`: Provides admin actions such as adding users.
- `frontend/src/App.jsx`: Main application component and routing setup.
- `frontend/src/index.js`: Entry point for the React application.
- `frontend/.env.example`: Example environment file for frontend configuration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
