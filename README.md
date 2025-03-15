# Contest API

This is a **FastAPI-based application** that provides APIs to fetch contest details from popular competitive programming platforms: **CodeChef, Codeforces, and LeetCode**. The application retrieves contest data using external APIs from these platforms and includes additional features like managing Codeforces contest links in a PostgreSQL database.

## Features

### Backend (FastAPI - Python)
- Fetch all contests (past, present, future, practice) from **CodeChef**.
- Fetch contest details from **Codeforces** and manage contest links (add, update, retrieve multiple links) in a database.
- Fetch past contests and top two upcoming contests from **LeetCode** using GraphQL.
- Structured responses with success status and error handling.

### Frontend (React + TypeScript)
- Displays contest lists fetched from CodeChef, Codeforces, and LeetCode.
- Provides an interface to manage Codeforces contest links.
- User-friendly UI built using **React.js and TypeScript** for a modern and efficient frontend experience.

---

## Prerequisites

### Backend Requirements
- **Python 3.8+**
- **PostgreSQL database** (for Codeforces link management; configure via `app.database.db_connection`)
- **Internet access** to fetch data from external APIs

### Frontend Requirements
- **Node.js** (for managing dependencies)
- **npm or yarn** (for package management)

---

## Setup

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### Database Configuration
1. Ensure a **PostgreSQL database** is running.
2. Update the database connection settings in `app.database.db_connection`.
3. Run any necessary migrations to set up the `ContestLinks` table.

### Run the Backend Server
```bash
uvicorn app.main:app --port 3000
```
- The API will be available at: **http://localhost:3000**

### Run the Frontend
1. Navigate to the New Folder which is a frontend.

2. Install dependencies:
```bash
npm install  # or yarn install
```
3. Start the React development server:
```bash
npm run dev  # or yarn dev
```
- The frontend will be available at: **http://localhost:5173** (default Vite port)

---

## API Endpoints

### CodeChef
- **GET** `/codechef/contests`
  - Fetches all contests (future, present, past, and practice).
  - **Response:** JSON with success status, data (list of contests), and a message.

### Codeforces
- **GET** `/codeforces/contests`
  - Fetches contests from Codeforces.
  - **Response:** JSON with contest details.

- **POST** `/codeforces/add-pcd-link`
  - Adds a single contest link to the database.
  - **Request Body:** `{ "url": "string", "contest_id": "string" }`
  - **Response:** Success message.

- **POST** `/codeforces/add-multiple-pcd-link`
  - Adds multiple contest links to the database.
  - **Request Body:** `[{ "url": "string", "contest_id": "string" }]`
  - **Response:** Success message.

- **POST** `/codeforces/update-pcd-link`
  - Updates an existing contest link by contest ID.
  - **Request Body:** `{ "url": "string", "contest_id": "string" }`
  - **Response:** Success message.

- **GET** `/codeforces/get-pcd-links`
  - Retrieves all stored contest links from the database.
  - **Response:** JSON with a list of links.

### LeetCode
- **GET** `/leetcode/contests`
  - Fetches the top two upcoming contests and past contests from LeetCode.
  - **Response:** JSON with success status and contest data.

---





