# MERN Stack Portfolio Monorepo

This project is a monorepo containing a React frontend, an Admin panel, and an Express backend.

## Structure
- `api/`: Express backend (Node.js)
- `admin/`: Admin panel (React/Vite)
- `client/`: Main portfolio frontend (React/Vite)

## Setup
1.  Install dependencies in the root:
    ```bash
    npm install
    ```
2.  Set up environment variables in `api/.env`.
3.  Run the development server:
    ```bash
    npm run dev
    ```

## Deployment
This project is configured for one-click deployment on **Vercel**.
- Connect this repository to Vercel.
- The `vercel.json` file handles routing:
  - `/api/*` -> Backend Serverless Functions
  - `/admin/*` -> Admin panel
  - `/*` -> Main frontend
