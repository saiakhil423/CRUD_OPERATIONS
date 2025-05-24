# Employee HRM Frontend

This is the frontend application for the Employee HRM system built with React and Vite.

## How to Run

1. **Start the Backend Server**

   - This project requires a backend API server to be running locally.
   - Make sure your backend server is running on `http://127.0.0.1:8000` or update the API base URL in `src/services/api.ts` accordingly.
   - The backend server should expose the following API endpoints:
     - `/api/employee-stats/`
     - `/api/location-stats/`
     - `/api/recent-hires/`
     - Other employee management APIs as needed.

2. **Start the Frontend**

   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

3. **Proxy Configuration**

   - The frontend is configured to proxy API requests starting with `/api` to the backend server at `http://127.0.0.1:8000`.
   - This is set up in `vite.config.ts` under the `server.proxy` configuration.

## Connecting to Backend

- The frontend communicates with the backend API at `http://127.0.0.1:8000/api/`.
- Authentication uses Bearer tokens stored and managed by the frontend.
- API requests include authorization headers automatically.
- If you change the backend URL or port, update the `API_BASE` constant in `src/services/api.ts` and the proxy configuration in `vite.config.ts`.

## User Interface Overview

### Dashboard

- Displays HR analytics including total employees, average tenure, and skills tracked.
- Shows charts for employee distribution by country and recent hiring trends.
- Lists recent hires with details like name, country, join date, and skills.

### Employee List

- Manage employees with a searchable list.
- View employee details including name, email, and skills.
- Edit or delete employees using action buttons.

### Add/Edit Employee Form

- Form to add a new employee or edit existing employee details.
- Fields include name, email, mobile, gender, date of birth, address, country, city, and skills.
- Skills are entered as comma-separated values.

## Adding UI Screenshots

To enhance this README with UI screenshots:

1. Run the frontend development server (`npm run dev`).
2. Open the app in your browser at `http://localhost:5173`.
3. Navigate to the pages you want to capture (Dashboard, Employee List, Add Employee Form).
4. Use your operating system's screenshot tool to capture images of the UI.
5. Save the images in the `public` folder (e.g., `public/dashboard.png`).
6. Add image references in this README using markdown syntax, for example:

   ```markdown
   ![Dashboard](./public/dashboard.png)
   ```

## Troubleshooting

- Ensure the backend server is running before starting the frontend to allow API data fetching.
- Check the proxy configuration in `vite.config.ts` if you change backend server URL or port.
- If API data does not load, verify the backend server is accessible and tokens are valid.

---

This README is designed to help beginners get started with the frontend and connect it to the backend easily. For any issues, please check the console logs or contact the project maintainer.
