# Lumis - Illuminating the Future of IT

Lumis is a modern AI and IT solutions platform featuring a FastAPI backend and a React frontend. The platform provides services like AI agent building, automation software, web development, DevOps & Cloud solutions, and database management.

## 🚀 Project Structure

- `backend/`: FastAPI application with MongoDB integration.
- `frontend/`: React application built with Tailwind CSS and Radix UI.
- `tests/`: Automated test suites for backend functionality.

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB (via Motor)
- **Validation**: Pydantic
- **Authentication**: JWT & Bcrypt

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI & Lucide React
- **Build Tool**: Craco

## ⚙️ Local Setup

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB instance (Local or Atlas)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Lumis/backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=lumis_db
   CORS_ORIGINS=http://localhost:3000
   ```
5. Run the server:
   ```bash
   python server.py
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Lumis/frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # Note: If you encounter issues with ajv, run:
   # npm install ajv --legacy-peer-deps
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## 🧪 Testing

To run backend tests:
```bash
cd Lumis
python backend_test.py
```

## 📄 License
MIT

